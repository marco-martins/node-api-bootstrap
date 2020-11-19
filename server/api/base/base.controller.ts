import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import { respondWithResult, handleEntityNotFound, removeEntity, handleError, patchUpdates } from './base.utils'

export class BaseController<T extends mongoose.Document> {
  // eslint-disable-next-line no-useless-constructor
  constructor (protected model: mongoose.Model<T>) {}

  index = async (req: Request, res: Response, next: NextFunction) => {
    this.model.find().then(respondWithResult(res, next)).catch(handleError(res))
  }

  show = (req: Request, res: Response, next: NextFunction) => {
    this.model
      .findById(req.params.id)
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res, next))
      .catch(handleError(res))
  }

  create = (req: Request, res: Response, next: NextFunction) => {
    this.model.create(req.body).then(respondWithResult(res, next, 201)).catch(handleError(res))
  }

  upsert = (req: Request, res: Response, next: NextFunction) => {
    if (req.body._id) {
      Reflect.deleteProperty(req.body, '_id')
    }
    const options = { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
    this.model
      .findByIdAndUpdate(req.params.id, req.body, options)
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res, next))
      .catch(handleError(res))
  }

  patch = (req: Request, res: Response, next: NextFunction) => {
    if (req.body._id) {
      Reflect.deleteProperty(req.body, '_id')
    }
    this.model.findById(req.params.id)
      .exec()
      .then(handleEntityNotFound(res))
      .then(patchUpdates(req.body))
      .then(respondWithResult(res, next))
      .catch(handleError(res))
  }

  delete = (req: Request, res: Response) => {
    this.model
      .findById(req.params.id)
      .then(handleEntityNotFound(res))
      .then(removeEntity(res))
      .catch(handleError(res))
  }
}
