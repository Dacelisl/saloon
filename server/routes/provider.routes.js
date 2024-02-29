import express from 'express'
import { providerController } from '../controllers/provider.controller.js'

export const ProviderRoutes = express.Router()

ProviderRoutes.get('/', providerController.getAllProviders)
ProviderRoutes.get('/:pid', providerController.getProviderByID)
ProviderRoutes.get('/name/:name', providerController.getProviderByName)
ProviderRoutes.post('/', providerController.createProvider)
ProviderRoutes.put('/:rid', providerController.updateProvider)
ProviderRoutes.delete('/:rid', providerController.deleteProvider)
