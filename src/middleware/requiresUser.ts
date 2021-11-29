import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { findSessions } from '../service/session.service';

const requiresUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = get(req, 'user');
  const sessionId = get(req, 'user.session');

  if (!user) {
    return res.sendStatus(403);
  }

  const isSession = await findSessions({ _id: sessionId, valid: true });

  if (!isSession.length) {
    return res.sendStatus(401);
  }

  return next();
};

export default requiresUser;
