import { sendErrorResponse, sendSuccessResponse } from '../utils/utils.js'
import { employeeService } from '../services/employee.services.js'
import admin from '../../firebase.js'

class EmployeeController {
  async getAllEmployees(req, res) {
    try {
      const response = await employeeService.getAllEmployees()
      return sendSuccessResponse(res, response)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }
  async createRol(req, res) {
    const { accessToken, rol } = req.body
    try {
      await admin.auth().setCustomUserClaims(accessToken, { rol })
      res.status(200).json({ success: true })
    } catch (error) {
      res.status(500).json({ success: false, error: 'Error creating custom claims' })
    }
  }

  async getLogOut(req, res) {
    console.log('se desconecto');
    req.session.destroy((e) => {
      if (!e) res.json({ status: true, message: 'logOut ok' })
      else res.json({ status: true, message: 'error logOut' })
    })
  }
  async getLogin(req, res) {
    const accessToken = req.body.accessToken
    try {
      const decodedToken = await admin.auth().verifyIdToken(accessToken)
      req.session.user = decodedToken
      console.log('user', req.session.user);
      res.json({ message: 'Login successful' })
    } catch (error) {
      res.json('Error: authentication server')
    }
  }

  async getEmployeeById(req, res) {
    const employeeId = req.params.id
    try {
      const employee = await employeeService.getEmployeeById(employeeId)
      return sendSuccessResponse(res, employee)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }
  async getEmployeeByEmail(req, res) {
    const employeeEmail = req.params.email
    try {
      const employee = await employeeService.getEmployeeByEmail(employeeEmail)
      return sendSuccessResponse(res, employee)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }
  async saveEmployee(req, res) {
    const employeeData = req.body
    try {
      const result = await employeeService.saveEmployee(employeeData)
      return sendSuccessResponse(res, result)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }
  async updateEmployee(req, res) {
    const employeeData = req.body
    const id = req.params.id
    try {
      const result = await employeeService.updateEmployee(employeeData, id)
      return sendSuccessResponse(res, result)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }
  async deleteEmployee(req, res) {
    const employeeMail = req.params.email
    try {
      const response = await employeeService.deleteEmployee(employeeMail)
      return sendSuccessResponse(res, response)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }

  async getDocuments(req, res) {
    const email = req.params.email
    try {
      const employee = await employeeService.getEmployeeByEmail(email)
      return res.json(employee.payload.documents)
    } catch (error) {
      req.logger.warning(error)
      return sendErrorResponse(res, error)
    }
  }
  async createDocument(req, res) {
    try {
      const uid = req.params.uid
      const type = req.headers['x-tipo-archivo']
      const response = await employeeService.createDocument(req.file, type, uid)
      return sendSuccessResponse(res, response)
    } catch (error) {
      req.logger.warning(error)
      return sendErrorResponse(res, error)
    }
  }
  async switchRol(req, res) {
    try {
      const uid = req.params.uid
      const esEmail = /\S+@\S+\.\S+/.test(uid)
      let employee = ''
      if (esEmail) {
        employee = await employeeService.getEmployeeByEmail(uid)
      } else {
        employee = await employeeService.getEmployeeById(uid)
      }
      if (employee) {
        const response = await employeeService.switchEmployeeRole(employee.payload)
        return sendSuccessResponse(res, response)
      } else {
        return res.json({
          status: 'error',
          code: 404,
          message: 'Employee not found',
          payload: {},
        })
      }
    } catch (error) {
      req.logger.warning('failed to change roles, switchRol', error)
      return sendErrorResponse(res, error)
    }
  }
}
export const employeeController = new EmployeeController()
