import { aql } from 'arangojs'
import { getDb } from '@/database'

export const queryOperation = async operationId => {
  try {
    const opQuery = await getDb().query(aql`
      FOR op IN operations
        FILTER op.internalId == ${operationId}
        LIMIT 1
        RETURN op
    `)

    const result = await opQuery.next()

    return result
  } catch (err) {
    throw new Error(err)
  }
}

export const queryOperationSection = async (
  operationId: string,
  index: number,
  subIndex: number
) => {
  try {
    const opSectionQuery = await getDb().query(aql`
      FOR op IN operations
        FILTER op.internalId == ${operationId}
        LIMIT 1
        LET section = (
          FOR section IN op.data
            FILTER section.index == ${index}
            LIMIT 1
            LET subheader = (
              FOR sub IN section.subheaders
                FILTER sub.index == ${subIndex}
                LIMIT 1
                RETURN sub
            )
            RETURN {
              index: section.index,
              title: section.title,
              content: section.content,
              labels: section.labels,
              subheader: subheader
            }
        )
        RETURN {
          operation: op.operation,
          area: op.area,
          internalId: op.internalId,
          section: section
        }
    `)

    const result = await opSectionQuery.next()

    return result
  } catch (err) {
    throw new Error(err)
  }
}
