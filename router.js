import Router from 'express'
import UserController from "./UserController.js";

const router = new Router()

router.post('/users', UserController.create)
router.patch('/users/:id', UserController.update)
router.get('/users', UserController.getAll)
router.delete('/users/:id',UserController.delete) // Дополнительно

export default router