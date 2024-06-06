import functions from 'firebase-functions'
import admin from 'firebase-admin'
import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import { __dirname } from './utils/utils.js'
import { addLogger, logger } from './utils/logger.js'
import { connectMongo } from './utils/connectMongo.js'
import { router } from './routes/index.routes.js'
import dataConfig from './config/process.config.js'
import corsOptions from './middleware/cors.js'
import { sessions } from './middleware/sessions.js'

admin.initializeApp()

const app = express()
app.listen(() => logger.info(`listen on ${dataConfig.url_api_local}, mode:`, dataConfig.mode))
connectMongo()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'))
app.use(addLogger)

app.use(sessions)
app.use(cors(corsOptions))
app.use('*', cors(corsOptions))
app.use(router)

export const api = functions.https.onRequest(app)

/* export const getFirebaseConfig = functions.https.onRequest((request, response) => {
  const firebaseConfig = {
    apiKey: process.env.APIKEY || functions.config().config.api_key,
    authDomain: process.env.AUTHDOMAIN || functions.config().config.auth_domain,
    projectId: process.env.PROJECTID || functions.config().config.project_id,
    storageBucket: process.env.STORAGEBUCKET || functions.config().config.storage_bucket,
    messagingSenderId: process.env.MESSAGINGSENDERID || functions.config().config.messaging_sender_id,
    appId: process.env.APPID || functions.config().config.app_id,
  }
  response.json(firebaseConfig)
}) */
