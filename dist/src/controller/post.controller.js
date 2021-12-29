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
exports.deletePostHandler = exports.getPostsHandler = exports.getSinglePostHandler = exports.updatePostHandler = exports.createPostHandler = void 0;
const lodash_1 = require("lodash");
const post_model_1 = __importDefault(require("../model/post.model"));
const post_service_1 = require("../service/post.service");
function createPostHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = (0, lodash_1.get)(req, 'user._id');
        const { body } = req;
        const post = yield (0, post_service_1.createPost)(Object.assign(Object.assign({}, body), { userId }));
        return res.send(post);
    });
}
exports.createPostHandler = createPostHandler;
function updatePostHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = (0, lodash_1.get)(req, 'user._id');
        const postId = (0, lodash_1.get)(req, 'params.postId');
        const update = req.body;
        const post = yield (0, post_service_1.findPost)({ postId });
        if (!post) {
            return res.sendStatus(404);
        }
        if (String(post.userId) !== userId) {
            return res.sendStatus(401);
        }
        const updatedPost = yield (0, post_service_1.findAndUpdate)({ postId }, update, { new: true });
        return res.send(updatedPost);
    });
}
exports.updatePostHandler = updatePostHandler;
function getSinglePostHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const postId = (0, lodash_1.get)(req, 'params.postId');
        const post = yield (0, post_service_1.findPost)({ postId });
        if (!post) {
            return res.sendStatus(404);
        }
        return res.send(post);
    });
}
exports.getSinglePostHandler = getSinglePostHandler;
function getPostsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = (0, lodash_1.get)(req, 'user._id');
        const posts = yield post_model_1.default.find({ userId });
        if (!posts) {
            return res.sendStatus(404);
        }
        return res.send(posts);
    });
}
exports.getPostsHandler = getPostsHandler;
function deletePostHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = (0, lodash_1.get)(req, 'user._id');
        const postId = (0, lodash_1.get)(req, 'params.postId');
        const post = yield (0, post_service_1.findPost)({ postId });
        if (!post) {
            return res.sendStatus(404);
        }
        if (String(post.userId) !== String(userId)) {
            return res.sendStatus(401);
        }
        yield (0, post_service_1.deletePost)({ postId });
        return res.sendStatus(200);
    });
}
exports.deletePostHandler = deletePostHandler;
