import Redis from 'ioredis'
import { redis as credentials } from './config'
import logger from './logger'

const redis = new Redis({
  port: credentials.port as number,
  host: credentials.host as string,
})

redis.on('error', (error: string) => {
  logger.error('Redis connection error', error)
})

export default redis
