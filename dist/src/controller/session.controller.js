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
exports.getUserSessionsHandler = exports.invalidateUserSessionHandler = exports.createUserSessionHandler = void 0;
const config_1 = __importDefault(require("config"));
const lodash_1 = require("lodash");
const user_service_1 = require("../service/user.service");
const session_service_1 = require("../service/session.service");
const jwt_utils_1 = require("../utils/jwt.utils");
function createUserSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // validate the email and password
        const user = yield (0, user_service_1.validatePassword)(req.body);
        if (!user) {
            return res.status(401).send('Invalid username or password');
        }
        // Create a session
        const session = yield (0, session_service_1.createSession)(user._id, req.get('user-agent') || '');
        // create access token
        const accessToken = (0, session_service_1.createAccessToken)({
            user,
            session,
        });
        // create refresh token
        const refreshToken = (0, jwt_utils_1.sign)(session, {
            expiresIn: config_1.default.get('refreshTokenTtl'), // 1 year
        });
        // send refresh & access token back
        return res.send({ accessToken, refreshToken });
    });
}
exports.createUserSessionHandler = createUserSessionHandler;
function invalidateUserSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const sessionId = (0, lodash_1.get)(req, 'user.session');
        yield (0, session_service_1.updateSession)({ _id: sessionId }, { valid: false });
        return res.sendStatus(200);
    });
}
exports.invalidateUserSessionHandler = invalidateUserSessionHandler;
function getUserSessionsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = (0, lodash_1.get)(req, 'user._id');
        const sessions = yield (0, session_service_1.findSessions)({ user: userId, valid: true });
        return res.send(sessions);
    });
}
exports.getUserSessionsHandler = getUserSessionsHandler;
