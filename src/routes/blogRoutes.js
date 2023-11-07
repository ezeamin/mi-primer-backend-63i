import express from 'express';

import {
  getBlogs,
  getBlogsByUser,
  postBlog,
} from '../controllers/blogController.js';

// import { validateBody } from '../middlewares/validateBody.js';

// import {
//   post_userSchema,
//   put_userSchema,
// } from '../helpers/validationSchemas/userSchemas.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const router = express.Router();

// GET
router.get('/', getBlogs);
router.get('/mine', isAuthenticated, getBlogsByUser);

// POST
router.post(
  '/',
  isAuthenticated,
  // Agregar validacion del body
  postBlog,
);

export default router;
