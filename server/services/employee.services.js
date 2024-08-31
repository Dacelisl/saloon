import { employeeFactory, roleFactory } from '../DAO/factory.js'
import { isValid } from '../utils/utils.js'
import admin from '../firebase.js'

class EmployeeServices {
  validateEmployee(dataEmployee) {
    const requiredProperties = ['firstName', 'lastName', 'dni', 'phone', 'address', 'email', 'dateBirthday', 'role']
    const missingProperties = requiredProperties.filter((property) => {
      return !(property in dataEmployee) || dataEmployee[property] === undefined
    })
    if (missingProperties.length > 0) {
      throw new Error(`Validation error: Missing or undefined properties ${missingProperties}`)
    }
    return true
  }
  async getAllEmployees() {
    try {
      const employees = await employeeFactory.getAllEmployees()
      if (!employees) {
        return {
          status: 'Fail',
          code: 404,
          message: `Error, Employees not found getAllEmployees`,
          payload: {},
        }
      }
      return {
        status: 'success',
        code: 200,
        message: 'all employees',
        payload: employees,
      }
    } catch (error) {
      return {
        status: 'error',
        code: 500,
        message: `Error getAllEmployees: ${error}`,
        payload: {},
      }
    }
  }
  async getEmployeeById(uid) {
    try {
      isValid(uid)
      const employeeFound = await employeeFactory.getEmployeeById(uid)
      if (!employeeFound) {
        return {
          status: 'Fail',
          code: 404,
          message: 'Employee not exist getEmployeeById',
          payload: {},
        }
      }
      return {
        status: 'success',
        code: 200,
        message: 'employee found',
        payload: employeeFound,
      }
    } catch (error) {
      return {
        status: 'Fail',
        code: 400,
        message: `Error getEmployeeById: ${error}`,
        payload: {},
      }
    }
  }
  async getEmployeeByEmail(mail) {
    try {
      const employeeFound = await employeeFactory.getEmployeeByEmail(mail)
      if (!employeeFound) {
        return {
          status: 'Fail',
          code: 404,
          message: 'Employee not exist getEmployeeByEmail',
          payload: {},
        }
      }
      return {
        status: 'success',
        code: 200,
        message: 'employee found',
        payload: employeeFound,
      }
    } catch (error) {
      return {
        status: 'Fail',
        code: 400,
        message: `Error getEmployeeById ${error}`,
        payload: {},
      }
    }
  }
  async saveEmployee(employee) {
    try {
      this.validateEmployee(employee)
      const newEmployee = await employeeFactory.saveEmployee(employee)      
      if (!newEmployee) {
        return {
          status: 'Fail',
          code: 400,
          message: 'employee created properties are missing or undefined',
          payload: {},
        }
      }
      return {
        status: 'Success',
        code: 201,
        message: 'employee created',
        payload: newEmployee,
      }
    } catch (error) {      
      return {
        code: 500,
        status: 'error',
        message: `Error to saveEmployee: ${error}`,
        payload: {},
      }
    }
  }
  async getLogin(token) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token)
      const dataEmployee = await employeeFactory.getEmployeeByEmail(decodedToken.email)
      const customClaims = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        role: dataEmployee.role,
      }
      const customToken = await admin.auth().createCustomToken(decodedToken.uid, customClaims)
      return {
        status: 'Success',
        code: 201,
        message: 'Custom claims set successfully',
        payload: customToken,
      }
    } catch (error) {
      return {
        code: 500,
        status: 'error',
        message: `Error creating custom claims: ${error}`,
        payload: {},
      }
    }
  }
  async addRoleEmployee(email, password, rol) {
    try {
      const roleFound = await roleFactory.getRoleByName(rol)
      if (!roleFound) {
        return {
          status: 'Fail',
          code: 404,
          message: 'role not exist : addRoleEmployee',
          payload: {},
        }
      }
      const userRecord = await admin.auth().createUser({
        email: email,
        password: password,
      })

      const claims = {
        role: roleFound.name,
        permissions: roleFound.permissions,
        workingHours: roleFound.workingHours,
      }
      await admin.auth().setCustomUserClaims(userRecord.uid, { claims })
      return {
        status: 'Success',
        code: 201,
        message: 'Custom claims set successfully',
        payload: userRecord,
      }
    } catch (error) {
      return {
        code: 500,
        status: 'error',
        message: `Error creating custom claims: ${error}`,
        payload: {},
      }
    }
  }

  async updateEmployee(employee, id) {
    try {
      /* verificar si dentro del data a actualizar se encuentra el rol realizar  la actualizacion del token firebase */
      const employeeFound = await employeeFactory.getEmployeeById(id)
      if (!employeeFound) {
        return {
          status: 'Fail',
          code: 404,
          message: 'Employee not exist : updateEmployee',
          payload: {},
        }
      }
      const rol = await roleFactory.getRoleByName(employee.role)
      employee.role = rol._id
      if (employeeFound.role !== employee.role) {
        const claims = {
          role: rol.name,
          permissions: rol.permissions,
        }
        const userRecord = await admin.auth().getUserByEmail(employee.email)
        await admin.auth().revokeRefreshTokens(userRecord.uid)
        admin.auth().setCustomUserClaims(userRecord.uid, claims)
      }
      const employeeUpdate = await employeeFactory.updateEmployee(employee, id)
      if (employeeUpdate.modifiedCount > 0) {
        const employee = await employeeFactory.getEmployeeById(id)
        return {
          status: 'success',
          code: 200,
          message: 'employee update successfully',
          payload: employee,
        }
      } else {
        return {
          status: 'Fail',
          code: 404,
          message: `Error updateEmployee`,
          payload: {},
        }
      }
    } catch (error) {
      return {
        status: 'Fail',
        code: 400,
        message: `Error updateEmployee : ${error}`,
        payload: {},
      }
    }
  }
  async deleteEmployee(employeeMail) {
    try {
      const employee = await employeeFactory.getEmployeeByEmail(employeeMail)
      if (!employee) {
        return {
          status: 'error',
          code: 404,
          message: 'Employee not found',
          payload: {},
        }
      }
      const result = await employeeFactory.deleteEmployee(employee.email)
      if (result.deletedCount > 0) {
        return {
          status: 'Success',
          code: 204,
          message: 'employee deleted successfully',
          payload: result,
        }
      } else {
        return {
          status: 'Fail',
          code: 404,
          message: `Error, employee not found deleteEmployee`,
          payload: {},
        }
      }
    } catch (error) {
      return {
        status: 'error',
        code: 500,
        message: `Something went wrong deleteEmployee: ${error}`,
        payload: {},
      }
    }
  }
}
export const employeeService = new EmployeeServices()
