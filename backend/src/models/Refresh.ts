import mongoose from 'mongoose'
import { IBSchema } from '../types'
import { User } from './User'

interface Refresh extends IBSchema {
  token: string
  owner: User | string
  expiresIn: Date
}

const refreshSchema = new mongoose.Schema<Refresh>(
  {
    token: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    expiresIn: { type: Date, required: true },
  },
  { timestamps: true },
)

refreshSchema.method('toJSON', function () {
  const { _id, ...object } = this.toObject()
  object.id = _id
  return object
})

const refreshModel = mongoose.model<Refresh>('Refresh', refreshSchema)

export default refreshModel
