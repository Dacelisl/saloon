import { Schema, model } from 'mongoose'

const categoryEnum = ['cleaning', 'sale', 'inUse', 'inventory', 'refund']

const priceHistorySchema = new Schema({
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
})

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: categoryEnum },
  price: { type: Number, required: true },
  priceHistory: [priceHistorySchema],
  thumbnail: { type: String, required: true },
  code: { type: String, unique: true, required: true },
  provider: { type: Schema.Types.ObjectId, ref: 'Provider', required: true },
  stock: { type: Number, required: true },
  dateCreation: { type: Date, default: Date.now },
  profitEmployee: { type: Number, required: true },
  profitSaloon: { type: Number, required: true },
})

export const ProductModel = model('product', productSchema)
