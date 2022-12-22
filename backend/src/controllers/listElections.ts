import { Request, Response } from 'express'
import { HttpStatus } from '../types'

const listElectionsController = async (req: Request, res: Response) => {
  return res.status(HttpStatus.OK).json({
    status: HttpStatus.OK,
    payload: {
      // TODO: return fetched elections
    },
  })
}

export default listElectionsController
