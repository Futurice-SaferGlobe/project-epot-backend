import express from 'express'
import bodyparser from 'body-parser'
import cors from 'cors'
import errorHandler from '@/utils/errorHandler'
import { getDb } from '@/database'

import operation from '@/routes/operation'
import operations from '@/routes/operations'

export const app = express()

// bodyparser
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

// cors
app.use(cors())

// routes
app.use('/operation', operation)
app.use('/operations', operations)

// handle errors (fingers crossed)
app.use(errorHandler)
