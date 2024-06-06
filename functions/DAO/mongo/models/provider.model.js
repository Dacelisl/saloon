import { Schema, model } from 'mongoose'

const providerSchema = new Schema({
  name: { type: String, required: true, max: 80 },
  description: { type: String, max: 250 },
  contact: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dni: { type: Number, required: true, unique: true },
    address: { type: String, required: true },
    phone: {
      type: Number,
      required: true,
      validate: {
        validator: async function (value) {
          return /^\d{10,}$/.test(value.toString())
        },
        message: 'The phone number is not valid',
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: async function (value) {
          return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)
        },
        message: 'The email format is not valid',
      },
    },
    dateBirthday: { type: Date, required: true },
    thumbnail: {
      type: String,
      required: true,
      default: 'Not Photo',
    },
  },
  address: { type: String, required: true },
  city: { type: String, required: true },
  paymentTerms: { type: String, required: true, max: 50 },
})

export const ProviderModel = model('Provider', providerSchema)
