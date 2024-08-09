import { employeePerformanceService } from '../services/employeePerformance.services.js'

import { sendErrorResponse, sendSuccessResponse } from '../utils/utils.js'

class EmployeePerformanceController {
  async getAllEmployeePerformances(req, res) {
    try {
      const employeePerformances = await employeePerformanceService.getAllEmployeePerformances()
      return sendSuccessResponse(res, employeePerformances)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }
  async getCompanyPerformance(req, res) {
    try {
      const companyPerformances = await employeePerformanceService.getCompanyPerformance()
      return sendSuccessResponse(res, companyPerformances)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }
  async getPerformancesByCustomerDNI(req, res) {
    const employeePerformanceCustomer = req.params.cid
    try {
      const response = await employeePerformanceService.getPerformancesByCustomerDNI(employeePerformanceCustomer)
      return sendSuccessResponse(res, response)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }
  async getPerformancesByEmployeeDNI(req, res) {
    const performanceEmployee = req.params.eid
    try {
      const response = await employeePerformanceService.getPerformancesByEmployeeDNI(performanceEmployee)
      return sendSuccessResponse(res, response)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }
  async getPerformanceByDate(req, res) {
    const performanceEmployee = req.body
    try {
      const response = await employeePerformanceService.getPerformanceByDate(performanceEmployee)
      return sendSuccessResponse(res, response)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }
}
export const employeePerformanceController = new EmployeePerformanceController()
