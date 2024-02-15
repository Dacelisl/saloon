import express from 'express'
import { employeeController } from '../controllers/employee.controller.js'
import { adminAccess, registeredUser } from '../middleware/auth.js'

export const EmployeeRoutes = express.Router()

EmployeeRoutes.post('/create', employeeController.createRol)
EmployeeRoutes.post('/logOut',registeredUser,adminAccess, employeeController.getLogOut)
EmployeeRoutes.post('/login', employeeController.getLogin)
EmployeeRoutes.get('/', registeredUser, employeeController.getAllEmployees)
EmployeeRoutes.get('/:id', employeeController.getEmployeeById)
EmployeeRoutes.get('/email/:email', employeeController.getEmployeeByEmail)
EmployeeRoutes.get('/doc/:email', employeeController.getDocuments)
EmployeeRoutes.post('/', employeeController.saveEmployee)
EmployeeRoutes.post('/upload/', employeeController.createDocument)
EmployeeRoutes.put('/:id', employeeController.updateEmployee)
EmployeeRoutes.delete('/:email', employeeController.deleteEmployee)
