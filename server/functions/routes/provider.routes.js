import express from 'express'
import { providerController } from '../controllers/provider.controller.js'
import { authorize } from '../middleware/auth.js'

export const ProviderRoutes = express.Router()

ProviderRoutes.get('/', authorize, providerController.getAllProviders)
ProviderRoutes.get('/:pid', authorize, providerController.getProviderByID)
ProviderRoutes.get('/name/:name', authorize, providerController.getProviderByName)
ProviderRoutes.post('/', authorize, providerController.createProvider)
ProviderRoutes.put('/:rid', authorize, providerController.updateProvider)
ProviderRoutes.delete('/:rid', authorize, providerController.deleteProvider)
