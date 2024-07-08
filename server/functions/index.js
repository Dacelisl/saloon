import functions from 'firebase-functions'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
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
app.use(cookieParser())
app.use(addLogger)

app.use(sessions)
app.use(router)
connectMongo()

app.listen(() => logger.info(`listen on ${dataConfig.url_api}, mode:`, dataConfig.mode))

export const api = functions.https.onRequest(app)

export const getFirebaseConfig = functions.https.onRequest((request, response) => {
  const firebaseConfig = {
    apiKey: process.env.FIRE_APIKEY || functions.config().config.api_key,
    authDomain: process.env.FIRE_AUTHDOMAIN || functions.config().config.auth_domain,
    projectId: process.env.FIRE_PROJECTID || functions.config().config.project_id,
    storageBucket: process.env.FIRE_STORAGEBUCKET || functions.config().config.storage_bucket,
    messagingSenderId: process.env.FIRE_MESSAGINGSENDERID || functions.config().config.messaging_sender_id,
    appId: process.env.FIRE_APPID || functions.config().config.app_id,
  }
  const allowedOrigins = ['http://localhost:5173', 'https://project-fabiosalon.web.app', 'https://project-fabiosalon.firebaseapp.com/']
  const origin = request.headers.origin
  if (allowedOrigins.indexOf(origin) !== -1) {
    response.setHeader('Access-Control-Allow-Origin', origin)
  }
  response.setHeader('Access-Control-Allow-Methods', 'GET')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  response.setHeader('Access-Control-Allow-Credentials', 'true')
  response.json(firebaseConfig)
})
