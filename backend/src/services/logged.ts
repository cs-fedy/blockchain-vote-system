import _ from 'lodash'
import { userModel } from '../models'
type LoggedArgs = {
  userId: string
}

const logged = async (args: LoggedArgs) => {
  const user = await userModel.findById(args.userId)
  return _.omit(user, 'password')
}

export default logged
