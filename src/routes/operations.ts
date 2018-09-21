import { Router } from 'express'
import { getDiffIndices } from '@/controllers/operations.getDiffIndices'

const operationsRouter = Router()

operationsRouter.get('/compare/indices', getDiffIndices)

export default operationsRouter
