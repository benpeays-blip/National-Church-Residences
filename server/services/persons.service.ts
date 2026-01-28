import { Person, InsertPerson } from '@shared/schema';
import * as personsRepository from './storage/persons.repository';
import { NotFoundError, ValidationError } from '../utils/errors';
import { logger } from '../config/logging';

/**
 * Persons Service
 *
 * Contains business logic for person/donor operations.
 * Acts as an intermediary between controllers and repositories.
 */

/**
 * Get all persons with optional search filtering
 */
export async function getPersons(search?: string): Promise<Person[]> {
  logger.debug('Fetching persons', { search });

  const persons = await personsRepository.findPersons(search);

  logger.info('Persons fetched', { count: persons.length, hasSearch: !!search });
  return persons;
}

/**
 * Get a single person by ID
 */
export async function getPersonById(id: string): Promise<Person> {
  logger.debug('Fetching person', { id });

  const person = await personsRepository.findPersonById(id);

  if (!person) {
    throw new NotFoundError('Person');
  }

  return person;
}

/**
 * Get person profile with all related data
 *
 * Returns person with gifts, interactions, opportunities, tasks, and household
 */
export async function getPersonProfile(personId: string) {
  logger.debug('Fetching person profile', { personId });

  const profile = await personsRepository.findPersonProfile(personId);

  if (!profile) {
    throw new NotFoundError('Person');
  }

  logger.info('Person profile fetched', {
    personId,
    giftsCount: profile.gifts.length,
    interactionsCount: profile.interactions.length,
  });

  return profile;
}

/**
 * Get donor profile with detailed statistics
 */
export async function getDonorProfile(personId: string) {
  logger.debug('Fetching donor profile', { personId });

  const profile = await personsRepository.findDonorProfile(personId);

  if (!profile) {
    throw new NotFoundError('Donor');
  }

  logger.info('Donor profile fetched', {
    personId,
    totalGifts: profile.stats.totalGifts,
    totalGiving: profile.stats.totalGiving,
  });

  return profile;
}

/**
 * Get all donors for quadrant view
 *
 * Returns donors with metrics for energy/structure visualization
 */
export async function getDonorsForQuadrant() {
  logger.debug('Fetching donors for quadrant');

  const donors = await personsRepository.findDonorsForQuadrant();

  logger.info('Donors for quadrant fetched', { count: donors.length });
  return donors;
}

/**
 * Create a new person
 */
export async function createPerson(data: InsertPerson): Promise<Person> {
  logger.debug('Creating person', {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.primaryEmail,
  });

  // Business logic validations
  if (!data.firstName || data.firstName.trim().length === 0) {
    throw new ValidationError('First name is required');
  }

  if (!data.lastName || data.lastName.trim().length === 0) {
    throw new ValidationError('Last name is required');
  }

  // Validate email format if provided
  if (data.primaryEmail) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.primaryEmail)) {
      throw new ValidationError('Invalid email format');
    }
  }

  // Validate phone format if provided
  if (data.primaryPhone) {
    // Remove all non-digit characters for validation
    const digitsOnly = data.primaryPhone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      throw new ValidationError('Phone number must have at least 10 digits');
    }
  }

  const person = await personsRepository.createPerson(data);

  logger.info('Person created', {
    id: person.id,
    firstName: person.firstName,
    lastName: person.lastName,
  });

  return person;
}

/**
 * Update an existing person
 */
export async function updatePerson(
  id: string,
  data: Partial<InsertPerson>
): Promise<Person> {
  logger.debug('Updating person', { id, updates: Object.keys(data) });

  // Verify person exists
  const existingPerson = await personsRepository.findPersonById(id);
  if (!existingPerson) {
    throw new NotFoundError('Person');
  }

  // Validate email format if being updated
  if (data.primaryEmail !== undefined) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.primaryEmail && !emailRegex.test(data.primaryEmail)) {
      throw new ValidationError('Invalid email format');
    }
  }

  // Validate phone format if being updated
  if (data.primaryPhone !== undefined && data.primaryPhone !== null) {
    const digitsOnly = data.primaryPhone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      throw new ValidationError('Phone number must have at least 10 digits');
    }
  }

  const updated = await personsRepository.updatePerson(id, data);

  if (!updated) {
    throw new NotFoundError('Person');
  }

  logger.info('Person updated', {
    id,
    firstName: updated.firstName,
    lastName: updated.lastName,
  });

  return updated;
}

/**
 * Update donor energy score
 *
 * Energy score represents relationship warmth (0-100)
 */
export async function updateDonorEnergyScore(
  id: string,
  energyScore: number
): Promise<Person> {
  logger.debug('Updating donor energy score', { id, energyScore });

  // Validate energy score range
  if (energyScore < 0 || energyScore > 100) {
    throw new ValidationError('Energy score must be between 0 and 100');
  }

  return updatePerson(id, { relationshipEnergy: energyScore });
}

/**
 * Update donor structure score
 *
 * Structure score represents engagement formality (0-100)
 */
export async function updateDonorStructureScore(
  id: string,
  structureScore: number
): Promise<Person> {
  logger.debug('Updating donor structure score', { id, structureScore });

  // Validate structure score range
  if (structureScore < 0 || structureScore > 100) {
    throw new ValidationError('Structure score must be between 0 and 100');
  }

  return updatePerson(id, { relationshipStructure: structureScore });
}
