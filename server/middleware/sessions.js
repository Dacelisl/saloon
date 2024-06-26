import session from 'express-session'
import MongoStore from 'connect-mongo'
import dataConfig from '../config/process.config.js'

const store = MongoStore.create({
  mongoUrl: dataConfig.url_mongo,
  collectionName: 'sessions',
  ttl: 36000000,
})
export const sessions = session({
  store,
  name: 'dataSalon.sid',
  secret: dataConfig.secret,
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 36000000,
    httpOnly: true,
  },
})
