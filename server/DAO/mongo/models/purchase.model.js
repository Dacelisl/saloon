import { Schema, model } from 'mongoose'

const schema = new Schema({
    provider: { type: Schema.Types.ObjectId, ref: 'Provider', required: true },
    purchaseDate: { type: Date, required: true, default: Date.now },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        purchasePrice: { type: Number, required: true }, // Precio al que se compró
      },
    ],
    totalCost: { type: Number, required: true },
})

export const PurchaseModel = model('purchase', schema)
