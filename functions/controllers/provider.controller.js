import { providerService } from '../services/provider.services.js'
import { sendErrorResponse, sendSuccessResponse } from '../utils/utils.js'

class ProviderController {
  async getAllProviders(req, res) {
    try {
      const providers = await providerService.getAllProviders()
      return sendSuccessResponse(res, providers)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }
  async getProviderByID(req, res) {
    const providerId = req.params.pid
    try {
      const providerFound = await providerService.getProviderByID(providerId)
      return sendSuccessResponse(res, providerFound)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }
  async getProviderByName(req, res) {
    const providerId = req.params.name
    try {
      const providerFound = await providerService.getProviderByName(providerId)
      return sendSuccessResponse(res, providerFound)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }
  async createProvider(req, res) {
    const providerData = req.body
    try {
      const response = await providerService.createProvider(providerData)
      return sendSuccessResponse(res, response)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }
  async updateProvider(req, res) {
    const providerId = req.params.rid
    const data = req.body
    try {
      const resUpdate = await providerService.updateProvider(providerId, data)
      return sendSuccessResponse(res, resUpdate)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }
  async deleteProvider(req, res) {
    const providerId = req.params.rid
    try {
      const resDelete = await providerService.deleteProvider(providerId)
      return sendSuccessResponse(res, resDelete)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }
}
export const providerController = new ProviderController()
