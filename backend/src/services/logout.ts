import { redis } from '../configs'
import { refreshModel } from '../models'

type LogoutArgs = {
  accessToken: string
  refreshToken: string
  userId: string
}

const logout = async (args: LogoutArgs) => {
  const accessKey = `access_${args.userId}`
  await redis.lrem(accessKey, 1, args.accessToken)

  await refreshModel.findOneAndDelete({ token: args.refreshToken })
}

export default logout
