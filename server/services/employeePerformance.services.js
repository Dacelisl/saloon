import { employeePerformanceFactory } from '../DAO/factory.js'

class EmployeePerformanceServices {
  async getAllEmployeePerformances() {
    try { 
      const employeePerformances = await employeePerformanceFactory.getAllEmployeePerformances()
      if (!employeePerformances) {
        return {
          status: 'Fail',
          code: 404,
          message: `Error, getAllEmployeePerformances not found getAllEmployeePerformances`,
          payload: {},
        }
      }
      return {
        status: 'success',
        code: 200,
        message: 'all employeePerformances',
        payload: employeePerformances,
      }
    } catch (error) {
      return {
        status: 'error',
        code: 500,
        message: `error getting all employeePerformances : getPerformances ${error}`,
        payload: {},
      }
    }
  }
  async getCompanyPerformance() {
    try { 
      const companyPerformances = await employeePerformanceFactory.getCompanyPerformance()
      if (!companyPerformances) {
        return {
          status: 'Fail',
          code: 404,
          message: `Error, getCompanyPerformance not found getCompanyPerformance`,
          payload: {},
        }
      }
      return {
        status: 'success',
        code: 200,
        message: 'all companyPerformances',
        payload: companyPerformances,
      }
    } catch (error) {
      return {
        status: 'error',
        code: 500,
        message: `error getting all companyPerformances : getPerformances ${error}`,
        payload: {},
      }
    }
  }
  async getPerformancesByCustomerDNI(customerId) {
    try {
      const employeePerformanceFound = await employeePerformanceFactory.getPerformancesByCustomerDNI(customerId)
      if (!employeePerformanceFound) {
        return {
          status: 'Fail',
          code: 404,
          message: 'EmployeePerformance not exist getPerformancesByCustomerDNI',
          payload: {},
        }
      }
      return {
        status: 'success',
        code: 200,
        message: 'employeePerformance found',
        payload: employeePerformanceFound,
      }
    } catch (error) {
      return {
        status: 'Fail',
        code: 400,
        message: `Error getPerformancesByCustomerDNI ${error}`,
        payload: {},
      }
    }
  }
  async getPerformancesByEmployeeDNI(employeeId) {
    try {
      const employeePerformanceFound = await employeePerformanceFactory.getPerformancesByEmployeeDNI(employeeId)
      if (!employeePerformanceFound) {
        return {
          status: 'Fail',
          code: 404,
          message: 'EmployeePerformance not exist getPerformancesByEmployeeDNI',
          payload: {},
        }
      }
      return {
        status: 'success',
        code: 200,
        message: 'employeePerformance found',
        payload: employeePerformanceFound,
      }
    } catch (error) {
      return {
        status: 'Fail',
        code: 400,
        message: `Error getPerformancesByEmployeeDNI ${error}`,
        payload: {},
      }
    }
  }
  async getPerformanceByDate(employeeId) {
    try {
      const employeePerformanceFound = await employeePerformanceFactory.getPerformanceByDate(employeeId)
      if (!employeePerformanceFound) {
        return {
          status: 'Fail',
          code: 404,
          message: 'EmployeePerformance not exist getPerformanceByDate',
          payload: {},
        }
      }
      return {
        status: 'success',
        code: 200,
        message: 'employeePerformance found',
        payload: employeePerformanceFound,
      }
    } catch (error) {
      return {
        status: 'Fail',
        code: 400,
        message: `Error getPerformanceByDate ${error}`,
        payload: {},
      }
    }
  }
  
  async updateEmployeePerformance(employeePerformance) {
    try {
      const employeePerformanceFound = await employeePerformanceFactory.getPerformanceByEmployeePerformanceNumber(employeePerformance.employeePerformanceNumber)
      if (!employeePerformanceFound) {
        return {
          status: 'Fail',
          code: 404,
          message: 'EmployeePerformance not exist : updateEmployeePerformance',
          payload: {},
        }
      }
      const employeePerformanceUpdate = await employeePerformanceFactory.updateEmployeePerformance(employeePerformance)
      if (employeePerformanceUpdate.modifiedCount > 0) {
        const responseUpdate = await employeePerformanceFactory.getPerformanceByEmployeePerformanceNumber(employeePerformance.employeePerformanceNumber)
        return {
          status: 'success',
          code: 200,
          message: 'employeePerformance update successfully',
          payload: responseUpdate,
        }
      } else {
        return {
          status: 'Fail',
          code: 404,
          message: `Error updateEmployeePerformance`,
          payload: employeePerformanceUpdate,
        }
      }
    } catch (error) {
      return {
        status: 'Fail',
        code: 400,
        message: `Error updateEmployeePerformance : ${error}`,
        payload: {},
      }
    }
  }
}
export const employeePerformanceService = new EmployeePerformanceServices()
