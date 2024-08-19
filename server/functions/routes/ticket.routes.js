import express from 'express'
import { ticketController } from '../controllers/ticket.controller.js'
import { authorize } from '../middleware/auth.js'

export const TicketRoutes = express.Router()

TicketRoutes.get('/', authorize, ticketController.getTickets)
TicketRoutes.get('/ticket/:tnum', authorize, ticketController.getTicketByTicketNumber)
TicketRoutes.get('/customer/:cid', authorize, ticketController.getTicketsByCustomerDNI)
TicketRoutes.get('/employee/:eid', authorize, ticketController.getTicketsByEmployeeDNI)
TicketRoutes.get('/balance/', authorize, ticketController.getTicketByBalanceDue)
TicketRoutes.get('/paymentMethods/', authorize, ticketController.getPaymentMethods)
TicketRoutes.get('/balance/ticket/:tnum', authorize, ticketController.getTicketWithBalanceDueByNum)
TicketRoutes.post('/', authorize, ticketController.createTicket)
TicketRoutes.put('/:tnum', authorize, ticketController.updateTicket)
TicketRoutes.delete('/:tid', authorize, ticketController.deleteTicket)
