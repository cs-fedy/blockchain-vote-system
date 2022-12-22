import Joi from 'joi'
import { objectId } from './custom'

export const createElectionSchema = {
  body: Joi.object({
    label: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
  }).unknown(),
}

export const createChoiceSchema = {
  params: Joi.object({
    electionId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object({
    label: Joi.string().required(),
    avatarURL: Joi.string().uri().required(),
  }).unknown(),
}

export const listChoicesSchema = {
  params: Joi.object({
    electionId: Joi.string().custom(objectId).required(),
  }),
}
