import { Request, Response } from 'express';
import { get } from 'lodash';
import Post from '../model/post.model';
import {
  createPost,
  findPost,
  findAndUpdate,
  deletePost,
} from '../service/post.service';

export async function createPostHandler(req: Request, res: Response) {
  const userId = get(req, 'user._id');
  const { body } = req;

  const post = await createPost({ ...body, userId });

  return res.send(post);
}

export async function updatePostHandler(req: Request, res: Response) {
  const userId = get(req, 'user._id');
  const postId = get(req, 'params.postId');
  const update = req.body;

  const post = await findPost({ postId });

  if (!post) {
    return res.sendStatus(404);
  }

  if (String(post.userId) !== userId) {
    return res.sendStatus(401);
  }

  const updatedPost = await findAndUpdate({ postId }, update, { new: true });

  return res.send(updatedPost);
}

export async function getSinglePostHandler(req: Request, res: Response) {
  const postId = get(req, 'params.postId');
  const post = await findPost({ postId });

  if (!post) {
    return res.sendStatus(404);
  }

  return res.send(post);
}

export async function getPostsHandler(req: Request, res: Response) {
  const posts = await Post.find({});

  if (!posts) {
    return res.sendStatus(404);
  }

  return res.send(posts);
}

export async function deletePostHandler(req: Request, res: Response) {
  const userId = get(req, 'user._id');
  const postId = get(req, 'params.postId');

  const post = await findPost({ postId });

  if (!post) {
    return res.sendStatus(404);
  }

  if (String(post.userId) !== String(userId)) {
    return res.sendStatus(401);
  }

  await deletePost({ postId });

  return res.sendStatus(200);
}
