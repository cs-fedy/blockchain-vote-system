import Queue from 'bull'
import { config } from '../configs'

const configQueue = <T>(
  queueName: string,
  processFunction: Queue.ProcessCallbackFunction<T>,
) => {
  const options = {
    redis: { ...config.redis },
  }

  const queue = new Queue(queueName, options)
  queue.process(processFunction)
  return queue
}

export default configQueue
