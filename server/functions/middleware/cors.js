import dataConfig from '../config/process.config.js'

const corsOptions = {
  /* origin: ['http://localhost:5173', 'https://auth-management-saloon.web.app/'], */
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
}
export default corsOptions
