import { formatDate } from '../../utils/utils.js'

class UserService {
  constructor(user) {
    this.serviceHistory = this.mapServiceHistory(user.serviceHistory)
    this.shopping = this.mapShopping(user.shopping)
  }

  mapServiceHistory(serviceHistory) {
    return Array.isArray(serviceHistory)
      ? serviceHistory.map((entry) => ({
        employeeId: this.mapEmployee(entry.employeeId),
          service: this.mapService(entry.service),
          price: entry.price,
          date: formatDate(entry.date),
        }))
      : []
  }

  mapShopping(shopping) {
    return Array.isArray(shopping)
      ? shopping.map((entry) => ({
          products: this.mapProducts(entry.products),
          date: formatDate(entry.date),
          employeeId: this.mapEmployee(entry.employeeId),
        }))
      : []
  }

  mapProducts(products) {
    return Array.isArray(products)
      ? products.map((productEntry) => ({
          product: this.mapProduct(productEntry.product),
          quantity: productEntry.quantity,
        }))
      : []
  }

  mapEmployee(employee) {
    return {
      firstName: employee.firstName,
      lastName: employee.lastName,
    }
  }

  mapService(service) {
    return {
      name: service.name,
      description: service.description,
    }
  }

  mapProduct(product) {
    return {
      name: product.name,
      price: product.price,
    }
  }
}

export { UserService }
