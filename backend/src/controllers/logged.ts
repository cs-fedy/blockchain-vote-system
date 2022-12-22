import { Request, Response } from 'express'
import { HttpStatus } from '../types'

const loggedController = async (req: Request, res: Response) => {
  return res.status(HttpStatus.OK).json({
    status: HttpStatus.OK,
    payload: {
      // TODO: return logged user
    },
  })
}

export default loggedController
