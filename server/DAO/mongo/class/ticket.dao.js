import { TicketModel } from '../models/ticket.model.js'
import { ProductModel } from '../models/product.model.js'
import { ServiceModel } from '../models/service.model.js'
import { employeePerformanceDAO } from './employeePerformance.dao.js'
import { userDAO } from './user.dao.js'
import { TicketDTO } from '../../DTO/ticket.dto.js'
import { totalPrice, randomTicketNumber } from '../../../utils/utils.js'

class TicketDAO {
  async getTickets() {
    try {
      let tickets = await TicketModel.find().populate('customerId', 'firstName lastName').populate('employeeId', 'firstName lastName').lean()

      tickets = await Promise.all(
        tickets.map(async (ticket) => {
          const items = await this.mapItemNames(ticket.items)
          return { ...ticket, items }
        })
      )
      const formattedTickets = tickets.map((ticket) => (ticket ? new TicketDTO(ticket) : null))
      return formattedTickets
    } catch (error) {
      throw new Error(`function DAO getTickets: ${error}`)
    }
  }
  async getTicketByTicketNumber(ticketNumber) {
    try {
      let ticket = await TicketModel.findOne({ ticketNumber }).populate('customerId', 'firstName lastName email').populate('employeeId', 'firstName lastName email').lean()
      ticket.items = await this.mapItemNames(ticket.items)
      return ticket ? new TicketDTO(ticket) : null
    } catch (error) {
      throw new Error(`function DAO getTicketByTicketNumber  ${error}`)
    }
  }
  async getTicketWithBalanceDueByNum(ticketNumber) {
    try {
      let ticket = await TicketModel.findOne({ ticketNumber, balanceDue: { $gt: 0 } })
        .populate('customerId', 'firstName lastName email')
        .populate('employeeId', 'firstName lastName email')
        .lean()
      ticket.items = await this.mapItemNames(ticket.items)
      return ticket ? new TicketDTO(ticket) : null
    } catch (error) {
      throw new Error(`function DAO getTicketWithBalanceDueByNum  ${error}`)
    }
  }
  async getTicketsByCustomerDNI(customerId) {
    try {
      let tickets = await TicketModel.find({ customerId }).populate('customerId', 'firstName lastName email').populate('employeeId', 'firstName lastName email').lean()

      tickets = await Promise.all(
        tickets.map(async (ticket) => {
          const items = await this.mapItemNames(ticket.items)
          return { ...ticket, items }
        })
      )
      const formattedTickets = tickets.map((ticket) => (ticket ? new TicketDTO(ticket) : null))
      return formattedTickets
    } catch (error) {
      throw new Error(`function DAO getTicketByCustomerDNI  ${error}`)
    }
  }
  async getTicketsByEmployeeDNI(employeeId) {
    try {
      let tickets = await TicketModel.find({ employeeId }).populate('customerId', 'firstName lastName email').populate('employeeId', 'firstName lastName email').lean()
      tickets = await Promise.all(
        tickets.map(async (ticket) => {
          const items = await this.mapItemNames(ticket.items)
          return { ...ticket, items }
        })
      )
      const formattedTickets = tickets.map((ticket) => (ticket ? new TicketDTO(ticket) : null))
      return formattedTickets
    } catch (error) {
      throw new Error(`function DAO getTicketByEmployeeDNI  ${error}`)
    }
  }
  async getTicketByBalanceDue() {
    try {
      let tickets = await TicketModel.find({ balanceDue: { $gt: 0 } })
        .populate('customerId', 'firstName lastName email')
        .populate('employeeId', 'firstName lastName email')
        .lean()
      if (tickets.length > 0) {
        tickets = await Promise.all(
          tickets.map(async (ticket) => {
            const items = await this.mapItemNames(ticket.items)
            return { ...ticket, items }
          })
        )
        const formattedTickets = tickets.map((ticket) => (ticket ? new TicketDTO(ticket) : null))
        return formattedTickets
      }
      return null
    } catch (error) {
      throw new Error(`function DAO getTicketByBalanceDue  ${error}`)
    }
  }

  async getPaymentMethods() {
    try {
      const enumValues = Object.values(TicketModel.schema.path('partialPayments.paymentMethod').enumValues)
      return enumValues
    } catch (error) {
      throw new Error(`function DAO getPaymentMethods  ${error}`)
    }
  }

  async createTicket(ticketData) {
    try {
      let ticket = totalPrice(ticketData)
      ticket.items = await this.mapItemNames(ticket.items)
      ticket.ticketNumber = await this.genTicketNumber()
      ticket.balanceDue = ticket.totalPayment - ticket.partialPayments[0].amount
      await employeePerformanceDAO.createEmployeePerformance(ticket)
      await userDAO.updateHistorysUser(ticket)
      const result = await TicketModel.create(ticket)
      return result
    } catch (error) {
      throw new Error(`function DAO createTicket  ${error}`)
    }
  }
  async deleteTicket(ticketNumber) {
    try {
      await employeePerformanceDAO.deleteEmployeePerformance(ticketNumber)
      const result = await TicketModel.deleteOne({ ticketNumber })
      return result
    } catch (error) {
      throw new Error(`function DAO deleteTicketById  ${error}`)
    }
  }

  async updateTicket(updatedData) {
    try {
      const ticket = await TicketModel.findOne({ ticketNumber: updatedData.ticketNumber })
      ticket.partialPayments.push(updatedData.partialPayments)
      const totalPagos = ticket.partialPayments.reduce((total, pago) => total + pago.amount, 0)
      const totalItems = ticket.items.reduce((total, item) => total + item.quantity * item.itemPrice, 0)
      ticket.balanceDue = totalItems - totalPagos
      await ticket.save()
      return ticket
    } catch (error) {
      throw new Error(`Function DAO updateTicket ${error}`)
    }
  }

  async mapItemNames(items) {
    return Promise.all(
      items.map(async (item) => {
        if (item.itemType === 'service') {
          const service = await ServiceModel.findById(item.itemId)
          item.itemId = service ? service._id : null
          item.name = service ? service.name : null
          item.profitEmployee = service ? service.profitEmployee : null
        } else {
          const product = await ProductModel.findById(item.itemId)
          item.itemId = product ? product._id : null
          item.name = product ? product.name : null
          item.profitEmployee = product ? product.profitEmployee : null
        }
        return item
      })
    )
  }
  async genTicketNumber() {
    let code
    do {
      code = randomTicketNumber()
    } while (await TicketModel.findOne({ ticketNumber: code }))
    return code
  }
}
export const ticketDAO = new TicketDAO()
