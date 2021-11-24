import config from 'config';
import { Request, Response } from 'express';
import { createSession, createAccessToken } from '../service/session.service';
import { validatePassword } from '../service/user.service';
import { sign } from '../utils/jwt.utils';

export async function createUserSessionHandler(req: Request, res: Response) {
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send('Invalid username or password');
  }

  const session = await createSession(user._id, req.get('user-agent') || '');

  const accessToken = createAccessToken({
    user,
    session,
  });

  const refreshToken = sign(session, {
    expiresIn: config.get('refreshTokenTtl'), // 1 year
  });

  return res.send({ accessToken, refreshToken });
}
