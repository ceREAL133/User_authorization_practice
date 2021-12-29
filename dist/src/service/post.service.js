"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.findAndUpdate = exports.findPost = exports.createPost = void 0;
const post_model_1 = __importDefault(require("../model/post.model"));
function createPost(input) {
    return post_model_1.default.create(input);
}
exports.createPost = createPost;
function findPost(query, options = { lean: true }) {
    return post_model_1.default.findOne(query, {}, options);
}
exports.findPost = findPost;
function findAndUpdate(query, update, options) {
    return post_model_1.default.findOneAndUpdate(query, update, options);
}
exports.findAndUpdate = findAndUpdate;
function deletePost(query) {
    return post_model_1.default.deleteOne(query);
}
exports.deletePost = deletePost;
