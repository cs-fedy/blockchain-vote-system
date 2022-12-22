import { Request, Response } from 'express'
import { HttpStatus } from '../types'
import { createChoice } from '../services'

const createChoiceController = async (req: Request, res: Response) => {
  const {
    body: { label, avatarURL },
    params: { electionId },
  } = req
  await createChoice({ electionId, label, avatarURL })
  return res.status(HttpStatus.CREATED).json({
    status: HttpStatus.CREATED,
    payload: { msg: 'choice created' },
  })
}

export default createChoiceController
