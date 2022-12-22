import { Request, Response } from 'express'
import { HttpStatus } from '../types'
import { listChoices } from '../services'

const listChoicesController = async (req: Request, res: Response) => {
  const { electionId } = req.params
  const payload = await listChoices(electionId)
  return res.status(HttpStatus.OK).json({
    status: HttpStatus.OK,
    payload,
  })
}

export default listChoicesController
