import { db } from '../db';
import { persons, interactions, opportunities } from '@shared/schema';
import { sql, gte } from 'drizzle-orm';
import { logger } from '../config/logging';

/**
 * Data Health Service
 *
 * Contains business logic for data quality and health monitoring.
 */

export async function getDataHealthMetrics() {
  logger.debug('Calculating data health metrics');

  // Fetch all persons for analysis
  const allPersons = await db.select().from(persons);
  const totalPersons = allPersons.length;

  // Calculate missing data metrics
  const missingEmails = allPersons.filter(
    (p) => !p.primaryEmail || p.primaryEmail.trim() === ''
  ).length;

  const missingPhones = allPersons.filter(
    (p) => !p.primaryPhone || p.primaryPhone.trim() === ''
  ).length;

  const incompleteProfiles = allPersons.filter(
    (p) => !p.organizationName && !p.wealthBand
  ).length;

  // Check data freshness (interactions in last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const recentInteractions = await db
    .select()
    .from(interactions)
    .where(gte(interactions.occurredAt, thirtyDaysAgo));

  const dataFreshness = recentInteractions.length > 0 ? 'Good' : 'Needs Attention';

  // Find unassigned opportunities
  const unassignedOpportunities = await db
    .select()
    .from(opportunities)
    .where(sql`${opportunities.ownerId} IS NULL OR ${opportunities.ownerId} = ''`);

  // Detect potential duplicates
  const potentialDuplicates = await db.execute(sql`
    SELECT COUNT(*) as count FROM (
      SELECT LOWER(CONCAT(${persons.firstName}, ' ', ${persons.lastName})) as full_name, COUNT(*) as name_count
      FROM ${persons}
      GROUP BY LOWER(CONCAT(${persons.firstName}, ' ', ${persons.lastName}))
      HAVING COUNT(*) > 1
    ) dupes
  `);

  const duplicateCount = Number(potentialDuplicates.rows[0]?.count || 0);

  // Calculate profile completeness
  const completeProfiles = allPersons.filter((p) => {
    const hasEmail = p.primaryEmail && p.primaryEmail.trim() !== '';
    const hasPhone = p.primaryPhone && p.primaryPhone.trim() !== '';
    const hasOrgOrWealth = p.organizationName || p.wealthBand;
    return hasEmail && hasPhone && hasOrgOrWealth;
  }).length;

  const profileCompleteness =
    totalPersons > 0 ? Math.round((completeProfiles / totalPersons) * 100) : 100;

  // Calculate quality check statuses
  const emailStatus =
    missingEmails === 0 ? 'Passing' : missingEmails < 5 ? 'Warning' : 'Failing';
  const phoneStatus =
    missingPhones === 0 ? 'Passing' : missingPhones < 10 ? 'Warning' : 'Failing';
  const profileStatus =
    incompleteProfiles === 0 ? 'Passing' : incompleteProfiles < 10 ? 'Warning' : 'Failing';
  const duplicateStatus =
    duplicateCount === 0 ? 'Passing' : duplicateCount < 3 ? 'Warning' : 'Failing';

  // Calculate overall health score
  const overallHealth = Math.min(
    100,
    Math.max(
      0,
      100 - missingEmails * 2 - missingPhones - incompleteProfiles - duplicateCount * 5
    )
  );

  // Build action items
  const actionItems = [];

  if (missingEmails > 0) {
    actionItems.push({
      id: 'missing-emails',
      title: `${missingEmails} donors missing email addresses`,
      description: 'Update contact information to improve engagement',
    });
  }

  if (unassignedOpportunities.length > 0) {
    actionItems.push({
      id: 'unassigned-opps',
      title: `${unassignedOpportunities.length} opportunities without owners`,
      description: 'Assign portfolio managers to track these prospects',
    });
  }

  if (duplicateCount > 0) {
    actionItems.push({
      id: 'duplicates',
      title: `${duplicateCount} potential duplicate records detected`,
      description: 'Review and merge duplicate donor profiles',
    });
  }

  const result = {
    metrics: {
      overallHealth: Math.round(overallHealth),
      profileCompleteness: Math.round(profileCompleteness),
      missingEmails,
      dataFreshness,
    },
    qualityChecks: {
      emailValidation: emailStatus,
      phoneFormatting: phoneStatus,
      addressCompleteness: profileStatus,
      duplicateDetection: duplicateStatus,
    },
    actionItems,
  };

  logger.info('Data health metrics calculated', {
    overallHealth: result.metrics.overallHealth,
    actionItemsCount: actionItems.length,
  });

  return result;
}
