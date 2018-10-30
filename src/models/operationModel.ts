import { aql } from 'arangojs'
import { getDb } from '@/database'

export const queryOperations = async () => {
  try {
    const opsQuery = await getDb().query(aql`
      FOR op IN operations
        RETURN op
    `)

    const result = await opsQuery.all()

    return result
  } catch (err) {
    throw new Error(err)
  }
}

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
