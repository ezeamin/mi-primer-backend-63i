import Joi from 'joi';

export const post_userSchema = Joi.object({
  firstname: Joi.string().trim().min(3).max(30).required().messages({
    'string.min': 'El campo firstname debe tener al menos 3 caracteres',
    'string.max': 'El campo firstname debe tener, como mucho, 30 caracteres',
    'any.required': 'El campo firstname es requerido',
    '*': 'Revisa el campo firstname',
  }),
  username: Joi.string().trim().min(3).max(30).required().messages({
    'string.min': 'El campo username debe tener al menos 3 caracteres',
    'string.max': 'El campo username debe tener, como mucho, 30 caracteres',
    'any.required': 'El campo username es requerido',
    '*': 'Revisa el campo username',
  }),
  lastname: Joi.string().trim().min(3).max(30).required().messages({
    'string.min': 'El campo lastname debe tener al menos 3 caracteres',
    'string.max': 'El campo lastname debe tener, como mucho, 30 caracteres',
    'any.required': 'El campo lastname es requerido',
    '*': 'Revisa el campo lastname',
  }),
  password: Joi.string().trim().min(3).max(30).required().messages({
    'string.min': 'El campo password debe tener al menos 3 caracteres',
    'string.max': 'El campo password debe tener, como mucho, 30 caracteres',
    'any.required': 'El campo password es requerido',
    '*': 'Revisa el campo password',
  }),
});
