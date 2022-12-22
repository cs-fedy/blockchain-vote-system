import express from 'express'
import { signup, login, logout } from '../controllers'
import { catchAsync } from '../utils'
import {
  auth,
  checkUserDoesNotExist,
  getRefresh,
  getUser,
  validate,
} from '../middlewares'
import {
  loginSchema,
  logoutSchema,
  refreshSchema,
  signupSchema,
} from '../validators'

const router = express.Router()

router
  .route('/signup')
  .post([validate(signupSchema), checkUserDoesNotExist, catchAsync(signup)])

router.route('/login').post([validate(loginSchema), getUser, catchAsync(login)])

router
  .route('/refresh')
  .post([validate(refreshSchema), getRefresh, getUser, catchAsync(login)])

router
  .route('/logout')
  .post([auth, validate(logoutSchema), getUser, catchAsync(logout)])

const authRouter = express.Router()
authRouter.use('/auth', router)
export default authRouter
