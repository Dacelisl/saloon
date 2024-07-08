import { sendErrorResponse, sendSuccessResponse } from '../utils/utils.js'
import { employeeService } from '../services/employee.services.js'
import admin from '../firebase.js'

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
  async addRol(req, res) {
    const { accessToken, rol } = req.body
    try {
      const result = await employeeService.addRol(accessToken, rol)
      return sendSuccessResponse(res, result)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }

  async getLogOut(req, res) {
    try {
      req.session.destroy(async (err) => {
        if (err) throw new Error(`Error server getLogOut ${err}`)
        res.clearCookie('session', {
          httpOnly: true,
          secure: true, // Set to true if using https
          sameSite: 'none',
        })
        res.json({ status: true, message: 'logOut ok' })
      })
    } catch (error) {
      res.status(500).send('Error logging out')
    }
  }
  async getLogin(req, res) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    try {
      const sessionCookie = await admin.auth().createSessionCookie(token, { expiresIn: 60 * 60 * 24 * 1000 }) // 1 day
      const options = {
        maxAge: 60 * 60 * 24 * 1000, // 1 day
        httpOnly: true,
        secure: true, // Set to true if using https
        sameSite: 'none', // Set to 'none' to allow cross-site cookies
      }
      res.cookie('session', sessionCookie, options)
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
