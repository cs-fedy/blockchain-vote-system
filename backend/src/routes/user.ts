import express from 'express'
import { catchAsync } from '../utils'
import { logged } from '../controllers'

const router = express.Router()

router.route('/logged').get(catchAsync(logged))

const usersRouter = express.Router()
usersRouter.use('/users', router)
export default usersRouter
