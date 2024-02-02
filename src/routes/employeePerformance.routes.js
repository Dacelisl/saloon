import express from 'express'
import { employeePerformanceController } from '../controllers/employeePerformance.controller.js'
export const EmployeePerformanceRoutes = express.Router()

EmployeePerformanceRoutes.get('/', employeePerformanceController.getAllEmployeePerformances)
EmployeePerformanceRoutes.get('/customer/:cid', employeePerformanceController.getPerformancesByCustomerDNI)
EmployeePerformanceRoutes.get('/employee/:eid', employeePerformanceController.getPerformancesByEmployeeDNI)
EmployeePerformanceRoutes.get('/range/', employeePerformanceController.getPerformanceByDate)
