import { initializeApp } from 'firebase/app'
import axios from 'axios'
import { getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth'

let auth

async function initializeFirebase() {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_APPID,
  }
  
  const app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  
  setPersistence(auth, browserSessionPersistence)
  .then(() => {})
  .catch((error) => {
    throw new Error(`Error server setPersistence ${error}`)
  })
  /* const response = await axios.get('http://localhost:5001/auth-management-saloon/us-central1/getFirebaseConfig')
  console.log('response ', response); */
  return auth
}

export { initializeFirebase, auth }

/* const response =  await axios.get('https://auth-management-saloon.cloudfunctions.net/getFirebaseConfig') */
/* import { initializeApp } from 'firebase/app'
import { getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

setPersistence(auth, browserSessionPersistence)
  .then(() => {})
  .catch((error) => {
    throw new Error(`Error server setPersistence ${error}`)
  })

export { auth }
 */
