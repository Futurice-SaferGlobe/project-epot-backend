import winston from 'winston'
import chalk from 'chalk'
import { constants } from '@/constants'

const { isProd } = constants

const { combine, timestamp, label, printf } = winston.format

const consoleFormat = printf(info => {
  // TODO: error.message is in some cases undefined. (e.g. arango db)
  if (info.level === 'error') {
    return (
      chalk.gray('▸' + info.timestamp) +
      '\n' +
      chalk.bgRed.hex('#000').bold(` ${info.level.toUpperCase()}    `) +
      '\n' +
      chalk.red(info.message)
    )
  }

  return `${chalk.gray('▸' + info.timestamp)}\n${chalk.green(
    info.level.toUpperCase()
  )} – ${info.message}\n`
})

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: 'error.log',
      level: 'error'
    })
  ]
})

if (!isProd) {
  logger.add(
    new winston.transports.Console({
      format: combine(timestamp(), consoleFormat)
    })
  )
}

export default logger
