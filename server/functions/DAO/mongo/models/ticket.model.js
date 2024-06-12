import { Schema, model } from 'mongoose'

const paymentMethodsEnum = ['cash', 'creditCard', 'debitCard', 'bankTransfer', 'nequi', 'daviplata']

const TicketSchema = new Schema({
  ticketNumber: { type: String, required: true, unique: true },
  purchaseDate: { type: Date, required: true, default: Date.now },
  customerId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  employeeId: { type: Schema.Types.ObjectId, ref: 'employee', required: true },
  items: [
    {
      itemId: { type: Schema.Types.ObjectId, required: true },
      itemType: { type: String, required: true, enum: ['service', 'product'] },
      quantity: { type: Number, required: true },
      itemPrice: { type: Number, required: true },
    },
  ],
  totalPayment: { type: Number, required: true },
  partialPayments: [
    {
      paymentMethod: { type: String, required: true, enum: paymentMethodsEnum },
      paymentDate: { type: Date, default: Date.now },
      amount: { type: Number, required: true },
    },
  ],
  balanceDue: { type: Number, default: 0 },
})
export const TicketModel = model('ticket', TicketSchema)
