import dataConfig from '../config/process.config.js'
import { connectMongo } from '../utils/connectMongo.js'

export let employeeFactory, productFactory, providerFactory, employeePerformanceFactory, userFactory, expenseFactory, serviceFactory, roleFactory, ticketFactory, diagnosticFactory

switch (dataConfig.persistence) {
  case 'mongo':
    connectMongo()
    const { employeeDAO } = await import('./mongo/class/employee.dao.js')
    employeeFactory = employeeDAO
    const { employeePerformanceDAO } = await import('./mongo/class/employeePerformance.dao.js')
    employeePerformanceFactory = employeePerformanceDAO
    const { expenseDAO } = await import('./mongo/class/expense.dao.js')
    expenseFactory = expenseDAO
    const { productDAO } = await import('./mongo/class/product.dao.js')
    productFactory = productDAO
    const { providerDAO } = await import('./mongo/class/provider.dao.js')
    providerFactory = providerDAO
    const { roleDAO } = await import('./mongo/class/role.dao.js')
    roleFactory = roleDAO
    const { userDAO } = await import('./mongo/class/user.dao.js')
    userFactory = userDAO
    const { serviceDAO } = await import('./mongo/class/service.dao.js')
    serviceFactory = serviceDAO
    const { ticketDAO } = await import('./mongo/class/ticket.dao.js')
    ticketFactory = ticketDAO
    const { diagnosticDao } = await import('./mongo/class/diagnostic.dao.js')
    diagnosticFactory = diagnosticDao
    break
  default:
    break
}
