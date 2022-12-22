import { commonJobConfig as configQueue } from '../common'
import Queue from 'bull'

interface ChoiceCreatedJob {
  electionId: string
  label: string
  avatarURL: string
}

type ProcessFunction = Queue.ProcessCallbackFunction<ChoiceCreatedJob>
const processFunction: ProcessFunction = async ({ data }) => {
  // TODO: delegate the work to solidity
}

const queue = configQueue<ChoiceCreatedJob>('choice_created', processFunction)
const choiceCreated = (data: ChoiceCreatedJob) => {
  queue.add(data)
}

export default choiceCreated
