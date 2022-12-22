import router from './routes'
import express, { Application } from 'express'

const configExpressApp = async () => {
  const app: Application = express()
  app.use('/api', router)
  return app
}

export default configExpressApp
