import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.FIRE_APIKEY,
  authDomain: import.meta.env.FIRE_AUTHDOMAIN,
  projectId: import.meta.env.FIRE_PROJECTID,
  storageBucket: import.meta.env.FIRE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.FIRE_MESSAGINGSENDERID,
  appId: import.meta.env.FIRE_APPID,
}
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
