import express from 'express';

import {
  deleteUser,
  getUsers,
  postUser,
  putUser,
} from '../controllers/userController.js';

import { validateBody } from '../middlewares/validateBody.js';

import { post_userSchema, put_userSchema } from '../helpers/validationSchemas/userSchemas.js';

const router = express.Router();

// GET
router.get('/', getUsers);

// POST
router.post(
  '/',
  // Utilizamos un callback para mandar el schema y hacerlo genérico a validateBody
  (req, res, next) => validateBody(req, res, next, post_userSchema),
  postUser,
);

// PUT
router.put(
  '/:id',
  (req, res, next) => validateBody(req, res, next, put_userSchema),
  putUser,
);

// DELETE
router.delete('/:id', deleteUser);

export default router;
