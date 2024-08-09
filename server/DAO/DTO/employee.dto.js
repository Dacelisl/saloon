import { formatDate } from '../../utils/utils.js'

class EmployeeDTO {
  constructor(employee) {
    this.id = employee._id
    this.firstName = employee.firstName
    this.lastName = employee.lastName
    this.dni = employee.dni
    this.phone = `+${employee.phone.toString().slice(0, 2)} ${employee.phone.toString().slice(2)}`
    this.address = employee.address
    this.email = employee.email
    this.thumbnail = employee.thumbnail? employee.thumbnail
      : 'https://firebasestorage.googleapis.com/v0/b/project-fabiosalon.appspot.com/o/photo_default.jpeg?alt=media&token=67c47487-f9e3-4a29-b856-05bf117dc3c8'
    this.dateBirthday = formatDate(employee.dateBirthday)
    this.role = employee.role ? employee.role.name : null
    this.documents = employee.documents
    this.lastConnection = formatDate(employee.lastConnection)
  }
}
export { EmployeeDTO }
