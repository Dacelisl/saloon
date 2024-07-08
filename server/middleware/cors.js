import dataConfig from '../config/process.config.js'

const corsOptions = {
  origin: ['http://localhost:5173', 'https://project-fabiosalon.web.app', 'https://project-fabiosalon.firebaseapp.com/'],
  credentials: true,
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
}
export default corsOptions
