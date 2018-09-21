import { RequestHandler } from 'express'

export const getDiffIndices: RequestHandler = (req, res, next) => {
  res.status(200).send({ message: 'Indices here pls.' })
}
