const {
  createUser,
  findFewUsers,
  deleteUser,
  findUser,
  validatePassword,
} = require('../src/service/user.service');
import bcrypt from 'bcrypt';
import User from '../src/model/user.model';
import UserSchema from '../src/model/user.model';

const userPayload = () => ({
  email: 'jane@example.com',
  name: 'Jane',
  age: 15,
  password: '1CubeIsCool!',
  passwordConfirmation: '1CubeIsCool!',
});

const userExample = {
  email: 'jane@example.com',
  name: 'Jane',
  age: 15,
  password: '1CubeIsCool!',
  comparePassword: jest.fn((candidatePassword: string) => {
    if (candidatePassword === userExample.password) {
      return true;
    } else return false;
  }),
  toJSON: jest.fn(),
};

describe('user service', () => {
  describe('validatePassword', () => {
    it('should check is user exist', async () => {
      const oldFind = User.findOne;
      User.findOne = jest.fn(({ email }) => {
        if (userExample.email === email) {
          return userExample;
        } else return false;
      }) as any;
      const validation = await validatePassword({
        email: 'jane@example.com',
        password: '1CubeIsCool!',
      });
      expect(validation).toBe(false);
      User.findOne = oldFind;
    });
  });

  describe('create user', () => {
    it('should create user', async () => {
      const oldCreate = User.create;
      User.create = jest.fn(() => Promise.resolve(userPayload())) as any;

      let userInput = userPayload();
      const createdUser = await createUser({
        email: 'jane@example.com',
        name: 'Jane',
        age: 15,
        password: '1CubeIsCool!',
        passwordConfirmation: '1CubeIsCool!',
      });

      expect(createdUser.email).toEqual(userInput.email);
      expect(createdUser.name).toEqual(userInput.name);
      expect(createdUser.age).toEqual(userInput.age);
      expect(createdUser.password).toEqual(userInput.password);
      expect(createdUser.passwordConfirmation).toEqual(
        userInput.passwordConfirmation
      );

      User.create = oldCreate;
    });
  });

  describe('delete user', () => {
    it('should delete user', async () => {
      const oldDelete = User.deleteOne;
      User.deleteOne = jest.fn();
      const query = {};

      await deleteUser(query);
      expect(User.deleteOne).toHaveBeenCalledWith(query);

      User.deleteOne = oldDelete;
    });
  });

  describe('find all users', () => {
    it('findFewUsers query should be equal to {}', async () => {
      const query = {};
      const oldFind = User.find;
      User.find = jest.fn(() => ({
        lean: function leanFunc() {},
      })) as any;

      await findFewUsers();
      expect(User.find).toHaveBeenCalledWith(query);
      User.find = oldFind;
    });
  });

  describe('find one user', () => {
    it('findUser query should be equal {}', async () => {
      const query = {};
      const oldFind = User.findOne;
      User.findOne = jest.fn(() => ({
        lean: function leanFunc() {},
      })) as any;

      await findUser(query);
      expect(User.findOne).toHaveBeenCalledWith(query);
      User.findOne = oldFind;
    });
  });
});
