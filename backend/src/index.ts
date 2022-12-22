import { config, logger, connectDb as connectDb } from './configs'
import configExpressApp from './app'
import { Server, createServer } from 'http'

let server: Server
connectDb().then(async () => {
  logger.info('connected to Mongodb 🥭')
  const app = await configExpressApp()
  server = createServer(app)
  server = server.listen(config.port, () => {
    logger.info(`listening on port ${config.port} 🌎🚀`)
  })
})

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed')
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error: string) => {
  logger.error(error)
  exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
  logger.info('SIGTERM received')
  if (server) {
    server.close()
  }
  process.exit(0)
})

process.on('SIGINT', () => {
  logger.info('Process has been interrupted')
  if (server) {
    server.close()
  }
  process.exit(0)
})
