import { NextFunction, Request, Response } from 'express'
import { userModel } from '../models'
import { errorTypes } from '../types'

export async function checkUserDoesNotExist(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email } = req.body
  const fetchedUser = await userModel.findOne({ email })
  if (fetchedUser) {
    const userAlreadyExist = new errorTypes.BadRequestError({
      msg: 'user already exist',
    })

    return next(userAlreadyExist)
  }

  next()
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  const {
    authPayload: { userId },
  } = req.body
  const fetchedUser = await userModel.findById(userId)
  if (!fetchedUser) {
    const userDoesNotExist = new errorTypes.BadRequestError({
      msg: 'user does not exist',
    })

    return next(userDoesNotExist)
  }

  Object.assign(req.body, { user: fetchedUser })
  next()
}
