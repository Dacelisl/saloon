import { formatDate } from '../../utils/utils.js'

class DiagnosticDTO {
  constructor(diagnostic) {
    this.id = diagnostic._id
    this.client = this.mapClient(diagnostic.userId)
    this.employee = this.mapEmployee(diagnostic.employeeId)
    this.date = formatDate(diagnostic.date)
    this.procedureType = this.mapProcedure(diagnostic.procedureType)
    this.hairCondition = diagnostic.hairCondition
    this.scalpCondition = diagnostic.scalpCondition
    this.stylistNotes = diagnostic.stylistNotes
    this.recommendations = diagnostic.recommendations
    this.nextAppointment = formatDate(diagnostic.nextAppointment)
    this.photoBefore = diagnostic.photoBefore
    this.photoAfter = diagnostic.photoAfter
  }
  mapClient(client) {
    return {
      id: client._id,
      dni: client.dni,
      firstName: client.firstName,
      lastName: client.lastName,
      dateBirthday: formatDate(client.dateBirthday),
      email: client.email,
    }
  }
  mapEmployee(employee) {
    return {
      id: employee._id,
      firstName: employee.firstName,
      lastName: employee.lastName,
    }
  }
  mapProcedure(procedure) {
    return {
      id: procedure._id,
      name: procedure.name,
    }
  }
}

export { DiagnosticDTO }
