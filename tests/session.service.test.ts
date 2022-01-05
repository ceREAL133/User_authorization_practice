import Session from '../src/model/session.model';
const {
  createSession,
  createAccessToken,
  reIssueAccessToken,
  updateSession,
  findSessions,
} = require('../src/service/session.service');
import config from 'config';

import * as fn from '../src/utils/jwt.utils';

const getMockedSession = () => ({
  updateOne: jest.fn((query, update) => null),
  find: jest.fn(() => ({ lean: function leanFunc() {} })),
  create: jest.fn((query) => ({ toJSON: jest.fn(() => null) })),
});

const getUserMock = () => ({
  _id: 'fakeId',
  email: 'rlejko1@gmail.com',
  age: 18,
  name: 'Dan',
  createdAt: '2022-01-05T08:42:39.197Z',
  updatedAt: '2022-01-05T08:42:39.197Z',
  __v: 0,
});

const getSessionMock = () => ({
  valid: true,
  _id: '61d574b48bd7f11a78afaadf',
  user: 'fakeUser',
  userAgent: 'PostmanRuntime/7.28.4',
  createdAt: ' 2022-01-05T10:36:36.740Z',
  updatedAt: ' 2022-01-05T10:36:36.740Z',
  __v: 0,
});

describe('session service', () => {
  describe('update session', () => {
    it('should been called with query and some value', async () => {
      const oldUpdate = Session.updateOne;
      const query = {};
      const update = {};
      Session.updateOne = getMockedSession().updateOne as any;

      await updateSession(query, update);

      expect(Session.updateOne).toHaveBeenCalledWith(query, update);
      Session.updateOne = oldUpdate;
    });
  });

  describe('find sessions', () => {
    it('should been called with query', async () => {
      const oldFind = Session.find;
      const query = {};
      Session.find = getMockedSession().find as any;
      await findSessions(query);

      expect(Session.find).toHaveBeenCalledWith(query);
      Session.find = oldFind;
    });
  });

  describe('createSession', () => {
    it('should been called with query as {user: userId, userAgent}', async () => {
      const oldCreate = Session.create;
      const userId = 'fakeId';
      const userAgent = 'fakeAgent';
      const query = { user: userId, userAgent };
      Session.create = getMockedSession().create as any;

      createSession(userId, userAgent);

      expect(Session.create).toHaveBeenCalledWith(query);
      Session.create = oldCreate;
    });
  });

  describe('createAccessToken', () => {
    it('check is sign() function is called with { ...user, session: session._id },{ expiresIn: config.get(accessTokenTtl) } this queries', async () => {
      const user = getUserMock() as any;
      const session = getSessionMock() as any;
      const spy = jest.spyOn(fn, 'sign');

      createAccessToken({ user, session });

      expect(spy).toHaveBeenCalledWith(
        { ...user, session: session._id },
        { expiresIn: config.get('accessTokenTtl') }
      );
    });
  });
});
