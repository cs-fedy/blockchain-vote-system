import { Request, Response } from 'express'
import { HttpStatus } from '../types'
import { createElection } from '../services'

const createElectionController = async (req: Request, res: Response) => {
  await createElection(req.body)
  return res.status(HttpStatus.CREATED).json({
    status: HttpStatus.CREATED,
    payload: { msg: 'election created' },
  })
}

export default createElectionController
