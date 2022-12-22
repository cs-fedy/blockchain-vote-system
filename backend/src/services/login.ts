import moment from 'moment'
import { randomUUID } from 'crypto'
import jwt from 'jsonwebtoken'
import { config, redis } from '../configs'
import { refreshModel } from '../models'

type LoginArgs = {
  userId: string
  role: string
}

const login = async (args: LoginArgs) => {
  const jwtOptions = { expiresIn: `${config.jwt.accessExpirationMinutes}m` }
  const accessToken = jwt.sign(args, config.jwt.secret, jwtOptions)

  //* we create a list in the redis cache to keep track of the valid access tokens.
  //* If a user provides an access token that is not in this list, we end his request.
  const accessKey = `access_${args.userId}`
  await redis.lpush(accessKey, accessToken)

  const refreshToken = randomUUID()
  const refreshTokenExpiration = moment()
    .add(config.jwt.refreshExpirationDays, 'days')
    .valueOf()

  await refreshModel.create({
    owner: args.userId,
    token: refreshToken,
    expiresIn: refreshTokenExpiration,
  })

  return {
    accessToken,
    refreshToken,
  }
}

export default login
