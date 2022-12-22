import { commonJobConfig as configQueue } from '../common'
import Queue from 'bull'
import { userModel } from '../models'

interface AccountCreatedJob {
  userId: string
}

type ProcessFunction = Queue.ProcessCallbackFunction<AccountCreatedJob>
const processFunction: ProcessFunction = async ({ data }) => {
  const user = await userModel.findById(data.userId)
  // TODO: delegate the work to solidity
}

const queue = configQueue<AccountCreatedJob>('account_created', processFunction)
const accountCreated = (data: AccountCreatedJob) => {
  queue.add(data)
}

export default accountCreated
