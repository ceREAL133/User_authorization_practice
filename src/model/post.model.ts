import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import { UserDocument } from './user.model';

export interface PostDocument extends mongoose.Document {
  userId: UserDocument['_id'];
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(10),
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, default: true },
  },
  { timestamps: true },
);

const Post = mongoose.model<PostDocument>('Post', PostSchema);

export default Post;
