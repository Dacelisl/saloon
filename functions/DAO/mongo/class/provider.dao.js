import { ProviderModel } from '../models/provider.model.js'
import { ProviderDTO } from '../../DTO/provider.dto.js'
class ProviderDAO {
  async getAllProviders() {
    try {
      const providers = await ProviderModel.find().lean()
      const formattedProviders = providers.map((provider) => (provider ? new ProviderDTO(provider) : null))
      return formattedProviders
    } catch (error) {
      throw new Error(`function DAO getAllProvider  ${error}`)
    }
  }
  async createProvider(dataProvider) {
    try {
      const provider = await ProviderModel.create(dataProvider)
      return  provider ? new ProviderDTO(provider) : null
    } catch (error) {
      throw new Error(`function DAO createProvider ${error}`)
    }
  }
  async getProviderByID(id) {
    try {
      const provider = await ProviderModel.findById(id)
      return provider ? new ProviderDTO(provider) : null
    } catch (error) {
      throw new Error(`function DAO getProviderByID  ${error}`)
    }
  }
  async getProviderByName(name) {
    try {
      const provider = await ProviderModel.findOne({ name: name })
      return provider ? new ProviderDTO(provider) : null
    } catch (error) {
      throw new Error(`function DAO getProviderByName ${error}`)
    }
  }
  async updateProvider(providerId, updatedData) {
    try {
      const result = await ProviderModel.updateOne({ _id: providerId }, updatedData)
      return result
    } catch (error) {
      throw new Error(`Function DAO updateProvider: ${error.message}`)
    }
  }
  async deleteProvider(providerId) {
    try {
      return await ProviderModel.deleteOne({ _id: providerId })
    } catch (error) {
      throw new Error(`function DAO deleteProvider ${error}`)
    }
  }
}
export const providerDAO = new ProviderDAO()
