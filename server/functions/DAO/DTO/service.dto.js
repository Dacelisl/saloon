export class ServiceDTO {
  constructor(service) {    
    this.id = service._id
    this.name = service.name
    this.description = service.description
    this.priceRange = this.mapRange(service.priceRange)
    this.profitEmployee = service.profitEmployee
  }
  mapRange(price) {
    return {
      min: price.min,
      max: price.max,
    }
  }
}
