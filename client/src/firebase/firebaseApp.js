import { initializeApp } from 'firebase/app'
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
  return auth
}

export { initializeFirebase, auth }
