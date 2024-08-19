import express from 'express'
import { userController } from '../controllers/user.controller.js'
import { authorize } from '../middleware/auth.js'

export const UserRoutes = express.Router()

UserRoutes.get('/', authorize, userController.getAllUsers)
UserRoutes.get('/:id', authorize, userController.getUserById)
UserRoutes.get('/email/:email', authorize, userController.getUserByEmail)
UserRoutes.get('/name/:name', authorize, userController.getClientsByName)
UserRoutes.post('/', authorize, userController.saveUser)
UserRoutes.put('/:id', authorize, userController.updateUser)
UserRoutes.delete('/:email', authorize, userController.deleteUser)
