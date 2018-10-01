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
