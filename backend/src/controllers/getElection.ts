import { Request, Response } from 'express'
import { HttpStatus } from '../types'
import { getElection } from '../services'

const getElectionController = async (req: Request, res: Response) => {
  const { electionId } = req.params
  const payload = await getElection(electionId)
  return res.status(HttpStatus.OK).json({
    status: HttpStatus.OK,
    payload,
  })
}

export default getElectionController
