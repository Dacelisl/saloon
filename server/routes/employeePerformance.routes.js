import express from 'express'
import { employeePerformanceController } from '../controllers/employeePerformance.controller.js'
import { authorize } from '../middleware/auth.js'

export const EmployeePerformanceRoutes = express.Router()

EmployeePerformanceRoutes.get('/', authorize, employeePerformanceController.getAllEmployeePerformances)
EmployeePerformanceRoutes.get('/customer/:cid', authorize, employeePerformanceController.getPerformancesByCustomerDNI)
EmployeePerformanceRoutes.get('/employee/:eid', authorize, employeePerformanceController.getPerformancesByEmployeeDNI)
EmployeePerformanceRoutes.get('/range/', authorize, employeePerformanceController.getPerformanceByDate)
EmployeePerformanceRoutes.get('/company/', authorize, employeePerformanceController.getCompanyPerformance)
