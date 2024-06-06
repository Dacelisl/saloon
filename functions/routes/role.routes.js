import express from 'express'
import { roleController } from '../controllers/role.controller.js'
import { adminAccess, registeredUser } from '../middleware/auth.js'

export const RoleRoutes = express.Router()

RoleRoutes.get('/', registeredUser, roleController.getAllRoles)
RoleRoutes.get('/:rid', registeredUser, roleController.getRoleId)
RoleRoutes.post('/', adminAccess, roleController.createRole)
RoleRoutes.put('/:rid', adminAccess, roleController.updateRole)
RoleRoutes.delete('/:rid', adminAccess, roleController.deleteRole)
