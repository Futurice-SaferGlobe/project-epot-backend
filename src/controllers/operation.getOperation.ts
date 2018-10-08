import { RequestHandler } from 'express'
import logger from '@/logger/logger'
import { queryOperation } from '@/models/operationModel'

export const getOperation: RequestHandler = async (req, res, next) => {
  try {
    const { operationId, section } = req.body

    if (operationId) {
      // fetch an operation as is
      const result = await queryOperation(operationId)

      res.status(200).send(result)
    } else {
      // if no operationId was found in the body
      res.status(400).send({ message: `Please provide operationId` })
    }
  } catch (err) {
    next(err)
  }
}
