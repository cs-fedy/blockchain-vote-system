import { Request, Response } from 'express'
import { HttpStatus } from '../types'
import { logged } from '../services'

const loggedController = async (req: Request, res: Response) => {
  const {
    authPayload: { userId },
  } = req.body
  const loggedUser = await logged({ userId })
  return res.status(HttpStatus.OK).json({
    status: HttpStatus.OK,
    payload: loggedUser,
  })
}

export default loggedController
