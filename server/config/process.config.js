import { Command } from 'commander'
import dotenv from 'dotenv'

const program = new Command()
program.option('--mode <mode>', 'Work Mode', 'development')

program.parse()
const mode = program.opts()
dotenv.config({
  path: program.opts().mode == 'development' ? './.env.development' : './.env.development',
})

const dataConfig = {
  mode: mode.mode,
  url_api: process.env.API_URL,
  persistence: process.env.PERSISTENCE,
  port: process.env.PORT,
  userName: process.env.USER_NAME,
  secretKey: process.env.SECRET_ACCESS_KEY,
  databaseName: process.env.DATABASE_NAME,
  url_mongo: process.env.URL_MONGO,
  ttl: process.env.TTL,
  emailTest: process.env.EMAIL_TEST,
  secret: process.env.SECRET,
  email_google: process.env.EMAIL,
  key_email_google: process.env.KEY_GOOGLE,
  fire_apiKey: process.env.FIRE_APIKEY,
  fire_authDomain: process.env.FIRE_AUTHDOMAIN,
  fire_projectId: process.env.FIRE_PROJECTID,
  fire_storageBucket: process.env.FIRE_STORAGEBUCKET,
  fire_messagingSenderId: process.env.FIRE_MESSAGINGSENDERID,
  fire_appId: process.env.FIRE_APPID,
}
export default dataConfig
