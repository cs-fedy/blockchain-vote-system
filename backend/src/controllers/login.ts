import { Request, Response } from 'express'
import { HttpStatus } from '../types'
import { login } from '../services'

const loginController = async (req: Request, res: Response) => {
  const {
    authPayload: { userId, role },
  } = req.body
  const { accessToken, refreshToken } = await login({ userId, role })

  return res.status(HttpStatus.OK).json({
    status: HttpStatus.OK,
    payload: {
      accessToken,
      refreshToken,
    },
  })
}

export default loginController
