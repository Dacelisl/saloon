import { Schema, model } from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  workingHours: {
    startTime: { type: Number, required: true },
    endTime: { type: Number, required: true },
  },
  permissions: [
    {
      module: { type: String, required: true },
      actions: [String],
    },
  ],
})

export const RoleModel = model('role', schema)
