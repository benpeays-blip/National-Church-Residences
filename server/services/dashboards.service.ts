import { db } from '../db';
import {
  gifts,
  opportunities,
  persons,
  users,
  tasks,
  campaigns,
} from '@shared/schema';
import { eq, gte, desc, sql } from 'drizzle-orm';
import { logger } from '../config/logging';

/**
 * Dashboards Service
 *
 * Business logic for executive and role-based dashboards.
 * Contains complex aggregations, calculations, and data transformations.
 */

export async function getHomeDashboard() {
  logger.debug('Fetching home dashboard data');

  const yearStart = new Date(new Date().getFullYear(), 0, 1);
  const annualGoal = 15000000; // $15M annual goal

  // Get YTD gifts
  const ytdGifts = await db
    .select({
      amount: gifts.amount,
      receivedAt: gifts.receivedAt,
      personId: gifts.personId,
      campaignId: gifts.campaignId,
      id: gifts.id,
    })
    .from(gifts)
    .where(gte(gifts.receivedAt, yearStart));

  const ytdRaised = ytdGifts.reduce((sum, g) => sum + parseFloat(g.amount), 0);

  // Get all opportunities for pipeline value
  const allOpportunities = await db
    .select({
      id: opportunities.id,
      askAmount: opportunities.askAmount,
      probability: opportunities.probability,
      personId: opportunities.personId,
      stage: opportunities.stage,
      closeDate: opportunities.closeDate,
      daysInStage: opportunities.daysInStage,
      notes: opportunities.notes,
      ownerId: opportunities.ownerId,
      personFirstName: persons.firstName,
      personLastName: persons.lastName,
      ownerFirstName: users.firstName,
      ownerLastName: users.lastName,
    })
    .from(opportunities)
    .leftJoin(persons, eq(opportunities.personId, persons.id))
    .leftJoin(users, eq(opportunities.ownerId, users.id))
    .orderBy(desc(opportunities.askAmount));

  const pipelineValue = allOpportunities.reduce(
    (sum, opp) => sum + parseFloat(opp.askAmount || '0'),
    0
  );
  const pipelineWeightedValue = allOpportunities.reduce(
    (sum, opp) =>
      sum + parseFloat(opp.askAmount || '0') * ((opp.probability || 0) / 100),
    0
  );

  // Count active monthly donors (donors who gave in last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentGifts = await db
    .select({ personId: gifts.personId })
    .from(gifts)
    .where(gte(gifts.receivedAt, thirtyDaysAgo));
  const activeMonthlyDonors = new Set(recentGifts.map((g) => g.personId)).size;

  // Calculate average gift size
  const avgGiftSize = ytdGifts.length > 0 ? ytdRaised / ytdGifts.length : 0;

  // Calculate 90-day forecast
  const ninetyDaysFromNow = new Date();
  ninetyDaysFromNow.setDate(ninetyDaysFromNow.getDate() + 90);
  const forecast90Days = allOpportunities
    .filter((opp) => opp.closeDate && new Date(opp.closeDate) <= ninetyDaysFromNow)
    .reduce(
      (sum, opp) =>
        sum + parseFloat(opp.askAmount || '0') * ((opp.probability || 0) / 100),
      0
    );

  // Get top 10 opportunities with action descriptions
  const topOpportunities = allOpportunities.slice(0, 10).map((opp) => {
    let actionDescription = '';
    const ownerName =
      opp.ownerFirstName && opp.ownerLastName
        ? `${opp.ownerFirstName} ${opp.ownerLastName}`
        : 'the assigned MGO';

    switch (opp.stage) {
      case 'Prospect':
        actionDescription = `${ownerName} should conduct initial discovery meeting to assess interest and capacity for a ${opp.askAmount ? `$${parseFloat(opp.askAmount).toLocaleString()}` : 'major gift'} ask. Schedule an in-person meeting at donor's office or preferred location.`;
        break;
      case 'Cultivation':
        actionDescription = `Arrange facility tour for donor and spouse, followed by lunch meeting with CEO. ${ownerName} should prepare tailored case statement highlighting donor's areas of interest and complete wealth screening.`;
        break;
      case 'Ask':
        actionDescription = `${ownerName} should schedule ask meeting with CEO present. Prepare formal proposal document and gift agreement for ${opp.askAmount ? `$${parseFloat(opp.askAmount).toLocaleString()}` : 'major gift'} commitment at donor's preferred location.`;
        break;
      case 'Steward':
        actionDescription = `Gift received. ${ownerName} should send personalized thank you within 48 hours and begin stewardship plan including quarterly impact reports and annual recognition event invitation.`;
        break;
      case 'Renewal':
        actionDescription = `${ownerName} should schedule renewal conversation meeting to discuss multi-year commitment. Prepare updated impact report showing how previous gift was used and propose ${opp.askAmount ? `$${parseFloat(opp.askAmount).toLocaleString()}` : 'renewed commitment'}.`;
        break;
      default:
        actionDescription = `${ownerName} should review opportunity status and determine next steps.`;
    }

    return {
      id: opp.id,
      askAmount: opp.askAmount,
      probability: opp.probability,
      stage: opp.stage,
      closeDate: opp.closeDate,
      daysInStage: opp.daysInStage,
      actionDescription,
      person: opp.personFirstName
        ? {
            firstName: opp.personFirstName,
            lastName: opp.personLastName,
          }
        : undefined,
    };
  });

  // Get recent gifts with person and campaign info
  const recentGiftsData = await db
    .select({
      id: gifts.id,
      amount: gifts.amount,
      receivedAt: gifts.receivedAt,
      personId: gifts.personId,
      campaignId: gifts.campaignId,
      personFirstName: persons.firstName,
      personLastName: persons.lastName,
      campaignName: campaigns.name,
    })
    .from(gifts)
    .leftJoin(persons, eq(gifts.personId, persons.id))
    .leftJoin(campaigns, eq(gifts.campaignId, campaigns.id))
    .orderBy(desc(gifts.receivedAt))
    .limit(10);

  const recentGiftsFormatted = recentGiftsData.map((g) => ({
    id: g.id,
    amount: g.amount,
    receivedAt: g.receivedAt,
    person: g.personFirstName
      ? {
          firstName: g.personFirstName,
          lastName: g.personLastName,
        }
      : undefined,
    campaign: g.campaignName ? { name: g.campaignName } : undefined,
  }));

  // Get next best actions with person and owner details
  const allTasks = await db
    .select({
      id: tasks.id,
      title: tasks.title,
      description: tasks.description,
      priority: tasks.priority,
      dueDate: tasks.dueDate,
      completed: tasks.completed,
      reason: tasks.reason,
      personId: tasks.personId,
      ownerId: tasks.ownerId,
      personFirstName: persons.firstName,
      personLastName: persons.lastName,
      ownerFirstName: users.firstName,
      ownerLastName: users.lastName,
    })
    .from(tasks)
    .leftJoin(persons, eq(tasks.personId, persons.id))
    .leftJoin(users, eq(tasks.ownerId, users.id))
    .where(eq(tasks.completed, 0))
    .orderBy(
      sql`CASE ${tasks.priority}
            WHEN 'urgent' THEN 1
            WHEN 'high' THEN 2
            WHEN 'medium' THEN 3
            WHEN 'low' THEN 4
          END`,
      tasks.dueDate
    )
    .limit(10);

  // Enhance task descriptions with specific details
  const enhancedTasks = allTasks.map((task) => {
    const personName =
      task.personFirstName && task.personLastName
        ? `${task.personFirstName} ${task.personLastName}`
        : 'the donor';
    const ownerName =
      task.ownerFirstName && task.ownerLastName
        ? `${task.ownerFirstName} ${task.ownerLastName}`
        : 'the assigned officer';

    let enhancedDescription = task.description || '';

    if (!enhancedDescription && task.reason) {
      if (task.title.toLowerCase().includes('meeting')) {
        enhancedDescription = `${ownerName} should schedule an in-person meeting with ${personName}. ${task.reason}`;
      } else if (
        task.title.toLowerCase().includes('call') ||
        task.title.toLowerCase().includes('phone')
      ) {
        enhancedDescription = `${ownerName} needs to make a personal phone call to ${personName}. ${task.reason}`;
      } else if (
        task.title.toLowerCase().includes('proposal') ||
        task.title.toLowerCase().includes('submit')
      ) {
        enhancedDescription = `${ownerName} should prepare and submit a formal proposal to ${personName}. ${task.reason}`;
      } else if (task.title.toLowerCase().includes('thank')) {
        enhancedDescription = `${ownerName} must send a personalized thank you note to ${personName}. ${task.reason}`;
      } else if (
        task.title.toLowerCase().includes('tour') ||
        task.title.toLowerCase().includes('visit')
      ) {
        enhancedDescription = `${ownerName} should arrange a campus/facility tour for ${personName}. ${task.reason}`;
      } else {
        enhancedDescription = `${ownerName} should reach out to ${personName}. ${task.reason}`;
      }
    }

    return {
      id: task.id,
      title: task.title,
      description: enhancedDescription,
      priority: task.priority,
      dueDate: task.dueDate,
      reason: task.reason,
    };
  });

  logger.info('Home dashboard data fetched', {
    ytdRaised,
    topOpportunitiesCount: topOpportunities.length,
  });

  return {
    metrics: {
      ytdRaised,
      annualGoal,
      pipelineValue,
      pipelineWeightedValue,
      activeMonthlyDonors,
      avgGiftSize,
      forecast90Days,
    },
    topOpportunities,
    recentGifts: recentGiftsFormatted,
    nextBestActions: enhancedTasks,
  };
}

// Note: MGO, Dev Director, and CEO dashboards are complex and would continue here
// For now, I'm creating placeholder stubs that can be filled with the full logic

export async function getMGODashboard() {
  logger.debug('Fetching MGO dashboard data');
  // TODO: Implement full MGO dashboard logic from routes.ts lines 1074-1206
  throw new Error('MGO dashboard not yet implemented in service layer');
}

export async function getDevDirectorDashboard() {
  logger.debug('Fetching Dev Director dashboard data');
  // TODO: Implement full Dev Director dashboard logic from routes.ts lines 1208-1431
  throw new Error('Dev Director dashboard not yet implemented in service layer');
}

export async function getCEODashboard() {
  logger.debug('Fetching CEO dashboard data');
  // TODO: Implement full CEO dashboard logic from routes.ts lines 1433-1525
  throw new Error('CEO dashboard not yet implemented in service layer');
}
