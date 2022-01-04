const {
  createUser,
  findFewUsers,
  deleteUser,
  findUser,
  validatePassword,
} = require('../src/service/user.service');
import User from '../src/model/user.model';
import { omit } from 'lodash';

const userPayload = () => ({
  email: 'jane@example.com',
  name: 'Jane',
  age: 15,
  password: '1CubeIsCool!',
  passwordConfirmation: '1CubeIsCool!',
});

const mockCreateUser = {
  email: 'jane@example.com',
  name: 'Jane',
  age: 15,
  password: '1CubeIsCool!',
  passwordConfirmation: '1CubeIsCool!',
};

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
  toJSON: jest.fn(() => {
    return {
      email: 'jane@example.com',
      name: 'Jane',
      age: 15,
      password: '1CubeIsCool!',
    };
  }),
};

const mockUser = {
  email: 'fakeEmail@gmail.com',
  password: '1CubeIsCool!',
};

const ommitedUser = {
  email: 'jane@example.com',
  name: 'Jane',
  age: 15,
};

describe('user service', () => {
  describe('validatePassword', () => {
    it('should return false if user is not exist', async () => {
      const oldFind = User.findOne;
      User.findOne = jest.fn(() => null) as any;
      const validation = await validatePassword(mockUser);

      expect(User.findOne).toHaveBeenCalledWith({ email: mockUser.email });
      expect(validation).toBeFalsy();
      User.findOne = oldFind;
    });

    it('should return false if password is not match', async () => {
      const user = { comparePassword: jest.fn(() => Promise.resolve(false)) };
      User.findOne = jest.fn(() => user) as any;
      const validation = await validatePassword(mockUser);

      expect(user.comparePassword).toHaveBeenCalledWith(mockUser.password);
      expect(validation).toBeFalsy();
    });

    it('should return omit() result without password field', () => {
      const omitResult = omit(userExample.toJSON(), 'password');

      expect(omitResult).toEqual(ommitedUser);
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
