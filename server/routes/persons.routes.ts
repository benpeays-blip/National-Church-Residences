import { Router } from 'express';
import * as personsController from '../controllers/persons.controller';
import { isAuthenticated } from '../middleware/auth';

/**
 * Persons Routes
 *
 * Defines all routes for person/donor operations:
 * - GET    /api/persons                    - Get all persons (with optional search)
 * - GET    /api/persons/:id                - Get a single person
 * - GET    /api/persons/:id/profile        - Get person profile with related data
 * - POST   /api/persons                    - Create a new person (auth required)
 * - PATCH  /api/persons/:id                - Update a person (auth required)
 * - GET    /api/donors/quadrant            - Get donors for quadrant view
 * - GET    /api/donors/:id                 - Get donor profile with stats
 * - PATCH  /api/donors/:id/energy          - Update donor energy score (auth required)
 * - PATCH  /api/donors/:id/structure       - Update donor structure score (auth required)
 */

export const personsRouter = Router();

// Persons routes
personsRouter.get('/', personsController.getPersons);
personsRouter.get('/:id', personsController.getPersonById);
personsRouter.get('/:id/profile', personsController.getPersonProfile);
personsRouter.post('/', isAuthenticated, personsController.createPerson);
personsRouter.patch('/:id', isAuthenticated, personsController.updatePerson);

// Donors routes (handled by same router since donors are persons)
// Note: These will be mounted at /api/donors in routes.ts
export const donorsRouter = Router();

donorsRouter.get('/quadrant', personsController.getDonorsForQuadrant);
donorsRouter.get('/:id', personsController.getDonorProfile);
donorsRouter.patch('/:id/energy', isAuthenticated, personsController.updateDonorEnergyScore);
donorsRouter.patch('/:id/structure', isAuthenticated, personsController.updateDonorStructureScore);
