import { object, string } from 'yup';

const payload = {
  body: object({
    title: string().required('title is required'),
    body: string()
      .required('body is required')
      .min(10, 'body is too short - should be at least 10 chars long'),
  }),
};

const params = {
  params: object({
    postId: string().required('postId is required'),
  }),
};

export const createPostSchema = object({
  ...payload,
});

export const updatePostSchema = object({
  ...params,
  ...payload,
});

export const deletePostSchema = object({
  ...params,
});
