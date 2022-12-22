import jwt from 'jsonwebtoken'
import moment from 'moment'
import { config, redis } from '../configs'
import { errorTypes } from '../types'
import { NextFunction, Request, Response } from 'express'

const verifyToken = (token: string) => {
  try {
    const accessToken = jwt.verify(token, config.jwt.secret)
    const { userId, exp } = accessToken as jwt.JwtPayload
    return { isValid: true, payload: { userId, exp } }
  } catch (err) {
    return { isValid: false, payload: {} }
  }
}

export default async function auth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization || ''
  if (!authHeader)
    return next(
      new errorTypes.BadRequestError({
        msg: 'Authorization header must be provided',
      }),
    )

  const token = authHeader.split('Bearer ')[1]
  if (!token)
    return next(
      new errorTypes.BadRequestError({
        msg: 'Authorization token must be: Bearer [token]',
      }),
    )

  const { isValid, payload } = verifyToken(token)
  if (!isValid) {
    const invalidToken = new errorTypes.BadRequestError({
      msg: 'Invalid/Expired token',
    })
    return next(invalidToken)
  }

  const { userId, exp } = payload
  if (moment().isAfter(exp)) {
    const invalidToken = new errorTypes.BadRequestError({
      msg: 'Invalid/Expired token',
    })
    return next(invalidToken)
  }

  const key = `$access_${userId}`
  const accessToken = await redis.lpos(key, token)
  if (!accessToken) {
    const tokenBlackListed = new errorTypes.BadRequestError({
      msg: 'Token is black listed',
    })
    return next(tokenBlackListed)
  }

  Object.assign(req.body, { authPayload: { accessToken: token, userId } })
  next()
}
