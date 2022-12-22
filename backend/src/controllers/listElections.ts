import { Request, Response } from 'express'
import { HttpStatus } from '../types'
import { listElections } from '../services'

const listElectionsController = async (req: Request, res: Response) => {
  const payload = await listElections()
  return res.status(HttpStatus.OK).json({
    status: HttpStatus.OK,
    payload,
  })
}

export default listElectionsController
