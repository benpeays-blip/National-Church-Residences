import { db } from '../db';
import { outreachTemplates, grantProposals, impactReports, persons, grants } from '@shared/schema';
import { eq, desc } from 'drizzle-orm';
import { logger } from '../config/logging';

/**
 * Content Service
 *
 * Contains business logic for content management operations.
 */

export async function getOutreachTemplates() {
  logger.debug('Fetching outreach templates');

  const templates = await db
    .select({
      template: outreachTemplates,
      person: persons,
    })
    .from(outreachTemplates)
    .innerJoin(persons, eq(outreachTemplates.personId, persons.id))
    .orderBy(desc(outreachTemplates.createdAt))
    .limit(50);

  logger.info('Outreach templates fetched', { count: templates.length });
  return templates;
}

export async function getGrantProposals() {
  logger.debug('Fetching grant proposals');

  const proposals = await db
    .select({
      proposal: grantProposals,
      grant: grants,
    })
    .from(grantProposals)
    .innerJoin(grants, eq(grantProposals.grantId, grants.id))
    .orderBy(desc(grantProposals.createdAt));

  logger.info('Grant proposals fetched', { count: proposals.length });
  return proposals;
}

export async function getImpactReports() {
  logger.debug('Fetching impact reports');

  const reports = await db
    .select({
      report: impactReports,
      person: persons,
    })
    .from(impactReports)
    .innerJoin(persons, eq(impactReports.personId, persons.id))
    .orderBy(desc(impactReports.createdAt));

  logger.info('Impact reports fetched', { count: reports.length });
  return reports;
}
