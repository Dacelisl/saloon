import { Schema, model } from 'mongoose'

const categoryEnum = ['cleaning', 'sale', 'inUse', 'inventory','refund']

const productSchema = new Schema({
  name: { type: String, required: true, max: 80 },
  description: { type: String, required: true, max: 150 },
  category: { type: String, required: true, enum: categoryEnum },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true, max: 100 },
  code: { type: String, unique: true, required: true, max: 30 },
  provider: { type: String, required: false, max: 30 },
  stock: { type: Number, required: true, max: 110 },
  dateCreation: { type: Date, default: Date.now },
  profitEmployee: { type: Number, required: true },
  profitSaloon: { type: Number, required: true },
})

export const ProductModel = model('product', productSchema)
