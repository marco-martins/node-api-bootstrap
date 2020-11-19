import { Router } from 'express'
import userController from './user.controller'

const userRouter = Router()

userRouter.get('/', userController.index)
userRouter.get('/:id', userController.show)
userRouter.post('/', userController.create)
userRouter.put('/:id', userController.upsert)
userRouter.patch('/:id', userController.patch)
userRouter.delete('/:id', userController.delete)

module.exports = userRouter
