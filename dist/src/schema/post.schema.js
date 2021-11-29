"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostSchema = exports.updatePostSchema = exports.createPostSchema = void 0;
const yup_1 = require("yup");
const payload = {
    body: (0, yup_1.object)({
        text: (0, yup_1.string)()
            .required('text is required')
            .min(10, 'text is too short - should be at least 10 chars long'),
    }),
};
const params = {
    params: (0, yup_1.object)({
        postId: (0, yup_1.string)().required('postId is required'),
    }),
};
exports.createPostSchema = (0, yup_1.object)(Object.assign({}, payload));
exports.updatePostSchema = (0, yup_1.object)(Object.assign(Object.assign({}, params), payload));
exports.deletePostSchema = (0, yup_1.object)(Object.assign({}, params));
