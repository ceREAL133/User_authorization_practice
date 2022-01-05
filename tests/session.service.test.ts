import Session from '../src/model/session.model';
const {
  createSession,
  createAccessToken,
  reIssueAccessToken,
  updateSession,
  findSessions,
} = require('../src/service/session.service');

const mockSession = () => ({
  updateOne: jest.fn((query, update) => null),
  find: jest.fn(() => ({ lean: function leanFunc() {} })),
  create: jest.fn((query) => ({ toJSON: jest.fn(() => null) })),
});

describe('session service', () => {
  describe('update session', () => {
    it('should been called with query and some value', async () => {
      const oldUpdate = Session.updateOne;
      const query = {};
      const update = {};
      Session.updateOne = mockSession().updateOne as any;

      await updateSession(query, update);

      expect(Session.updateOne).toHaveBeenCalledWith(query, update);
      Session.updateOne = oldUpdate;
    });
  });

  describe('find sessions', () => {
    it('should been called with query', async () => {
      const oldFind = Session.find;
      const query = {};
      Session.find = mockSession().find as any;
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
      Session.create = mockSession().create as any;

      createSession(userId, userAgent);

      expect(Session.create).toHaveBeenCalledWith(query);
      Session.create = oldCreate;
    });
  });
});
