import { LeanDocument } from 'mongoose';
import config from 'config';
import Session, { SessionDocument } from '../model/session.model';
import { sign } from '../utils/jwt.utils';
import { UserDocument } from '../model/user.model';

export async function createSession(userId: string, userAgent: string) {
  const session = await Session.create({ user: userId, userAgent });

  return session.toJSON();
}

export function createAccessToken({
  user,
  session,
}: {
  user:
    | Omit<UserDocument, 'password'>
    | LeanDocument<Omit<UserDocument, 'password'>>;
  session:
    | Omit<SessionDocument, 'password'>
    | LeanDocument<Omit<SessionDocument, 'password'>>;
}) {
  const accessToken = sign(
    { ...user, session: session._id },
    { expiresIn: config.get('accessTokenTtl') }, // 15 minutes
  );

  return accessToken;
}
