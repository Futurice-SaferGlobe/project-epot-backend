import { Request, Response, NextFunction } from 'express'
import logger from '@/logger/logger'

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.stack)

  const clientMessage = {
    message: 'Something went horribly wrong'
  }

  res.status(500).json(clientMessage)
}
