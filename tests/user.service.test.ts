const { createUser, findFewUsers } = require('../src/service/user.service');
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
});
