import { Request, Response } from 'express'
import { HttpStatus } from '../types'

const createElectionController = async (req: Request, res: Response) => {
  return res.status(HttpStatus.CREATED).json({
    status: HttpStatus.CREATED,
    payload: { msg: 'election created' },
  })
}

export default createElectionController
