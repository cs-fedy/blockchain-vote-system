import winston from 'winston'
import { env } from './config'

class Logger {
  private logger: winston.Logger

  private static instance: Logger

  constructor() {
    this.logger = winston.createLogger({
      level: env === 'development' ? 'debug' : 'info',
      format: winston.format.combine(
        env === 'development'
          ? winston.format.colorize()
          : winston.format.uncolorize(),
        winston.format.splat(),
        winston.format.printf(({ level, message }) => `${level}: ${message}`),
      ),
      transports: [
        new winston.transports.Console({
          stderrLevels: ['error'],
        }),
      ],
    })
  }

  public static getLoggerInstance() {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  public static getLogger() {
    const logger = Logger.getLoggerInstance()
    return logger.logger
  }
}

export default Logger.getLogger()
