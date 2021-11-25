import { Express, Request, Response } from 'express';
import { createUserHandler, getAllUsersHandler } from './controller/user.controller';
import {
  createUserSessionHandler,
  invalidateUserSessionHandler,
  getUserSessionsHandler,
} from './controller/session.controller';
import {
  createPostHandler,
  updatePostHandler,
  getPostHandler,
  deletePostHandler,
} from './controller/post.controller';
import {
  createUserSchema,
  createUserSessionSchema,
} from './schema/user.schema';
import {
  createPostSchema,
  updatePostSchema,
  deletePostSchema,
} from './schema/post.schema';
import { validateRequest, requiresUser } from './middleware';

export default function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // register user
  app.post('/api/users', [requiresUser, validateRequest(createUserSchema)], createUserHandler);

  // get users list
  app.get('/api/users', requiresUser, getAllUsersHandler);

  // login
  app.post('/api/sessions', validateRequest(createUserSessionSchema), createUserSessionHandler);

  // get users session
  app.get('/api/sessions', requiresUser, getUserSessionsHandler);

  // logout
  app.delete('/api/sessions', requiresUser, invalidateUserSessionHandler);

  // create a post
  app.post(
    '/api/posts',
    [requiresUser, validateRequest(createPostSchema)],
    createPostHandler,
  );

  // update a post
  app.put(
    '/api/posts/:postId',
    [requiresUser, validateRequest(updatePostSchema)],
    updatePostHandler,
  );

  // get post
  app.get('/api/posts/:postId', getPostHandler);

  // delete a post
  app.delete(
    '/api/posts/:postId',
    [requiresUser, validateRequest(deletePostSchema)],
    deletePostHandler,
  );
}
