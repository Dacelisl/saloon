import express from 'express'
import { errorHandler } from '../middleware/errors.js '
import { ProductRoutes } from '../routes/products.routes.js'
import { ProviderRoutes } from '../routes/provider.routes.js'
import { RoleRoutes } from '../routes/role.routes.js'
import { ServiceRoutes } from '../routes/service.routes.js'
import { UserRoutes } from '../routes/user.routes.js'
import { EmployeeRoutes } from '../routes/employee.routes.js'
import { TicketRoutes } from '../routes/ticket.routes.js'
import { DiagnosticRoutes } from '../routes/diagnostic.routes.js'
import { EmployeePerformanceRoutes } from '../routes/employeePerformance.routes.js'

export const router = express.Router()
router.use('/api/products', ProductRoutes)
router.use('/api/provider', ProviderRoutes)
router.use('/api/users', UserRoutes)
router.use('/api/employee', EmployeeRoutes)
router.use('/api/role', RoleRoutes)
router.use('/api/service', ServiceRoutes)
router.use('/api/tickets', TicketRoutes)
router.use('/api/diagnostic', DiagnosticRoutes)
router.use('/api/performance', EmployeePerformanceRoutes)

router.get('*', (req, res) => {
  return res.status(404).json({
    status: 'error',
    message: `Not Found: ${res.message}`,
    payload: {},
  })
})
router.use(errorHandler)
