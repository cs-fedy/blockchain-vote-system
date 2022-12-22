import { Request, Response } from 'express'
import { HttpStatus } from '../types'
import { signup } from '../services'

const signupController = async (req: Request, res: Response) => {
  const payload = await signup({ ...req.body, role: 'user' })
  return res.status(HttpStatus.CREATED).json({
    status: HttpStatus.CREATED,
    payload,
  })
}

export default signupController
