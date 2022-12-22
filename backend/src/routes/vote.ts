import express from 'express'
import { voteWeb } from '../controllers'
import { catchAsync } from '../utils'

const router = express.Router()

router.route('/web').post(catchAsync(voteWeb))

const voteRouter = express.Router()
voteRouter.use('/vote', router)
export default voteRouter
