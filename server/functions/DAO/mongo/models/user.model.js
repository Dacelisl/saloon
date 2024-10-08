import { Schema, model } from 'mongoose'

const ProductSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'product', required: true },
  quantity: { type: Number, required: true },
})

const schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dni: { type: Number, required: true, unique: true },
  phone: {
    type: Number,
    required: true,
    validate: {
      validator: async function (value) {
        return /^\d{10,12}$/.test(value.toString())
      },
      message: 'The phone number is not valid',
    },
  },
  address: {
    type: String,
    required: true,
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
  dateBirthday: {
    type: Date,
    required: true,
  },
  firstDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  lastDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  thumbnail: {
    type: String,
    required: false,
    default: 'Not Photo',
  },
  serviceHistory: [
    {
      employeeId: { type: Schema.Types.ObjectId, ref: 'employee', required: true },
      service: { type: Schema.Types.ObjectId, ref: 'service', required: true },
      price: { type: Number },
      date: { type: Date, default: Date.now },
    },
  ],
  shopping: [
    {
      employeeId: { type: Schema.Types.ObjectId, ref: 'employee', required: true },
      products: { type: [ProductSchema], required: false, default: [] },
      date: { type: Date, default: Date.now },
    },
  ],
})
export const userModel = model('user', schema)
