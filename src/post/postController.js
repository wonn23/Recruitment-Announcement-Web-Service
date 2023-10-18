import { statusCode } from '../utils/statusCode.js';
import { postService } from './postService.js';
const postController = {
  createPost: async (req, res, next) => {
    try {
      const newPostData = req.body;

      const { message, post } = await postService.createPost({ newPostData });
      statusCode.setResponseCode201(res);
      res.send({ message, post });
    } catch (error) {
      next(error);
    }
  },
  submitApplication: async (req, res, next) => {
    try {
      const postId = req.params.postId;
      const newApplicationData = req.body;

      const { message, application } = await postService.submitApplication({ postId, newApplicationData });
      statusCode.setResponseCode201(res);
      res.send({ message, application })
    } catch (error) {
      next(error);
    }
  },
  getAllPosts: async (req, res, next) => {
    try {
      const search = req.query.search;
      const { message, posts } = await postService.getAllPosts(search);

      statusCode.setResponseCode200(res);
      res.send({ message, posts });
    } catch (error) {
      next(error);
    }
  },
  getPost: async (req, res, next) => {
    try {
      const postId = req.params.postId;
      const { message, post } = await postService.getPost({ postId });

      statusCode.setResponseCode200(res);
      res.send({ message, post });
    } catch (error) {
      next(error);
    }
  },
  deletePost: async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const postId = req.params.postId;

      const post = await postService.deletePost({ userId, postId });

      statusCode.setResponseCode200(res);
      res.send(post.message);
    } catch (error) {
      next(error);
    }
  },
  updatePost: async (req, res, next) => {
    try {
      const postId = req.params.postId;
      const toUpdate = req.body;
      const { message, updatedPost } = await postService.updatePost({ postId, toUpdate });

      statusCode.setResponseCode200(res);
      res.send({ message, updatedPost });
    } catch (error) {
      next(error);
    }
  },
};

export { postController };
