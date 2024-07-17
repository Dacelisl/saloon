import { diagnosticServices } from '../services/diagnostic.services.js'
import { sendErrorResponse, sendSuccessResponse } from '../utils/utils.js'

class DiagnosticController {
  async getAllUsersDiagnostics(req, res) {
    try {
      const diagnostics = await diagnosticServices.getAllUsersDiagnostics()
      return sendSuccessResponse(res, diagnostics)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }
  async getAllDiagnosticsByUserId(req, res) {
    const diagnosticId = req.params.did
    try {
      const diagnosticFound = await diagnosticServices.getAllDiagnosticsByUserId(diagnosticId)
      return sendSuccessResponse(res, diagnosticFound)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }
  async getDiagnosticById(req, res) {
    const diagnosticId = req.params.did
    try {
      const diagnosticFound = await diagnosticServices.getDiagnosticById(diagnosticId)
      return sendSuccessResponse(res, diagnosticFound)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }
  async createDiagnostic(req, res) {
    const diagnosticData = req.body
    try {
      const response = await diagnosticServices.createDiagnostic(diagnosticData)
      return sendSuccessResponse(res, response)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }
  async updateDiagnostic(req, res) {
    const diagnosticId = req.params.did
    const data = req.body
    try {
      const resUpdate = await diagnosticServices.updateDiagnostic(diagnosticId, data)
      return sendSuccessResponse(res, resUpdate)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }
  async deleteDiagnosticById(req, res) {
    const diagnosticId = req.params.did
    try {
      const resDelete = await diagnosticServices.deleteDiagnosticById(diagnosticId)
      return sendSuccessResponse(res, resDelete)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }
}
export const diagnosticController = new DiagnosticController()
