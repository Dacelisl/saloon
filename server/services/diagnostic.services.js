import { diagnosticFactory } from '../DAO/factory.js'
import { isValid } from '../utils/utils.js'

class DiagnosticServices {
  async getAllUsersDiagnostics() {
    try {
      const payload = await diagnosticFactory.getAllUsersDiagnostics()
      if (!payload) {
        return {
          status: 'Fail',
          code: 404,
          message: `Error, diagnostic not found getAllUsersDiagnostics`,
          payload: {},
        }
      }
      return {
        status: 'Success',
        code: 200,
        message: 'diagnostic found getAllUsersDiagnostics',
        payload: payload,
      }
    } catch (error) {
      return {
        status: 'Fail',
        code: 500,
        message: `Internal Server Error getAllUsersDiagnostics ${error}`,
        payload: {},
      }
    }
  }
  async getDiagnosticById(_id) {
    try {
      isValid(_id)
      const payload = await diagnosticFactory.getDiagnosticById(_id)
      if (payload) {
        return {
          status: 'Success',
          code: 200,
          message: 'diagnostic found',
          payload: payload,
        }
      } else {
        return {
          status: 'Fail',
          code: 404,
          message: `Error, diagnostic not found getDiagnosticById`,
          payload: {},
        }
      }
    } catch (error) {
      return {
        status: 'Fail',
        code: 500,
        message: `Internal Server Error getDiagnosticById ${error}`,
        payload: {},
      }
    }
  }
  async getAllDiagnosticsByUserId(_id) {
    try {
      isValid(_id)
      const payload = await diagnosticFactory.getAllDiagnosticsByUserId(_id)
      if (payload) {
        return {
          status: 'Success',
          code: 200,
          message: 'diagnostic found',
          payload: payload,
        }
      } else {
        return {
          status: 'Fail',
          code: 404,
          message: `Error, diagnostic not found getAllDiagnosticsByUserId`,
          payload: {},
        }
      }
    } catch (error) {
      return {
        status: 'Fail',
        code: 500,
        message: `Internal Server Error getAllDiagnosticsByUserId ${error}`,
        payload: {},
      }
    }
  }
  async createDiagnostic(data) {
    try {
      const newDiagnostic = await diagnosticFactory.createDiagnostic(data)
      if (!newDiagnostic) {
        return {
          status: 'Fail',
          code: 400,
          message: 'Diagnostic created properties are missing or undefined',
          payload: {},
        }
      }
      return {
        status: 'Success',
        code: 201,
        message: 'createDiagnostic created',
        payload: newDiagnostic,
      }
    } catch (error) {
      return {
        code: 500,
        status: 'error',
        message: `Error to save createDiagnostic: ${error}`,
        payload: {},
      }
    }
  }
  async updateDiagnostic(diagnosticId, updatedData) {
    try {
      const diagnosticFound = await diagnosticFactory.getDiagnosticById(diagnosticId)
      if (!diagnosticFound) {
        return {
          status: 'Fail',
          code: 404,
          message: 'diagnostic not exist updateDiagnostic',
          payload: {},
        }
      }
      const updateDiagnostic = await diagnosticFactory.updateDiagnostic(diagnosticId, updatedData)
      if (updateDiagnostic.modifiedCount > 0) {
        const diagnosticUpdate = await diagnosticFactory.getDiagnosticById(diagnosticId)
        return {
          status: 'Success',
          code: 200,
          message: 'diagnostic update successfully',
          payload: diagnosticUpdate,
        }
      } else {
        return {
          status: 'Fail',
          code: 404,
          message: `Error updateDiagnostic`,
          payload: {},
        }
      }
    } catch (error) {
      return {
        status: 'Fail',
        code: 500,
        message: `Something went wrong updateDiagnostic :( ${error}`,
        payload: {},
      }
    }
  }
  async deleteDiagnosticById(diagnosticId) {
    try {
      const diagnosticFound = await diagnosticFactory.getDiagnosticById(diagnosticId)
      if (!diagnosticFound) {
        return {
          status: 'error',
          code: 404,
          message: 'diagnostic not found',
          payload: {},
        }
      }
      const deleted = await diagnosticFactory.deleteDiagnosticById(diagnosticId)
      if (deleted.deletedCount > 0) {
        return {
          status: 'Success',
          code: 204,
          message: 'removed diagnostic',
          payload: {},
        }
      } else {
        return {
          status: 'Fail',
          code: 404,
          message: `Error, diagnostic not found deleteDiagnosticById`,
          payload: {},
        }
      }
    } catch (error) {
      return {
        status: 'error',
        code: 500,
        message: `Something went wrong deleteDiagnosticById:( ${error}`,
        payload: {},
      }
    }
  }

  async getScalpTypes() {
    try {
      const payload = await diagnosticFactory.getScalpTypes()
      if (!payload) {
        return {
          status: 'Fail',
          code: 404,
          message: `Error, ScalpTypes not found getScalpTypes`,
          payload: {},
        }
      }
      return {
        status: 'Success',
        code: 200,
        message: 'ScalpTypes found getScalpTypes',
        payload: payload,
      }
    } catch (error) {
      return {
        status: 'Fail',
        code: 500,
        message: `Internal Server Error getScalpTypes ${error}`,
        payload: {},
      }
    }
  }
  async getHairTypes() {
    try {
      const payload = await diagnosticFactory.getHairTypes()      
      if (!payload) {
        return {
          status: 'Fail',
          code: 404,
          message: `Error, HairTypes not found getHairTypes`,
          payload: {},
        }
      }
      return {
        status: 'Success',
        code: 200,
        message: 'HairTypes found getHairTypes',
        payload: payload,
      }
    } catch (error) {
      return {
        status: 'Fail',
        code: 500,
        message: `Internal Server Error getHairTypes ${error}`,
        payload: {},
      }
    }
  }
}
export const diagnosticServices = new DiagnosticServices()
