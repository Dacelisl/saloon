import express from 'express'
import { serviceController } from '../controllers/service.controller.js'
import { adminAccess, registeredUser } from '../middleware/auth.js'

export const ServiceRoutes = express.Router()

ServiceRoutes.get('/', registeredUser, serviceController.getAllServices)
ServiceRoutes.get('/:sid', registeredUser, serviceController.getServiceId)
ServiceRoutes.post('/', adminAccess, serviceController.createService)
ServiceRoutes.put('/:sid', adminAccess, serviceController.updateService)
ServiceRoutes.delete('/:sid', adminAccess, serviceController.deleteService)
