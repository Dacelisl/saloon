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
  name:'express-session',
  secret: dataConfig.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: true, // Set to true if using https
    sameSite: 'none',
  },
})
