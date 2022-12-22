import { config, morgan } from '../configs'
import { errorTypes } from '../types'
import { errorHandler } from '../middlewares'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

import authRouter from './auth'
import usersRouter from './user'
import electionRouter from './election'

const routes: Array<express.Router> = [authRouter, usersRouter, electionRouter]

const middlewares: Array<any> = []
if (config.env !== 'test') {
  middlewares.push(morgan.successHandler)
  middlewares.push(morgan.errorHandler)
}

// parse cookies
middlewares.push(express.json())

// set security HTTP headers
middlewares.push(
  helmet({
    contentSecurityPolicy: false,
  }),
)

// parse json request body
middlewares.push(express.json())

// parse urlencoded request body
middlewares.push(express.urlencoded({ extended: true }))

// gzip compression
middlewares.push(compression())

// enable cors
middlewares.push(cors())

const router = express.Router()
middlewares.forEach((middleware: any) => router.use(middleware))
routes.forEach((route) => router.use('/', route))

// send back a 404 error for any unknown api request
router.use((req, res, next) => {
  next(new errorTypes.NotFoundError())
})

// handle error
router.use(errorHandler)

export default router
