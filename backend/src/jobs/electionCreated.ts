import { commonJobConfig as configQueue } from '../common'
import Queue from 'bull'

interface ElectionCreatedJob {
  label: string
  startDate: Date
  endDate: Date
}

type ProcessFunction = Queue.ProcessCallbackFunction<ElectionCreatedJob>
const processFunction: ProcessFunction = async ({ data }) => {
  // TODO: delegate the work to solidity
}

const queue = configQueue<ElectionCreatedJob>(
  'election_created',
  processFunction,
)
const electionCreated = (data: ElectionCreatedJob) => {
  queue.add(data)
}

export default electionCreated
