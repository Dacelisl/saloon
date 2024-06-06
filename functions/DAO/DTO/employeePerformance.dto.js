import { formatDate, formatCurrency } from '../../utils/utils.js'

class EmployeePerformanceDTO {
  constructor(employeePerformance) {
    this.employee = this.mapEmployee(employeePerformance.employeeId)
    this.date = formatDate(employeePerformance.date)
    this.totalEarnings = parseFloat(this.calculateTotalExpectedEarnings(employeePerformance.earningsDetails))
    this.earningsDetails = employeePerformance.earningsDetails.map((detail) => new EarningsDetailDTO(detail))
  }
  mapEmployee(employee) {
    return {
      firstName: employee.firstName,
      lastName: employee.lastName,
    }
  }
  calculateTotalExpectedEarnings(items) {
    return items.reduce((total, detail) => {
      const detailDTO = detail.employeeEarnings
      return total + detailDTO
    }, 0)
  }
}

class EarningsDetailDTO {
  constructor(earningsDetail) {
    this.ticketNumber = earningsDetail.ticketNumber
    this.customer = this.mapCustomer(earningsDetail.customerId)
    this.serviceOrProduct = earningsDetail.serviceOrProduct
    this.itemType = earningsDetail.itemType
    this.quantity = earningsDetail.quantity
    this.itemPrice = formatCurrency(earningsDetail.itemPrice)
    this.totalCost = formatCurrency(earningsDetail.totalCost)
    this.employeeEarnings = parseFloat(earningsDetail.employeeEarnings)
  }
  mapCustomer(customer) {
    return {
      firstName: customer.firstName,
      lastName: customer.lastName,
    }
  }
  mapServiceOrProduct(sale) {
    return Array.isArray(sale)
      ? sale.map((entry) => ({
          name: entry.name,
          description: entry.description,
        }))
      : {
          name: sale.name,
        }
  }
}

export { EmployeePerformanceDTO, EarningsDetailDTO }
