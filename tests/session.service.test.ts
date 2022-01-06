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
import * as userServiceFn from '../src/service/user.service';
import _ from 'lodash';

jest.unmock('lodash');
jest.unmock('../src/service/user.service');

const getMockedSession = () => ({
  updateOne: jest.fn((query, update) => null),
  find: jest.fn(() => ({ lean: function leanFunc() {} })),
  create: jest.fn((query) => ({ toJSON: jest.fn(() => null) })),
  findById: jest.fn((query) => ({
    valid: true,
    _id: 'fakeId',
    user: 'fakeId',
    userAgent: 'PostmanRuntime/7.28.4',
    createdAt: ' 2022-01-05T10:36:36.740Z',
    updatedAt: ' 2022-01-05T10:36:36.740Z',
    __v: 0,
  })),
});

const getRefreshToken = () =>
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWxpZCI6dHJ1ZSwiX2lkIjoiNjFkNTkxOTMzYzIyOGQyMjM4MzEzMmNhIiwidXNlciI6IjYxZDU1OWZmN2U1NzNmMWZiNDIzNTljZiIsInVzZXJBZ2VudCI6IlBvc3RtYW5SdW50aW1lLzcuMjguNCIsImNyZWF0ZWRBdCI6IjIwMjItMDEtMDVUMTI6Mzk6NDcuMjQ3WiIsInVwZGF0ZWRBdCI6IjIwMjItMDEtMDVUMTI6Mzk6NDcuMjQ3WiIsIl9fdiI6MCwiaWF0IjoxNjQxMzg2Mzg3LCJleHAiOjE2NzI5NDM5ODd9.KbM_1TCJpBVmVtbbwM2rfMAxZE6p2KtNnfgBSBqCN_g';

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
  user: 'fakeId',
  userAgent: 'PostmanRuntime/7.28.4',
  createdAt: ' 2022-01-05T10:36:36.740Z',
  updatedAt: ' 2022-01-05T10:36:36.740Z',
  __v: 0,
});

describe('session service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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

  describe('reissueAccessToken', () => {
    it('should check is decode fn called with refreshToken param', () => {
      const refreshToken = {};
      const spy = jest.spyOn(fn, 'decode');

      reIssueAccessToken({ refreshToken });

      expect(spy).toHaveBeenCalledWith(refreshToken);
    });

    it('should check is get fn called with (decoded, _id) params', () => {
      const oldGet = _.get;
      _.get = jest.fn(() => {}) as any;
      const refreshToken = getRefreshToken();
      const { decoded } = fn.decode(refreshToken);

      reIssueAccessToken({ refreshToken });

      expect(_.get).toHaveBeenCalledWith(decoded, '_id');
      _.get = oldGet;
    });

    it('should check is findUser called with right query', async () => {
      const refreshToken = getRefreshToken();
      const oldSession = Session.findById;
      const session = getMockedSession().findById('');

      Session.findById = getMockedSession().findById as any;

      const findUserSpy = jest
        .spyOn(userServiceFn, 'findUser')
        .mockReturnValue({} as any);

      await reIssueAccessToken({ refreshToken });
      expect(findUserSpy).toHaveBeenCalledWith({ _id: session.user });
      Session.findById = oldSession;
    });
  });
});
