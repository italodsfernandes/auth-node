import { Router } from 'express'
import { UserController } from './controllers/user.controller'

export const router = Router()

const userController = new UserController()

router.post('/users', userController.create)
router.post('/login', userController.authenticate)
