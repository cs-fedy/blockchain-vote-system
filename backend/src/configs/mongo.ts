import mongoose from 'mongoose'
import { mongo } from './config'

const connectDb = () =>
  mongoose.connect(mongo.url, { user: mongo.user, pass: mongo.pass })

export default connectDb
