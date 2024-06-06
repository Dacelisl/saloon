import cors from 'cors'
import dataConfig from '../config/process.config.js'

const corsOptions = {
  origin: ['http://localhost:3001', 'http://localhost:5173'],
  credentials: true,
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
  optionsSuccessStatus: 204,
}
const corsw = cors(corsOptions)

export default corsw
