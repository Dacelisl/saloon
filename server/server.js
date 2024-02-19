import express from 'express'
import 'express-async-errors'
import { __dirname } from './utils/utils.js'
import { addLogger, logger } from './utils/logger.js'
import { connectMongo } from './utils/connectMongo.js'
import { router } from './routes/index.routes.js'
import dataConfig from './config/process.config.js'
import corsw from './middleware/cors.js'
import {sessions} from './middleware/sessions.js'

const app = express()
app.listen(dataConfig.port, () => logger.info(`listen on http://localhost:${dataConfig.port}, mode:`, dataConfig.mode))
connectMongo()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'))
app.use(addLogger)

app.use(sessions)
app.use(corsw)
app.use('*', corsw)
app.use(router)
