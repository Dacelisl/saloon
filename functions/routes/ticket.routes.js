import express from 'express'
import { ticketController } from '../controllers/ticket.controller.js'
import { adminAccess, registeredUser } from '../middleware/auth.js'

export const TicketRoutes = express.Router()

TicketRoutes.get('/', registeredUser, ticketController.getTickets)
TicketRoutes.get('/ticket/:tnum', registeredUser, ticketController.getTicketByTicketNumber)
TicketRoutes.get('/customer/:cid', registeredUser, ticketController.getTicketsByCustomerDNI)
TicketRoutes.get('/employee/:eid', registeredUser, ticketController.getTicketsByEmployeeDNI)
TicketRoutes.get('/balance/', registeredUser, ticketController.getTicketByBalanceDue)
TicketRoutes.get('/paymentMethods/', registeredUser, ticketController.getPaymentMethods)
TicketRoutes.get('/balance/ticket/:tnum', registeredUser, ticketController.getTicketWithBalanceDueByNum)
TicketRoutes.post('/', registeredUser, ticketController.createTicket)
TicketRoutes.put('/:tnum', registeredUser, ticketController.updateTicket)
TicketRoutes.delete('/:tid', adminAccess, ticketController.deleteTicket)
