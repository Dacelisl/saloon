import { formatDate } from '../../utils/utils.js'

class UserService {
  constructor(user) {
    this.serviceHistory = this.mapServiceHistory(user.serviceHistory)
    this.shopping = this.mapShopping(user.shopping)
  }

  mapServiceHistory(serviceHistory) {
    return Array.isArray(serviceHistory)
      ? serviceHistory.map((entry) => ({
          stylist: this.mapEmployee(entry.stylist),
          service: this.mapService(entry.service),
          price: entry.price,
          dateService: formatDate(entry.dateService),
          observations: entry.observations,
        }))
      : []
  }

  mapShopping(shopping) {
    return Array.isArray(shopping)
      ? shopping.map((entry) => ({
          products: this.mapProducts(entry.products),
          dateShopping: formatDate(entry.dateShopping),
          employee: this.mapEmployee(entry.employee),
          observations: entry.observations,
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
