import { providerFactory } from '../DAO/factory.js'
import { isValid } from '../utils/utils.js'

class ProviderServices {
  async getAllProviders() {
    try {
      const payload = await providerFactory.getAllProviders()
      if (!payload) {
        return {
          status: 'Fail',
          code: 404,
          message: `Error, provider not found getAllProviders`,
          payload: {},
        }
      }
      return {
        status: 'Success',
        code: 200,
        message: 'provider found getAllProviders',
        payload: payload,
      }
    } catch (error) {
      return {
        status: 'Fail',
        code: 500,
        message: `Internal Server Error getAllProviders ${error}`,
        payload: {},
      }
    }
  }
  async getProviderByID(_id) {
    try {
      isValid(_id)
      const payload = await providerFactory.getProviderByID(_id)
      if (payload) {
        return {
          status: 'Success',
          code: 200,
          message: 'provider found',
          payload: payload,
        }
      } else {
        return {
          status: 'Fail',
          code: 404,
          message: `Error, provider not found getProviderByID`,
          payload: {},
        }
      }
    } catch (error) {
      return {
        status: 'Fail',
        code: 500,
        message: `Internal Server Error getProviderByID ${error}`,
        payload: {},
      }
    }
  }
  async getProviderByName(_id) {
    try {
      isValid(_id)
      const payload = await providerFactory.getProviderByName(_id)
      if (payload) {
        return {
          status: 'Success',
          code: 200,
          message: 'provider found',
          payload: payload,
        }
      } else {
        return {
          status: 'Fail',
          code: 404,
          message: `Error, provider not found getProviderByName`,
          payload: {},
        }
      }
    } catch (error) {
      return {
        status: 'Fail',
        code: 500,
        message: `Internal Server Error getProviderByID ${error}`,
        payload: {},
      }
    }
  }
  async createProvider(data) {
    try {
      const newProvider = await providerFactory.createProvider(data)
      if (!newProvider) {
        return {
          status: 'Fail',
          code: 400,
          message: 'Provider created properties are missing or undefined',
          payload: {},
        }
      }
      return {
        status: 'Success',
        code: 200,
        message: 'Provider created',
        payload: newProvider,
      }
    } catch (error) {
      return {
        code: 500,
        status: 'error',
        message: `Error to save createProvider: ${error.message}`,
        payload: {},
      }
    }
  }
  async updateProvider(providerId, updatedData) {
    try {
      const providerFound = await providerFactory.getProviderByID(providerId)
      if (!providerFound) {
        return {
          status: 'Fail',
          code: 404,
          message: 'provider not exist updateProvider',
          payload: {},
        }
      }
      const updateProvider = await providerFactory.updateProvider(providerId, updatedData)
      if (updateProvider) {
        return {
          status: 'Success',
          code: 200,
          message: 'provider update successfully',
          payload: updateProvider,
        }
      } else {
        return {
          status: 'Fail',
          code: 404,
          message: `Error updateProvider`,
          payload: {},
        }
      }
    } catch (error) {
      return {
        status: 'Fail',
        code: 500,
        message: `Something went wrong :( ${error}`,
        payload: {},
      }
    }
  }
  async deleteProvider(providerId) {
    try {
      const providerFound = await providerFactory.getProviderByID(providerId)
      if (!providerFound) {
        return {
          status: 'error',
          code: 404,
          message: 'provider not found',
          payload: {},
        }
      }
      const deleted = await providerFactory.deleteProvider(providerId)
      if (deleted.deletedCount > 0) {
        return {
          status: 'Success',
          code: 204,
          message: 'removed provider',
          payload: {},
        }
      } else {
        return {
          status: 'Fail',
          code: 404,
          message: `Error, provider not found deleteProvider`,
          payload: {},
        }
      }
    } catch (error) {
      return {
        status: 'error',
        code: 500,
        message: `Something went wrong deleteProvider:( ${error}`,
        payload: {},
      }
    }
  }
}
export const providerService = new ProviderServices()
