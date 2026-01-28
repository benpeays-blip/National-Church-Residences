import { Campaign, InsertCampaign } from '@shared/schema';
import * as campaignsRepository from './storage/campaigns.repository';
import { NotFoundError, ValidationError } from '../utils/errors';
import { logger } from '../config/logging';

/**
 * Campaigns Service
 *
 * Contains business logic for campaign management operations.
 */

export async function getCampaigns(): Promise<Campaign[]> {
  logger.debug('Fetching campaigns');
  const campaignsList = await campaignsRepository.findCampaigns();
  logger.info('Campaigns fetched', { count: campaignsList.length });
  return campaignsList;
}

export async function getCampaignById(id: string) {
  logger.debug('Fetching campaign', { id });
  const campaign = await campaignsRepository.findCampaignById(id);

  if (!campaign) {
    throw new NotFoundError('Campaign');
  }

  return campaign;
}

export async function createCampaign(data: InsertCampaign): Promise<Campaign> {
  logger.debug('Creating campaign', { name: data.name, type: data.type });

  if (!data.name || data.name.trim().length === 0) {
    throw new ValidationError('Campaign name is required');
  }

  if (!data.type || data.type.trim().length === 0) {
    throw new ValidationError('Campaign type is required');
  }

  const validStatuses = ['planning', 'active', 'completed', 'paused'];
  if (data.status && !validStatuses.includes(data.status)) {
    throw new ValidationError(`Status must be one of: ${validStatuses.join(', ')}`);
  }

  if (data.goal !== undefined && data.goal !== null) {
    const goal = parseFloat(data.goal);
    if (goal <= 0) {
      throw new ValidationError('Goal must be greater than zero');
    }
  }

  if (data.startDate && data.endDate) {
    if (new Date(data.startDate) > new Date(data.endDate)) {
      throw new ValidationError('Start date must be before end date');
    }
  }

  const campaign = await campaignsRepository.createCampaign(data);
  logger.info('Campaign created', { id: campaign.id, name: campaign.name });
  return campaign;
}

export async function updateCampaign(id: string, data: Partial<InsertCampaign>): Promise<Campaign> {
  logger.debug('Updating campaign', { id, updates: Object.keys(data) });

  const existingCampaign = await campaignsRepository.findCampaignById(id);
  if (!existingCampaign) {
    throw new NotFoundError('Campaign');
  }

  const validStatuses = ['planning', 'active', 'completed', 'paused'];
  if (data.status && !validStatuses.includes(data.status)) {
    throw new ValidationError(`Status must be one of: ${validStatuses.join(', ')}`);
  }

  if (data.goal !== undefined && data.goal !== null) {
    const goal = parseFloat(data.goal);
    if (goal <= 0) {
      throw new ValidationError('Goal must be greater than zero');
    }
  }

  if (data.startDate && data.endDate) {
    if (new Date(data.startDate) > new Date(data.endDate)) {
      throw new ValidationError('Start date must be before end date');
    }
  }

  const updated = await campaignsRepository.updateCampaign(id, data);
  if (!updated) {
    throw new NotFoundError('Campaign');
  }

  logger.info('Campaign updated', { id, name: updated.name });
  return updated;
}

export async function deleteCampaign(id: string): Promise<Campaign> {
  logger.debug('Deleting campaign', { id });
  const deleted = await campaignsRepository.deleteCampaign(id);

  if (!deleted) {
    throw new NotFoundError('Campaign');
  }

  logger.info('Campaign deleted', { id, name: deleted.name });
  return deleted;
}
