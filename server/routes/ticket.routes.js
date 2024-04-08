import express from 'express'
import { ticketController } from '../controllers/ticket.controller.js'
export const TicketRoutes = express.Router()

TicketRoutes.get('/', ticketController.getTickets)
TicketRoutes.get('/ticket/:tnum', ticketController.getTicketByTicketNumber)
TicketRoutes.get('/customer/:cid', ticketController.getTicketsByCustomerDNI)
TicketRoutes.get('/employee/:eid', ticketController.getTicketsByEmployeeDNI)
TicketRoutes.get('/balance/', ticketController.getTicketByBalanceDue)
TicketRoutes.get('/paymentMethods/', ticketController.getPaymentMethods)
TicketRoutes.get('/balance/ticket/:tnum', ticketController.getTicketWithBalanceDueByNum)
TicketRoutes.post('/', ticketController.createTicket)
TicketRoutes.put('/:tnum', ticketController.updateTicket)
TicketRoutes.delete('/:tid', ticketController.deleteTicket)
