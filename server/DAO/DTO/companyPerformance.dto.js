class CompanyPerformanceDTO {
  constructor(employeePerformance) {
    this.employee = this.mapEmployee(employeePerformance.employee)
    this.date = employeePerformance.date
    this.totalEmployeeEarnings = parseFloat(employeePerformance.totalEarnings)
    this.totalCompanyEarnings = parseFloat(employeePerformance.totalEarningsCompany)
  }

  // Método para mapear la información del empleado
  mapEmployee(employee) {
    return {
      firstName: employee.firstName,
      lastName: employee.lastName,
    }
  }

  // Método para calcular las ganancias totales de un empleado
  calculateTotalEmployeeEarnings(details) {
    return details.reduce((total, detail) => total + detail.employeeEarnings, 0)
  }

  // Método para calcular las ganancias totales de la empresa
  calculateTotalCompanyEarnings(details) {
    return details.reduce((total, detail) => total + detail.companyEarnings, 0)
  }
}

export { CompanyPerformanceDTO }
