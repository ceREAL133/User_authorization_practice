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
exports.deleteUser = exports.findFewUsers = exports.validatePassword = exports.findUser = exports.createUser = void 0;
const lodash_1 = require("lodash");
const user_model_1 = __importDefault(require("../model/user.model"));
function createUser(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield user_model_1.default.create(input);
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.createUser = createUser;
function findUser(query) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        return (_a = user_model_1.default.findOne(query)) === null || _a === void 0 ? void 0 : _a.lean();
    });
}
exports.findUser = findUser;
function validatePassword({ email, password, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return false;
        }
        const isValid = yield user.comparePassword(password);
        if (!isValid) {
            return false;
        }
        return (0, lodash_1.omit)(user.toJSON(), 'password');
    });
}
exports.validatePassword = validatePassword;
function findFewUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        return user_model_1.default.find({}).lean();
    });
}
exports.findFewUsers = findFewUsers;
function deleteUser(query) {
    return user_model_1.default.deleteOne(query);
}
exports.deleteUser = deleteUser;
