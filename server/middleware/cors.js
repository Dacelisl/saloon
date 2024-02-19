import cors from 'cors'

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
  optionsSuccessStatus: 204,
}
const corsw = cors(corsOptions)

export default corsw
