import Joi from 'joi'
import { password } from './custom'

export const signupSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().custom(password).required(),
    fullName: Joi.string().required(),
    cin: Joi.number().required(),
  }).unknown(),
}

export const loginSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().custom(password).required(),
  }).unknown(),
}

export const refreshSchema = {
  body: Joi.object({
    refreshToken: Joi.string().required(),
  }).unknown(),
}

export const logoutSchema = {
  body: Joi.object({
    refreshToken: Joi.string().required(),
  }).unknown(),
}
