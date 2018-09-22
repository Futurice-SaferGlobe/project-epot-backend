import { RequestHandler } from 'express'
import logger from '@/logger/logger'
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

export const getOperation: RequestHandler = (req, res, next) => {
  try {
    const { operationId, section } = req.body

    const opQuery = operations.find(({ operationId: id }) => id === operationId)

    if (opQuery) {
      const sectionQuery = opQuery.data.find(
        ({ index }) => index === section[0]
      )

      const subsectionQuery = sectionQuery
        ? sectionQuery.subheaders.find(({ index }) => index === section[1])
        : null

      if (sectionQuery && subsectionQuery) {
        // SUCCESS
        const constructedRes = {
          operation: opQuery.operation,
          operationId: opQuery.operationId,
          area: opQuery.area,
          data: {
            index: sectionQuery.index,
            title: sectionQuery.title,
            content: sectionQuery.content,
            subheaders: [
              {
                index: subsectionQuery.index,
                title: subsectionQuery.title,
                content: subsectionQuery.content
              }
            ]
          }
        }

        res.status(200).send(constructedRes)
      } else {
        res.status(404).send({
          message:
            `Couldn't find index of ` +
            `${section[0]}.${section[1]} ` +
            `in ${operationId}`
        })
      }
    } else {
      res
        .status(404)
        .send({ message: `Couldn't find operation of id ${operationId}.` })
    }
  } catch (err) {
    next(err)
  }
}
