import express from 'express'
import cors from 'cors'
import { __dirname } from './utils/utils.js'
import { addLogger, logger } from './utils/logger.js'
import { connectMongo } from './utils/connectMongo.js'
import { router } from './routes/index.routes.js'
import dataConfig from './config/process.config.js'
import corsOptions from './middleware/cors.js'
import { sessions } from './middleware/sessions.js'

const app = express()
app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'))
app.use(addLogger)

app.use(sessions)

app.use(router)
connectMongo()

app.listen(dataConfig.port, () => logger.info(`listen on ${dataConfig.url_api}, mode:`, dataConfig.mode))
/* app.listen(() => logger.info(`listen on ${dataConfig.url_api}, mode:`, dataConfig.mode))
 */