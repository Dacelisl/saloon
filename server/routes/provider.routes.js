import express from 'express'
import { providerController } from '../controllers/provider.controller.js'
import { adminAccess, registeredUser } from '../middleware/auth.js'

export const ProviderRoutes = express.Router()

ProviderRoutes.get('/', registeredUser, providerController.getAllProviders)
ProviderRoutes.get('/:pid', registeredUser, providerController.getProviderByID)
ProviderRoutes.get('/name/:name', registeredUser, providerController.getProviderByName)
ProviderRoutes.post('/', adminAccess, providerController.createProvider)
ProviderRoutes.put('/:rid', adminAccess, providerController.updateProvider)
ProviderRoutes.delete('/:rid', adminAccess, providerController.deleteProvider)
