import express from 'express'
import { employeePerformanceController } from '../controllers/employeePerformance.controller.js'
import { registeredUser } from '../middleware/auth.js'

export const EmployeePerformanceRoutes = express.Router()

EmployeePerformanceRoutes.get('/', registeredUser, employeePerformanceController.getAllEmployeePerformances)
EmployeePerformanceRoutes.get('/customer/:cid', registeredUser, employeePerformanceController.getPerformancesByCustomerDNI)
EmployeePerformanceRoutes.get('/employee/:eid', registeredUser, employeePerformanceController.getPerformancesByEmployeeDNI)
EmployeePerformanceRoutes.get('/range/', registeredUser, employeePerformanceController.getPerformanceByDate)
