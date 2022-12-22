import { Request, Response, NextFunction } from 'express'
import _ from 'lodash'
import Joi from 'joi'
import { errorTypes } from '../types'

export default (schema: any) =>
  (req: Request, res: Response, next: NextFunction) => {
    const validSchema = _.pick(schema, ['params', 'query', 'body'])
    const object = _.pick(req, Object.keys(validSchema))
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(object)

    if (error) {
      const errorPayload = error.details.reduce(
        (prev, { message, path }) => ({
          ...prev,
          [path[1]]: message.split('"').join('').trim(),
        }),
        {},
      )

      return next(new errorTypes.BadRequestError(errorPayload))
    }
    Object.assign(req.body, value)
    return next()
  }
