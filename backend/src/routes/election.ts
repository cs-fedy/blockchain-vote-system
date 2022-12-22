import express from 'express'
import {
  createElection,
  listElections,
  getElection,
  createChoice,
  listChoices,
} from '../controllers'
import { catchAsync } from '../utils'
import {
  auth,
  checkElectionExist,
  getUser,
  isAdmin,
  validate,
} from '../middlewares'
import {
  createChoiceSchema,
  createElectionSchema,
  listChoicesSchema,
} from '../validators'

const router = express.Router()

router
  .route('/')
  .post([
    validate(createElectionSchema),
    getUser,
    isAdmin,
    catchAsync(createElection),
  ])
  .get(catchAsync(listElections))

router.route('/:electionId').get(catchAsync(getElection))

const choices = express.Router()

choices
  .route('/')
  .post([
    validate(createChoiceSchema),
    getUser,
    isAdmin,
    checkElectionExist,
    catchAsync(createChoice),
  ])
  .get([
    validate(listChoicesSchema),
    checkElectionExist,
    catchAsync(listChoices),
  ])

router.use(auth)
router.use('/:electionId/choices/', choices)
const electionRouter = express.Router()
electionRouter.use('/elections', router)
export default electionRouter
