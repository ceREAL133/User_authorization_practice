import Session from '../src/model/session.model';
import * as sessionServiceFn from '../src/service/session.service';
import config from 'config';
import * as fn from '../src/utils/jwt.utils';
import * as userServiceFn from '../src/service/user.service';
import _ from 'lodash';

jest.unmock('lodash');
jest.unmock('../src/service/user.service');

const getMockedSession = () => ({
  updateOne: jest.fn((query, update) => ({ valid: true, _id: 'fakeId' })),
  find: jest.fn(() => ({
    randomParam: 'param',
    lean: function leanFunc() {
      return { obj: 'createdObject' };
    },
  })),
  create: jest.fn((query) => ({
    toJSON: jest.fn(() => ({
      valid: true,
      _id: 'fakeId',
      user: 'fakeId',
      userAgent: 'PostmanRuntime/7.28.4',
      createdAt: ' 2022-01-05T10:36:36.740Z',
      updatedAt: ' 2022-01-05T10:36:36.740Z',
      __v: 0,
    })),
  })),
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
  email: 'fakeId',
  age: 18,
  name: 'Dan',
  createdAt: '2022-01-05T08:42:39.197Z',
  updatedAt: '2022-01-05T08:42:39.197Z',
  __v: 0,
});

const getSessionMock = () => ({
  valid: true,
  _id: 'fakeId',
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

      const expectedResult = { valid: true, _id: 'fakeId' };
      const result = await sessionServiceFn.updateSession(query, update);

      expect(Session.updateOne).toHaveBeenCalledWith(query, update);
      expect(result).toEqual(expectedResult);

      Session.updateOne = oldUpdate;
    });
  });

  describe('find sessions', () => {
    it('should been called with query', async () => {
      const oldFind = Session.find;
      const query = {};
      Session.find = getMockedSession().find as any;
      const expectedResult = { obj: 'createdObject' };
      const result = await sessionServiceFn.findSessions(query);

      expect(Session.find).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedResult);

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
      const expectedResult = getSessionMock();

      const result = await sessionServiceFn.createSession(userId, userAgent);

      expect(Session.create).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedResult);
      Session.create = oldCreate;
    });
  });

  describe('createAccessToken', () => {
    it('check is sign() function is called with { ...user, session: session._id },{ expiresIn: config.get(accessTokenTtl) } this queries', async () => {
      const user = getUserMock() as any;
      const session = getSessionMock() as any;
      const spy = jest.spyOn(fn, 'sign');

      const result = sessionServiceFn.createAccessToken({ user, session });

      expect(spy).toHaveBeenCalledWith(
        { ...user, session: session._id },
        { expiresIn: config.get('accessTokenTtl') }
      );

      expect(typeof result).toBe('string');
    });
  });

  describe('reissueAccessToken', () => {
    it('should check is decode fn called with refreshToken param', async () => {
      const refreshToken = 'fakeToken';
      const spy = jest
        .spyOn(fn, 'decode')
        .mockReturnValueOnce({ decoded: null } as any);

      const result = await sessionServiceFn.reIssueAccessToken({
        refreshToken,
      });

      expect(spy).toHaveBeenCalledWith(refreshToken);
      expect(result).toBeFalsy();
    });
    it('should check is get fn called with (decoded, _id) params', async () => {
      const oldGet = _.get;
      _.get = jest.fn(() => {}) as any;
      const refreshToken = getRefreshToken();
      const { decoded } = fn.decode(refreshToken);

      const result = await sessionServiceFn.reIssueAccessToken({
        refreshToken,
      });

      expect(_.get).toHaveBeenCalledWith(decoded, '_id');
      expect(result).toBeFalsy();
      _.get = oldGet;
    });

    it('should check is findUser called with right query', async () => {
      const refreshToken = getRefreshToken();
      const oldSession = Session.findById;
      const session = getMockedSession().findById('');
      const expectedQuery = { _id: session.user };

      Session.findById = getMockedSession().findById as any;

      const findUserSpy = jest
        .spyOn(userServiceFn, 'findUser')
        .mockReturnValue({} as any);

      await sessionServiceFn.reIssueAccessToken({ refreshToken });
      expect(findUserSpy).toHaveBeenCalledWith(expectedQuery);

      Session.findById = oldSession;
    });

    it('should check is createAccessToken called with right query', async () => {
      const refreshToken = getRefreshToken() as any;
      const user = getUserMock() as any;
      const session = getSessionMock() as any;
      const spy = jest
        .spyOn(fn, 'sign')
        .mockReturnValue({ obj: 'randomParam' } as any);

      jest.spyOn(userServiceFn, 'findUser').mockReturnValue(user as any);

      Session.findById = jest.fn(() => session);

      const result = await sessionServiceFn.reIssueAccessToken({
        refreshToken,
      });

      expect(spy).toHaveBeenCalledWith(
        { ...user, session: session._id },
        { expiresIn: config.get('accessTokenTtl') }
      );
    });
  });
});
