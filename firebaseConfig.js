import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import dataConfig from './server/config/process.config.js'
const firebaseConfig = {
  apiKey: dataConfig.fire_apiKey,
  authDomain: dataConfig.fire_authDomain,
  projectId: dataConfig.fire_projectId,
  storageBucket: dataConfig.fire_storageBucket,
  messagingSenderId: dataConfig.fire_messagingSenderId,
  appId: dataConfig.fire_appId,
}
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
