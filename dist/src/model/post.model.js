"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const nanoid_1 = require("nanoid");
const PostSchema = new mongoose_1.default.Schema({
    postId: {
        type: String,
        required: true,
        unique: true,
        default: () => (0, nanoid_1.nanoid)(10),
    },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, default: true },
}, { timestamps: true });
const Post = mongoose_1.default.model('Post', PostSchema);
exports.default = Post;
