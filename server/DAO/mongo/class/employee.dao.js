import { EmployeeModel } from '../models/employee.model.js'
import { EmployeeDTO } from '../../DTO/employee.dto.js'

class EmployeeDAO {
  async getAllEmployees() {
    try {
      const employees = await EmployeeModel.find({ firstName: { $ne: 'admin' } })
        .populate('role')
        .lean()
      const formattedEmployees = employees.map((user) => (user ? new EmployeeDTO(user) : null))
      return formattedEmployees
    } catch (error) {
      throw new Error(`function DAO getAllEmployees: ${error}`)
    }
  }

  async getEmployeeById(id) {
    try {
      const employee = await EmployeeModel.findById(id).populate('role').lean()
      return employee ? new EmployeeDTO(employee) : null
    } catch (error) {
      throw new Error(`function DAO getEmployeeById: ${error}`)
    }
  }
  async getEmployeeByEmail(email) {
    try {
      const employee = await EmployeeModel.findOne({ email }).populate('role').lean()
      return employee ? new EmployeeDTO(employee) : null
    } catch (error) {
      throw new Error(`function DAO getEmployeeByEmail: ${error}`)
    }
  }
  async saveEmployee(employeeData) {
    try {
      const result = await EmployeeModel.create(employeeData)
      const employee = await EmployeeModel.findById(result._id).populate('role').lean()
      return employee ? new EmployeeDTO(employee) : null
    } catch (error) {
      throw new Error(`function DAO saveEmployee: ${error}`)
    }
  }
  async deleteEmployee(email) {
    try {
      const result = await EmployeeModel.deleteOne({ email: email })
      return result
    } catch (error) {
      throw new Error(`function DAO deleteEmployee: ${error}`)
    }
  }
  async updateEmployee(employeeData, id) {
    try {
      employeeData.lastConnection = Date.now()
      const result = await EmployeeModel.updateOne({ _id: id }, employeeData)
      return result
    } catch (error) {
      throw new Error(`function DAO updateEmployee: ${error}`)
    }
  }
  async updateEmployeeDocuments(employeeEmail, documents) {
    try {
      const result = await EmployeeModel.updateOne({ email: employeeEmail }, { $set: { documents } })
      return result
    } catch (error) {
      throw new Error(`function DAO updateEmployeeDocuments: ${error}`)
    }
  }
}

export const employeeDAO = new EmployeeDAO()
