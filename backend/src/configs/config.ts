import dotenv from 'dotenv'
import path from 'path'
import Joi from 'joi'

const envPath = __dirname.indexOf('config') ? '../../.env' : '../env'
dotenv.config({ path: path.join(__dirname, envPath) })

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('production', 'development', 'test')
      .default('development'),
    PORT: Joi.number().default(3000),
    SALT_ROUND: Joi.number().default(10),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    MONGODB_USER: Joi.string().required().description('Mongo DB username'),
    MONGODB_PASS: Joi.string().required().description('Mongo DB password'),
    REDIS_PORT: Joi.string().required().description('Redis cache port'),
    REDIS_HOST: Joi.string().required().description('Redis cache host'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description('minutes after which access tokens expires'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30),
  })
  .unknown()

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

export const env: string = envVars.NODE_ENV,
  port: number = envVars.PORT,
  baseUrl = `http://localhost:${envVars.PORT}`,
  saltRound: number = envVars.SALT_ROUND,
  mongo: Record<string, string> = {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    user: envVars.MONGODB_USER,
    pass: envVars.MONGODB_PASS,
  },
  redis: Record<string, string | number> = {
    port: envVars.REDIS_PORT as number,
    host: envVars.REDIS_HOST as string,
  },
  jwt: Record<string, string> = {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
  }
