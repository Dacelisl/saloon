import express from 'express'
import { userController } from '../controllers/user.controller.js'
import { adminAccess, registeredUser } from '../middleware/auth.js'

export const UserRoutes = express.Router()

UserRoutes.get('/', registeredUser, userController.getAllUsers)
UserRoutes.get('/:id', registeredUser, userController.getUserById)
UserRoutes.get('/email/:email', registeredUser, userController.getUserByEmail)
UserRoutes.get('/name/:name', registeredUser, userController.getClientsByName)
UserRoutes.post('/', registeredUser, userController.saveUser)
UserRoutes.put('/:id', registeredUser, userController.updateUser)
UserRoutes.delete('/:email', adminAccess, userController.deleteUser)
