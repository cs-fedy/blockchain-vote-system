import { Request, Response } from 'express'
import { HttpStatus } from '../types'

const listChoicesController = async (req: Request, res: Response) => {
  return res.status(HttpStatus.OK).json({
    status: HttpStatus.OK,
    payload: {
      // TODO: return the fetched choices
    },
  })
}

export default listChoicesController
