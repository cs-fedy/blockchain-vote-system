import bcrypt from 'bcrypt'
import { userModel } from '../models'
import { accountCreated } from '../jobs'
import { config } from '../configs'

type TSignup = {
  email: string
  password: string
  cin: number
  fullName: string
  role: string
}

const signup = async (args: TSignup) => {
  const hashedPassword = await bcrypt.hash(args.password, config.saltRound)
  const createdUser = await userModel.create({
    ...args,
    password: hashedPassword,
  })

  accountCreated({ userId: createdUser.id })
  return { userId: createdUser.id }
}

export default signup
