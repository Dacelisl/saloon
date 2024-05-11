import { formatDate } from '../../utils/utils.js'
class TicketDTO {
  constructor(ticket) {
    this.ticketNumber = ticket.ticketNumber
    this.purchaseDate = formatDate(ticket.purchaseDate)
    this.customer = this.mapCustomer(ticket.customerId)
    this.employee = this.mapEmployee(ticket.employeeId)
    this.items = ticket.items.map((item) => new ItemDetailDTO(item))
    this.totalPayment = ticket.totalPayment
    this.partialPayments = ticket.partialPayments.map((payment) => new PartialPaymentDTO(payment))
    const totalPartialPayments = ticket.partialPayments.reduce((total, payment) => total + payment.amount, 0)
    this.balanceDue = (ticket.totalPayment - totalPartialPayments)
  }

  mapEmployee(employee) {
    return {
      firstName: employee.firstName,
      lastName: employee.lastName,
    }
  }
  mapCustomer(customer) {
    return {
      id:customer._id,
      firstName: customer.firstName,
      lastName: customer.lastName,
    }
  }
}

class ItemDetailDTO {
  constructor(itemDetail) {
    this.itemId = itemDetail.itemId
    this.name = itemDetail.name
    this.itemType = itemDetail.itemType
    this.quantity = itemDetail.quantity
    this.itemPrice = itemDetail.itemPrice
    this.profitEmployee = itemDetail.profitEmployee
  }
}
class PartialPaymentDTO {
  constructor(partialPayment) {
    this.id = partialPayment._id
    this.paymentDate = formatDate(partialPayment.paymentDate)
    this.amount = partialPayment.amount
    this.paymentMethod = partialPayment.paymentMethod
  }
}

export { TicketDTO, ItemDetailDTO, PartialPaymentDTO }
