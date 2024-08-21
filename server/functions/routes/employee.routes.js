import express from 'express'
import { employeeController } from '../controllers/employee.controller.js'
import { authorize } from '../middleware/auth.js'

export const EmployeeRoutes = express.Router()

EmployeeRoutes.post('/create', authorize, employeeController.addRoleEmployee)
EmployeeRoutes.delete('/logOut', authorize, employeeController.getLogOut)
EmployeeRoutes.post('/login', employeeController.getLogin)
EmployeeRoutes.get('/', authorize, employeeController.getAllEmployees)
EmployeeRoutes.get('/:id', authorize, employeeController.getEmployeeById)
EmployeeRoutes.get('/email/:email', employeeController.getEmployeeByEmail)
EmployeeRoutes.get('/doc/:email', authorize, employeeController.getDocuments)
EmployeeRoutes.post('/', authorize, employeeController.saveEmployee)
EmployeeRoutes.post('/upload/', authorize, employeeController.createDocument)
EmployeeRoutes.put('/:id', authorize, employeeController.updateEmployee)
EmployeeRoutes.delete('/:email', authorize, employeeController.deleteEmployee)
