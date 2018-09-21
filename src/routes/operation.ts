import { Router } from 'express'
import { getOperation } from '@/controllers/operation.getOperation'

const operationRouter = Router()

operationRouter.get('/', getOperation)

export default operationRouter
