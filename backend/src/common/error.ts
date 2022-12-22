import { HttpMessages, HttpStatus, JSON } from '../types'

export default class BaseError extends Error {
  public readonly statusCode: HttpStatus
  public readonly errorPayload: JSON
  public readonly isOperational: boolean

  constructor(
    statusCode: HttpStatus,
    message: HttpMessages,
    errorPayload: JSON,
    isOperational: boolean,
  ) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)

    this.statusCode = statusCode
    this.errorPayload = errorPayload
    this.isOperational = isOperational
  }
}
