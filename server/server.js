import express from 'express'
import 'express-async-errors'
import MongoStore from 'connect-mongo'
import session from 'express-session'
import cors from 'cors'
import { __dirname } from './utils/utils.js'
import { addLogger, logger } from './utils/logger.js'
import { connectMongo } from './utils/connectMongo.js'
import { errorHandler } from './middleware/errors.js'
import { ProductRoutes } from './routes/products.routes.js'
import { RoleRoutes } from './routes/role.routes.js'
import { ServiceRoutes } from './routes/service.routes.js'
import { UserRoutes } from './routes/user.routes.js'
import { EmployeeRoutes } from './routes/employee.routes.js'
import { TicketRoutes } from './routes/ticket.routes.js'
import { EmployeePerformanceRoutes } from './routes/employeePerformance.routes.js'
import dataConfig from './config/process.config.js'

const app = express()
const corsOptions = {
  origin: `http://localhost:5173`,
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization',
}

app.use(cors(corsOptions))
app.use(addLogger)

app.listen(dataConfig.port, () => logger.info(`listen on http://localhost:${dataConfig.port}, mode:`, dataConfig.mode))
connectMongo()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'))

const store = MongoStore.create({
  mongoUrl: dataConfig.url_mongo,
  ttl: dataConfig.ttl,
})
app.use(
  session({
    store,
    secret: dataConfig.secret,
    resave: true,
    saveUninitialized: false,
  })
)

app.use('/api/products', ProductRoutes)
app.use('/api/users', UserRoutes)
app.use('/api/employee', EmployeeRoutes)
app.use('/api/role', RoleRoutes)
app.use('/api/service', ServiceRoutes)
app.use('/api/tickets', TicketRoutes)
app.use('/api/performance', EmployeePerformanceRoutes)

app.get('*', (req, res) => {
  return res.status(404).json({
    status: 'error',
    message: `Not Found: ${res.message}`,
    payload: {},
  })
})
app.use(errorHandler)
