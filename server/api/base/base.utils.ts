import { Response, NextFunction } from 'express'
import jsonpatch from 'fast-json-patch'

export const respondWithResult = (res: Response, next: NextFunction, statusCode: number = 200) => {
  return (entity: any) => {
    if (entity) {
      res.status(statusCode)
      res.json(entity)
      return next()
    }
    return null
  }
}

export const removeEntity = (res: Response) => {
  return async (entity: any) => {
    if (entity) {
      await entity.remove()
      res.status(204)
      res.end()
    }
  }
}

export const patchUpdates = (patches: any) => {
  return (entity: any) => {
    try {
      jsonpatch.applyPatch(entity, patches, /* validate */ true)
    } catch (err) {
      return Promise.reject(err)
    }
    return entity.save()
  }
}

export const handleEntityNotFound = (res: Response) => {
  return (entity: any) => {
    if (!entity) {
      res.status(404)
      res.end()
      return null
    }
    return entity
  }
}

export const handleError = (res: Response) => {
  return (err: any) => {
    console.error(`[ERROR] ${err.name} ===> \n`, err, '<===')
    switch (err.name) {
      case 'MongoError':
        if (err.code === 11000) {
          err.statusCode = 400
        }
        break
      case 'ValidationError':
        err.statusCode = 400
        break
      case 'CastError':
        err.statusCode = 400
        break
    }
    res.status(err.statusCode)
    res.send(err)
  }
}
