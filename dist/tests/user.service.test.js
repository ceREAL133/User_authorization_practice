"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { createUser, findFewUsers, deleteUser, } = require('../src/service/user.service');
const user_model_1 = __importDefault(require("../src/model/user.model"));
const userPayload = () => ({
    email: 'jane@example.com',
    name: 'Jane',
    age: 15,
    password: '1CubeIsCool!',
    passwordConfirmation: '1CubeIsCool!',
});
describe('user service', () => {
    describe('create user', () => {
        it('should create user', () => __awaiter(void 0, void 0, void 0, function* () {
            const oldCreate = user_model_1.default.create;
            user_model_1.default.create = jest.fn(() => Promise.resolve(userPayload()));
            let userInput = userPayload();
            const createdUser = yield createUser({
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
            expect(createdUser.passwordConfirmation).toEqual(userInput.passwordConfirmation);
            user_model_1.default.create = oldCreate;
        }));
    });
    describe('delete user', () => {
        it('should delete user', () => __awaiter(void 0, void 0, void 0, function* () {
            user_model_1.default.deleteOne = jest.fn();
            const query = {};
            yield deleteUser(query);
            expect(user_model_1.default.deleteOne).toHaveBeenCalledWith(query);
        }));
    });
    describe('find all users', () => {
        it('should return all users', () => __awaiter(void 0, void 0, void 0, function* () {
            const query = {};
            user_model_1.default.find = jest.fn();
            yield findFewUsers();
            expect(user_model_1.default.find).toHaveBeenCalledWith(query);
        }));
    });
});
