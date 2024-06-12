import express from 'express'
import { employeeController } from '../controllers/employee.controller.js'
import { adminAccess, registeredUser } from '../middleware/auth.js'

export const EmployeeRoutes = express.Router()

EmployeeRoutes.post('/create', adminAccess, employeeController.createRol)
EmployeeRoutes.post('/logOut', registeredUser, employeeController.getLogOut)
EmployeeRoutes.post('/login', employeeController.getLogin)
EmployeeRoutes.get('/', registeredUser, employeeController.getAllEmployees)
EmployeeRoutes.get('/:id', registeredUser, employeeController.getEmployeeById)
EmployeeRoutes.get('/email/:email',registeredUser, employeeController.getEmployeeByEmail)
EmployeeRoutes.get('/doc/:email', registeredUser, employeeController.getDocuments)
EmployeeRoutes.post('/', adminAccess, employeeController.saveEmployee)
EmployeeRoutes.post('/upload/', adminAccess, employeeController.createDocument)
EmployeeRoutes.put('/:id', adminAccess, employeeController.updateEmployee)
EmployeeRoutes.delete('/:email', adminAccess, employeeController.deleteEmployee)
