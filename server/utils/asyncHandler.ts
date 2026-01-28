import { Request, Response, NextFunction } from 'express';

/**
 * Async Handler Wrapper
 *
 * Wraps async route handlers to automatically catch errors and forward them
 * to the Express error handling middleware, eliminating the need for try-catch
 * blocks in every route handler.
 *
 * @example
 * router.get('/persons', asyncHandler(async (req, res) => {
 *   const persons = await personsService.getAll();
 *   res.json(persons);
 * }));
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
