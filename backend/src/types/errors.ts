import { BaseError } from '../common'
import HttpMessages from './messages'
import HttpStatus from './status'
import JSON from './json'

export class InternalServerError extends BaseError {
  constructor(errorPayload: JSON = { msg: 'An internal error has occurred' }) {
    super(
      HttpStatus.INTERNAL_SERVER_ERROR,
      HttpMessages.H500,
      errorPayload,
      false,
    )
  }
}

export class BadRequestError extends BaseError {
  constructor(errorPayload: JSON) {
    super(
      HttpStatus.BAD_REQUEST,
      HttpMessages.H400,
      errorPayload,
      true /* is Operational */,
    )
  }
}

export class NotFoundError extends BaseError {
  constructor(errorPayload: JSON = { msg: 'resource does not exist' }) {
    super(HttpStatus.NOT_FOUND, HttpMessages.H404, errorPayload, true)
  }
}

export class UnauthorizedRequest extends BaseError {
  constructor(
    errorPayload: JSON = {
      msg: 'You are not authorized to access this route',
    },
  ) {
    super(HttpStatus.UNAUTHORIZED, HttpMessages.H401, errorPayload, true)
  }
}
