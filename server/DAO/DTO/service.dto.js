export class ServiceDTO {
  constructor(service) {    
    this.id = service._id
    this.name = service.name
    this.description = service.description
    this.profitEmployee = service.profitEmployee
  }
}
