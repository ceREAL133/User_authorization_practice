import { Express, Request, Response } from 'express';
import { createUserHandler } from './controller/user.controller';
import { createUserSessionHandler } from './controller/session.controller';
import {
  createUserSchema,
  createUserSessionSchema,
} from './schema/user.schema';
import validateRequest from './middleware/validateRequest';

export default function (app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // register user
  app.post('/api/users', validateRequest(createUserSchema), createUserHandler);
  // login
  app.post(
    '/api/sessions',
    validateRequest(createUserSessionSchema),
    createUserSessionHandler,
  );
  // get users session

  // logout
}
