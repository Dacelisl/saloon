import { formatDate } from '../../utils/utils.js'

class UserDTO {
  constructor(user) {
    this.id = user._id
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.dni = user.dni
    this.phone = `+${user.phone.toString().slice(0, 2)} ${user.phone.toString().slice(2)}`
    this.address = user.address
    this.email = user.email
    this.dateBirthday = formatDate(user.dateBirthday)
    this.firstDate = formatDate(user.firstDate)
    this.lastDate = formatDate(user.lastDate)
    this.thumbnail = user.thumbnail
      ? user.thumbnail
      : 'https://firebasestorage.googleapis.com/v0/b/project-fabiosalon.appspot.com/o/photo_default.jpeg?alt=media&token=67c47487-f9e3-4a29-b856-05bf117dc3c8'
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

export { UserDTO }
