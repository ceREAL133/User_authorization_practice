const {
  createUser,
  findFewUsers,
  deleteUser,
  findUser,
} = require('../src/service/user.service');
import { query } from 'express';
import User from '../src/model/user.model';

const userPayload = () => ({
  email: 'jane@example.com',
  name: 'Jane',
  age: 15,
  password: '1CubeIsCool!',
  passwordConfirmation: '1CubeIsCool!',
});

describe('user service', () => {
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
      User.deleteOne = jest.fn();
      const query = {};

      await deleteUser(query);
      expect(User.deleteOne).toHaveBeenCalledWith(query);
    });
  });

  describe('find all users', () => {
    it('findFewUsers query should be equal to {}', async () => {
      const query = {};
      User.find = jest.fn(() => ({
        lean: function leanFunc() {},
      })) as any;

      await findFewUsers();
      expect(User.find).toHaveBeenCalledWith(query);
    });
  });

  describe('find one user', () => {
    it('findUser query should be equal {}', async () => {
      const query = {};
      User.findOne = jest.fn(() => ({
        lean: function leanFunc() {},
      })) as any;

      await findUser(query);
      expect(User.findOne).toHaveBeenCalledWith(query);
    });
  });
});
