import express from 'express';

import {
  deleteUser,
  getUsers,
  postUser,
  putUser,
} from '../controllers/userController.js';
import { validateBody } from '../middlewares/validateBody.js';
import { post_userSchema } from '../helpers/validationSchemas/userSchemas.js';

const router = express.Router();

// GET
router.get('/', getUsers);

// POST
router.post(
  '/',
  (req, res, next) => validateBody(req, res, next, post_userSchema),
  postUser,
);

// PUT
router.put('/:id', putUser);

// DELETE
router.delete('/:id', deleteUser);

export default router;
