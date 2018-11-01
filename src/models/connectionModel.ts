import { aql } from 'arangojs'
import { getDb } from '@/database'

export const queryConnection = async (operationId: string) => {
  try {
    const connQuery = await getDb().query(aql`
      FOR conn IN connections
        FILTER conn.operationInternalId == ${operationId}
        LIMIT 1
        RETURN conn
    `)

    const [result] = await connQuery.all()
    console.log(result)
    return result
  } catch (err) {
    throw new Error(err)
  }
}

export const queryConnections = async (operationId: string) => {
  try {
    const connQuery = await getDb().query(aql`
      FOR conn IN connections
        RETURN conn
    `)

    const result = await connQuery.all()
    console.log(result)
    return result
  } catch (err) {
    throw new Error(err)
  }
}
