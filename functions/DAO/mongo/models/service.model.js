import { Schema, model } from 'mongoose'

const serviceSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  profitEmployee: { type: Number, required: true },
})

export const ServiceModel = model('service', serviceSchema)
