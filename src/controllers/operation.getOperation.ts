import { RequestHandler } from 'express'
import logger from '@/logger/logger'
import { aql } from 'arangojs'
import { getDb } from '@/database'

const operations = [
  {
    operation: 'Unamid',
    area: 'Darfur',
    operationId: 'unamid',
    data: [
      {
        index: 1,
        title: 'Somekind of Title',
        content: 'Section content for "Somekind of Title"',
        subheaders: [
          {
            index: 1,
            title: 'Conflict Prevention',
            content: 'Subheader section content for "Conflict Prevention"'
          },
          {
            index: 2,
            title: 'Digitalents Helsinki',
            content: 'Subheader section content for "Digitalents Helsinki"'
          }
        ]
      }
    ]
  }
]

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
