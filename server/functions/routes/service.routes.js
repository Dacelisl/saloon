import express from 'express'
import { serviceController } from '../controllers/service.controller.js'
import { authorize } from '../middleware/auth.js'

export const ServiceRoutes = express.Router()

ServiceRoutes.get('/', authorize, serviceController.getAllServices)
ServiceRoutes.get('/:sid', authorize, serviceController.getServiceId)
ServiceRoutes.post('/', authorize, serviceController.createService)
ServiceRoutes.put('/:sid', authorize, serviceController.updateService)
ServiceRoutes.delete('/:sid', authorize, serviceController.deleteService)
