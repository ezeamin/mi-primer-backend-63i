import express from 'express';

import {
  deleteBlog,
  getBlogs,
  postBlog,
  putBlog,
} from '../controllers/blogController.js';

import { validateBody } from '../middlewares/validateBody.js';

import {
  post_blogSchema,
  put_blogSchema,
} from '../helpers/validationSchemas/blogSchemas.js';

import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

// GET
router.get('/', getBlogs);

// POST
router.post(
  '/',
  isAuthenticated,
  isAdmin,
  // Utilizamos un callback para mandar el schema y hacerlo genérico a validateBody
  (req, res, next) => validateBody(req, res, next, post_blogSchema),
  postBlog,
);

// PUT
router.put(
  '/:id',
  isAuthenticated,
  isAdmin,
  (req, res, next) => validateBody(req, res, next, put_blogSchema),
  putBlog,
);

// DELETE
router.delete('/:id', isAuthenticated, isAdmin, deleteBlog);

export default router;
