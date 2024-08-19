import express from 'express'
import { roleController } from '../controllers/role.controller.js'
import { authorize } from '../middleware/auth.js'

export const RoleRoutes = express.Router()

RoleRoutes.get('/', authorize, roleController.getAllRoles)
RoleRoutes.get('/:rid', authorize, roleController.getRoleId)
RoleRoutes.post('/', authorize, roleController.createRole)
RoleRoutes.put('/:rid', authorize, roleController.updateRole)
RoleRoutes.delete('/:rid', authorize, roleController.deleteRole)
