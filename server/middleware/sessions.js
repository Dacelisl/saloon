import session from 'express-session'
import MongoStore from 'connect-mongo'
import dataConfig from '../config/process.config.js'

const store = MongoStore.create({
  mongoUrl: dataConfig.url_mongo,
  ttl: 36000000,
})
export const sessions = session({
  store,
  secret: dataConfig.secret,
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 36000000,
  },
})
