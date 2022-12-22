import express from 'express'
import {
  createElection,
  listElections,
  getElection,
  createChoice,
  listChoices,
} from '../controllers'
import { catchAsync } from '../utils'

const router = express.Router()

router
  .route('/')
  .post(catchAsync(createElection))
  .get(catchAsync(listElections))

router.route('/:electionId').get(catchAsync(getElection))

const choices = express.Router()

choices.route('/').post(catchAsync(createChoice)).get(catchAsync(listChoices))

router.use('/:electionId/choices/', choices)
const electionRouter = express.Router()
electionRouter.use('/elections', router)
export default electionRouter
