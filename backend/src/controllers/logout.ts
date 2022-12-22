import { Request, Response } from 'express'
import { HttpStatus } from '../types'
import { logout } from '../services'

const logoutController = async (req: Request, res: Response) => {
  const {
    refreshToken,
    authPayload: { userId, accessToken },
  } = req.body
  await logout({ refreshToken, userId, accessToken })
  return res.status(HttpStatus.OK).json({
    status: HttpStatus.OK,
    payload: { msg: 'logged out successfully' },
  })
}

export default logoutController
