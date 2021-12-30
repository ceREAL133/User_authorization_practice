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
exports.deleteUserHandler = exports.getUserByIdHandler = exports.getAllUsersHandler = exports.createUserHandler = void 0;
const lodash_1 = require("lodash");
const user_service_1 = require("../service/user.service");
const logger_1 = __importDefault(require("../logger"));
function createUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, user_service_1.createUser)(req.body);
            return res.send((0, lodash_1.omit)(user.toJSON(), 'password'));
        }
        catch (e) {
            logger_1.default.error(e);
            return res.status(409).send(e.message);
        }
    });
}
exports.createUserHandler = createUserHandler;
function getAllUsersHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield (0, user_service_1.findFewUsers)();
        console.log(users);
        return res.send(users);
    });
}
exports.getAllUsersHandler = getAllUsersHandler;
function getUserByIdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = (0, lodash_1.get)(req, 'params.userId');
        const user = yield (0, user_service_1.findUser)({ _id: userId });
        if (!user) {
            return res.status(404);
        }
        return res.send(user);
    });
}
exports.getUserByIdHandler = getUserByIdHandler;
function deleteUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = (0, lodash_1.get)(req, 'params.userId');
        const user = yield (0, user_service_1.findUser)({ _id: userId });
        if (!user) {
            return res.sendStatus(404);
        }
        yield (0, user_service_1.deleteUser)({ _id: userId });
        return res.sendStatus(200);
    });
}
exports.deleteUserHandler = deleteUserHandler;
