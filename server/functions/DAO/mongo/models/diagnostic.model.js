import { Schema, model } from 'mongoose'

const hairConditionEnum = ['Normal', 'Graso', 'Seco', 'Muy Seco', 'Dañado']
const scalpConditionEnum = ['Saludable', 'Seco', 'Caspa', 'Graso']

const DiagnosticSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  employeeId: { type: Schema.Types.ObjectId, ref: 'employee', required: true },
  date: { type: Date, required: true, default: Date.now },
  procedureType: { type: Schema.Types.ObjectId, ref: 'service', required: true },
  hairCondition: { type: String, required: true, enum: hairConditionEnum },
  scalpCondition: { type: String, required: true, enum: scalpConditionEnum }, 
  stylistNotes: { type: String, trim: true },
  recommendations: { type: String, trim: true },
  nextAppointment: { type: Date },
  photoBefore: { type: String, trim: true },
  photoAfter: { type: String, trim: true },
})

export const DiagnosticModel = model('diagnostic', DiagnosticSchema)
