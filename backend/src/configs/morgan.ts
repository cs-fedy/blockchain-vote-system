import { Request, Response } from 'express'
import morgan from 'morgan'
import { env } from './config'
import logger from './logger'

morgan.token('message', (req, res) => res.statusMessage)

const getIpFormat = () => (env === 'production' ? ':remote-addr - ' : '')
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`

export const successHandler = morgan(successResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode >= 400,
  stream: { write: (message: string) => logger.info(message.trim()) },
})

export const errorHandler = morgan(errorResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode < 400,
  stream: { write: (msg: string) => logger.error(msg.trim()) },
})
