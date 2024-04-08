import { EmployeePerformanceModel } from '../models/employeePerformance.model.js'
import { EmployeePerformanceDTO } from '../../DTO/employeePerformance.dto.js'
import { EmployeePerformanceSaveDTO } from '../../DTO/employeePerformanceSave.dto.js'

class EmployeePerformanceDAO {
  POPULATE_PROJECTION = 'name description'
  async getAllEmployeePerformances() {
    try {
      const employeePerformances = await EmployeePerformanceModel.find().populate('earningsDetails.customerId', 'firstName lastName').populate('employeeId', 'firstName lastName').lean()
      const formattedEmployeePerformances = employeePerformances.map((employeePerformance) => (employeePerformance ? new EmployeePerformanceDTO(employeePerformance) : null))
      return formattedEmployeePerformances
    } catch (error) {
      throw new Error(`function DAO getAllemployeePerformances  ${error}`)
    }
  }
  async getPerformancesByCustomerDNI(customerId) {
    try {
      const employeePerformances = await EmployeePerformanceModel.find().populate('earningsDetails.customerId', 'firstName lastName').populate('employeeId', 'firstName lastName').lean()

      const filteredPerformances = employeePerformances.filter((performance) => performance.earningsDetails.some((detail) => detail.customerId._id.equals(customerId)))

      const formattedEmployeePerformances = filteredPerformances.map((employeePerformance) => (employeePerformance ? new EmployeePerformanceDTO(employeePerformance) : null))
      return formattedEmployeePerformances
    } catch (error) {
      throw new Error(`function DAO getPerformancesByCustomerDNI  ${error}`)
    }
  }
  async getPerformancesByEmployeeDNI(employeeId) {
    try {
      const employeePerformances = await EmployeePerformanceModel.find({ employeeId }).populate('employeeId', 'firstName lastName').populate('earningsDetails.customerId', 'firstName lastName').lean()
      const formattedEmployeePerformances = employeePerformances.map((employeePerformance) => (employeePerformance ? new EmployeePerformanceDTO(employeePerformance) : null))
      return formattedEmployeePerformances
    } catch (error) {
      throw new Error(`function DAO getPerformancesByCustomerDNI  ${error}`)
    }
  }
  async getPerformanceByDate(data) {
    try {
      const { employeeId, startDate, endDate } = data
      const performance = await EmployeePerformanceModel.find({
        employeeId,
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      })
        .populate('employeeId', 'firstName lastName')
        .populate('earningsDetails.customerId', 'firstName lastName')
        .lean()
      const formattedEmployeePerformances = performance.map((employeePerformance) => (employeePerformance ? new EmployeePerformanceDTO(employeePerformance) : null))
      return formattedEmployeePerformances
    } catch (error) {
      throw new Error(`function DAO getPerformanceByDate  ${error}`)
    }
  }

  async createEmployeePerformance(dataEmployeePerformance) {
    try {
      const performance = new EmployeePerformanceSaveDTO(dataEmployeePerformance)
      const result = await EmployeePerformanceModel.create(performance)
      return result
    } catch (error) {
      throw new Error(`function DAO createemployeePerformance ${error}`)
    }
  }
  async deleteEmployeePerformance(ticketNumber) {
    try {
      const result = await EmployeePerformanceModel.deleteOne({
        'earningsDetails.ticketNumber': ticketNumber,
      })
      return result
    } catch (error) {
      throw new Error(`function DAO deleteemployeePerformance ${error}`)
    }
  }
  async updateEmployeePerformance(ticket) {
    try {
      const performance = new EmployeePerformanceSaveDTO(ticket)
      console.log('earnings ', performance);
      const ticketNumber = performance.earningsDetails[0].ticketNumber
      const result = await EmployeePerformanceModel.updateOne({ 'earningsDetails.ticketNumber': ticketNumber }, performance)
      return result
    } catch (error) {
      throw new Error(`function DAO updateEmployeePerformance: ${error}`)
    }
  }

  async updatePerformanceById(performanceId, updatedData) {
    try {
      const result = await EmployeePerformanceModel.findByIdAndUpdate(performanceId, updatedData, { new: true })
      return result
    } catch (error) {
      throw new Error(`function DAO updatePerformanceById  ${error}`)
    }
  }
}
export const employeePerformanceDAO = new EmployeePerformanceDAO()
