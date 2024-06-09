import Router from 'express'
import UserController from "./UserController.js";

const userRouter = new Router()

userRouter.post('/users', UserController.create)
userRouter.patch('/users/:id', UserController.update)
userRouter.get('/users', UserController.getAll)
userRouter.delete('/users/:id',UserController.delete) // Дополнительно

export default userRouter