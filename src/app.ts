import express from 'express'
import bodyparser from 'body-parser'
import cors from 'cors'
import errorHandler from '@/utils/errorHandler'

export const app = express()

// bodyparser
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

// cors
app.use(cors())

// routes
import operation from '@/routes/operation'
app.use('/operation', operation)

import operations from '@/routes/operations'
app.use('/operations', operations)

// handle errors (fingers crossed)
app.use(errorHandler)
