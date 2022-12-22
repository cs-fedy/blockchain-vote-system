import mongoose from 'mongoose'
import { IBSchema } from '../types'

const requiredString = {
  type: String,
  required: true,
}

const requiredNumber = {
  type: Number,
  required: true,
}

export interface User extends IBSchema {
  cin: number
  fullName: string
  email: string
  password: string
  role: string
}

const userSchema = new mongoose.Schema<User>(
  {
    cin: requiredNumber,
    fullName: requiredString,
    email: requiredString,
    password: requiredString,
    role: requiredString,
  },
  { timestamps: true },
)

userSchema.method('toJSON', function () {
  const { _id, ...object } = this.toObject()
  object.id = _id
  return object
})

const userModel = mongoose.model<User>('User', userSchema)

export default userModel
