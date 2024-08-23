class DiagnosticUpdateDTO {
  constructor(diagnostic) {
    this._id = diagnostic._id
    this.userId = diagnostic.client.id
    this.employeeId = diagnostic.employee.id
    this.date = diagnostic.date
    this.procedureType = diagnostic.procedureType.id
    this.hairCondition = diagnostic.hairCondition
    this.scalpCondition = diagnostic.scalpCondition
    this.stylistNotes = diagnostic.stylistNotes
    this.recommendations = diagnostic.recommendations
    this.nextAppointment = diagnostic.nextAppointment
    this.photoBefore = diagnostic.photoBefore
    this.photoAfter = diagnostic.photoAfter
  }
}

export { DiagnosticUpdateDTO }
