import { Request, Response } from 'express'
import { HttpStatus } from '../types'

const getElectionController = async (req: Request, res: Response) => {
  return res.status(HttpStatus.OK).json({
    status: HttpStatus.OK,
    payload: {
      // TODO: return the fetched election
    },
  })
}

export default getElectionController
