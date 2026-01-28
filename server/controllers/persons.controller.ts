import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as personsService from '../services/persons.service';
import { z } from 'zod';
import { ValidationError } from '../utils/errors';

/**
 * Persons Controller
 *
 * Handles HTTP requests for person/donor operations.
 * Delegates business logic to the persons service.
 */

/**
 * GET /api/persons
 * Get all persons with optional search
 *
 * Query params:
 * - search: Optional search string for name/email filtering
 */
export const getPersons = asyncHandler(async (req: Request, res: Response) => {
  const search = req.query.search as string | undefined;
  const persons = await personsService.getPersons(search);
  res.json(persons);
});

/**
 * GET /api/persons/:id
 * Get a single person by ID
 */
export const getPersonById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const person = await personsService.getPersonById(id);
  res.json(person);
});

/**
 * GET /api/persons/:id/profile
 * Get person profile with all related data
 *
 * Returns person with gifts, interactions, opportunities, tasks, and household
 */
export const getPersonProfile = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const profile = await personsService.getPersonProfile(id);
  res.json(profile);
});

/**
 * Validation schema for creating/updating persons
 */
const personInputSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  middleName: z.string().max(100).optional().nullable(),
  lastName: z.string().min(1, 'Last name is required').max(100),
  preferredName: z.string().max(100).optional().nullable(),
  suffix: z.string().max(20).optional().nullable(),
  salutation: z.string().max(50).optional().nullable(),
  primaryEmail: z.string().email('Invalid email format').optional().nullable(),
  secondaryEmail: z.string().email('Invalid email format').optional().nullable(),
  primaryPhone: z.string().optional().nullable(),
  secondaryPhone: z.string().optional().nullable(),
  mobilePhone: z.string().optional().nullable(),
  streetAddress: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().max(2).optional().nullable(),
  postalCode: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  birthdate: z.coerce.date().optional().nullable(),
  gender: z.string().optional().nullable(),
  maritalStatus: z.string().optional().nullable(),
  occupation: z.string().optional().nullable(),
  employer: z.string().optional().nullable(),
  householdId: z.string().optional().nullable(),
  preferredContactMethod: z.string().optional().nullable(),
  doNotEmail: z.number().int().min(0).max(1).optional(),
  doNotCall: z.number().int().min(0).max(1).optional(),
  doNotMail: z.number().int().min(0).max(1).optional(),
  tags: z.array(z.string()).optional().nullable(),
  notes: z.string().optional().nullable(),
  energyScore: z.number().int().min(0).max(100).optional().nullable(),
  structureScore: z.number().int().min(0).max(100).optional().nullable(),
  engagementScore: z.number().int().min(0).max(100).optional().nullable(),
  capacityScore: z.number().int().min(0).max(100).optional().nullable(),
  affinityScore: z.number().int().min(0).max(100).optional().nullable(),
});

/**
 * POST /api/persons
 * Create a new person
 */
export const createPerson = asyncHandler(async (req: Request, res: Response) => {
  // Validate input
  const parsed = personInputSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ValidationError('Invalid person data', parsed.error.errors);
  }

  const person = await personsService.createPerson(parsed.data);
  res.status(201).json(person);
});

/**
 * PATCH /api/persons/:id
 * Update an existing person
 */
export const updatePerson = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  // Validate input (partial update)
  const updateSchema = personInputSchema.partial();
  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ValidationError('Invalid person data', parsed.error.errors);
  }

  const person = await personsService.updatePerson(id, parsed.data);
  res.json(person);
});

/**
 * GET /api/donors/quadrant
 * Get all donors for quadrant view
 *
 * Returns donors with metrics for energy/structure visualization
 */
export const getDonorsForQuadrant = asyncHandler(async (_req: Request, res: Response) => {
  const donors = await personsService.getDonorsForQuadrant();
  res.json(donors);
});

/**
 * GET /api/donors/:id
 * Get donor profile with detailed statistics
 *
 * Returns donor with gifts, interactions, opportunities, tasks, household, and calculated stats
 */
export const getDonorProfile = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const profile = await personsService.getDonorProfile(id);
  res.json(profile);
});

/**
 * PATCH /api/donors/:id/energy
 * Update donor energy score
 *
 * Energy score represents relationship warmth (0-100)
 */
export const updateDonorEnergyScore = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { energyScore } = req.body;

  if (typeof energyScore !== 'number') {
    throw new ValidationError('Energy score must be a number');
  }

  const donor = await personsService.updateDonorEnergyScore(id, energyScore);
  res.json(donor);
});

/**
 * PATCH /api/donors/:id/structure
 * Update donor structure score
 *
 * Structure score represents engagement formality (0-100)
 */
export const updateDonorStructureScore = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { structureScore } = req.body;

  if (typeof structureScore !== 'number') {
    throw new ValidationError('Structure score must be a number');
  }

  const donor = await personsService.updateDonorStructureScore(id, structureScore);
  res.json(donor);
});
