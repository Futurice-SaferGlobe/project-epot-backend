import { RequestHandler } from 'express'
import logger from '@/logger/logger'
import { aql } from 'arangojs'
import { getDb } from '@/database'

export const getOperation: RequestHandler = async (req, res, next) => {
  try {
    const { operationId, section } = req.body

    const db = getDb()

    const operationQuery = await db.query(aql`
      FOR op IN operations
        FILTER op.internalId == ${operationId}
        RETURN op
    `)

    const { _rev, _id, ...result } = await operationQuery.next()

    res.status(200).send({ operation: result })
  } catch (err) {
    next(err)
  }
}
