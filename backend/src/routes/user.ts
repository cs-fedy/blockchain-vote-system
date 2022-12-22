import express from 'express'
import { catchAsync } from '../utils'
import { logged } from '../controllers'
import { auth } from '../middlewares'

const router = express.Router()

router.route('/logged').get([auth, catchAsync(logged)])

const usersRouter = express.Router()
usersRouter.use('/users', router)
export default usersRouter
