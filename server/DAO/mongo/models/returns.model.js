import { Schema, model } from 'mongoose'

const schema = new Schema({
  ticket: { type: Schema.Types.ObjectId, ref: 'Ticket', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  returnDate: { type: Date, required: true, default: Date.now },
  reason: { type: String, required: true, max: 200 }, // Razón de la devolución
})

export const ReturnModel = model('return', schema)
