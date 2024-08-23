import { DiagnosticModel } from '../models/diagnostic.model.js'
import { DiagnosticDTO } from '../../DTO/diagnostic.dto.js'
import { DiagnosticUpdateDTO } from '../../DTO/diagnosticUpdate.dto.js'

class DiagnosticDAO {
  async getAllUsersDiagnostics() {
    try {
      let diagnostics = await DiagnosticModel.find()
        .populate('userId', 'firstName lastName dni dateBirthday email thumbnail ')
        .populate('employeeId', 'firstName lastName')
        .populate('procedureType', 'name')
        .lean()
      const formattedDiagnostics = diagnostics.map((diagnostic) => (diagnostic ? new DiagnosticDTO(diagnostic) : null))
      return formattedDiagnostics
    } catch (error) {
      throw new Error(`function DAO getAllUsersDiagnostics: ${error}`)
    }
  }

  async getDiagnosticById(id) {
    try {
      let diagnostic = await DiagnosticModel.findById(id)
        .populate('userId', 'firstName lastName dni dateBirthday email thumbnail ')
        .populate('employeeId', 'firstName lastName')
        .populate('procedureType', 'name')
        .lean()
      return diagnostic ? new DiagnosticDTO(diagnostic) : null
    } catch (error) {
      throw new Error(`function DAO getDiagnosticById  ${error}`)
    }
  }
  async getAllDiagnosticsByUserId(userId) {
    try {
      let diagnostics = await DiagnosticModel.find(userId)
        .populate('userId', 'firstName lastName dni dateBirthday email thumbnail ')
        .populate('employeeId', 'firstName lastName')
        .populate('procedureType', 'name')
        .lean()
      const formattedDiagnostics = diagnostics.map((diagnostic) => (diagnostic ? new DiagnosticDTO(diagnostic) : null))
      return formattedDiagnostics
    } catch (error) {
      throw new Error(`function DAO getAllDiagnosticsByUserId  ${error}`)
    }
  }

  async getScalpTypes() {
    try {
      const enumValues = Object.values(DiagnosticModel.schema.path('scalpCondition').enumValues)
      return enumValues
    } catch (error) {
      throw new Error(`function DAO getscalpTypes  ${error}`)
    }
  }
  async getHairTypes() {
    try {
      const enumValues = Object.values(DiagnosticModel.schema.path('hairCondition').enumValues)
      return enumValues
    } catch (error) {
      throw new Error(`function DAO getHairTypes  ${error}`)
    }
  }

  async createDiagnostic(diagnosticData) {
    try {
      const diagnostic = await DiagnosticModel.create(diagnosticData)
      return diagnostic ? new DiagnosticDTO(diagnostic) : null
    } catch (error) {
      throw new Error(`function DAO createDiagnostic ${error}`)
    }
  }
  async deleteDiagnosticById(id) {
    try {
      const result = await DiagnosticModel.deleteOne({ _id: id })
      return result
    } catch (error) {
      throw new Error(`function DAO deleteDiagnosticById  ${error}`)
    }
  }
  async updateDiagnostic(id, updatedData) {
    try {
      const dataFormatt = new DiagnosticUpdateDTO(updatedData)      
      const result = await DiagnosticModel.updateOne({ _id: id }, dataFormatt)
      return result
    } catch (error) {
      throw new Error(`Function DAO updateDiagnostic ${error}`)
    }
  }
}
export const diagnosticDAO = new DiagnosticDAO()
