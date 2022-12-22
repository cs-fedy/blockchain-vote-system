import { NextFunction, Request, Response } from 'express'
import { refreshModel } from '../models'
import moment from 'moment'
import { errorTypes } from '../types'

export async function getRefresh(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { refreshToken } = req.body
  const fetchedRefreshToken = await refreshModel.findOne({
    token: refreshToken,
  })

  if (
    !fetchedRefreshToken ||
    moment().isBefore(fetchedRefreshToken.expiresIn)
  ) {
    const invalidOrExpiredToken = new errorTypes.BadRequestError({
      msg: 'invalid / expired refresh token',
    })

    return next(invalidOrExpiredToken)
  }

  Object.assign(req.body, { refreshToken: fetchedRefreshToken })
  next()
}
