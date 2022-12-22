import { NextFunction, Request, Response } from 'express'
import { getElection } from '../services'
import { errorTypes } from '../types'

export async function checkElectionExist(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { electionId } = req.params
  const fetchedElection = await getElection(electionId)
  if (!electionId) {
    const electionDoesNotExist = new errorTypes.BadRequestError({
      msg: 'election does not exist',
    })

    return next(electionDoesNotExist)
  }

  Object.assign(req.body, { election: fetchedElection })
  next()
}
