class UserTicketDTO {
  constructor(ticket) {
    this.services = []
    this.products = []
    ticket.items.forEach((item) => {
      if (item.itemType === 'service') {
        this.services.push({
          serviceId: item.itemId,
          quantity: item.quantity,
          price: item.itemPrice,
        })
      } else if (item.itemType === 'product') {
        this.products.push({
          productId: item.itemId,
          quantity: item.quantity,
          price: item.itemPrice,
        })
      }
    })
    this.totalPayment = ticket.totalPayment
  }
}
export { UserTicketDTO }
