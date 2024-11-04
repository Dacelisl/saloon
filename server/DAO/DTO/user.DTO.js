import { formatDate } from '../../utils/utils.js'

class UserDTO {
  constructor(user) {
    this.id = user._id
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.dni = user.dni
    this.phone = user.phone ? `+${user.phone.toString().slice(0, 2)} ${user.phone.toString().slice(2)}` : null
    this.address = user.address
    this.email = user.email
    this.dateBirthday = user.dateBirthday ? formatDate(user.dateBirthday) : null
    this.firstDate = user.firstDate ? formatDate(user.firstDate) : null
    this.lastDate = user.lastDate ? formatDate(user.lastDate) : null
    this.thumbnail = user.thumbnail
      ? user.thumbnail
      : 'https://firebasestorage.googleapis.com/v0/b/project-fabiosalon.appspot.com/o/photo_default.jpeg?alt=media&token=9e28057e-52a2-4a5d-87d0-509fc7be2eac'
    this.serviceHistory = user.serviceHistory ? this.mapServiceHistory(user.serviceHistory) : []
    this.shopping = user.shopping ? this.mapShopping(user.shopping) : []
  }

  mapServiceHistory(serviceHistory) {
    return Array.isArray(serviceHistory)
      ? serviceHistory.map((entry) => ({
          employeeId: entry.employeeId ? this.mapEmployee(entry.employeeId) : null,
          service: entry.service ? this.mapService(entry.service) : null,
          price: entry.price,
          date: entry.date ? formatDate(entry.date) : null,
        }))
      : []
  }

  mapShopping(shopping) {
    return Array.isArray(shopping)
      ? shopping.map((entry) => ({
          products: Array.isArray(entry.products) ? this.mapProducts(entry.products) : [],
          date: entry.date ? formatDate(entry.date) : null,
          employeeId: entry.employeeId ? this.mapEmployee(entry.employeeId) : null,
        }))
      : []
  }

  mapProducts(products) {
    return Array.isArray(products)
      ? products.map((productEntry) => ({
          product: productEntry.product ? this.mapProduct(productEntry.product) : null,
          quantity: productEntry.quantity,
        }))
      : []
  }

  mapEmployee(employee) {
    return employee
      ? {
          firstName: employee.firstName || '',
          lastName: employee.lastName || '',
        }
      : null
  }

  mapService(service) {
    return service
      ? {
          name: service.name || '',
          description: service.description || '',
        }
      : null
  }

  mapProduct(product) {
    return product
      ? {
          name: product.name || '',
          price: product.price || 0,
        }
      : null
  }
}

export { UserDTO }
