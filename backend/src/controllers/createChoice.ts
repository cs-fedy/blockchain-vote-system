import { Request, Response } from 'express'
import { HttpStatus } from '../types'

const createChoiceController = async (req: Request, res: Response) => {
  return res.status(HttpStatus.CREATED).json({
    status: HttpStatus.CREATED,
    payload: { msg: 'choice created' },
  })
}

export default createChoiceController
