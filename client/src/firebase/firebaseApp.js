import { initializeApp } from 'firebase/app'
import axios from 'axios'
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth'

let auth

async function initializeFirebase() {
  const response = await axios.get('https://us-central1-project-fabiosalon.cloudfunctions.net/getConfigFirebase')
  const firebaseConfig = response.data
  const app = initializeApp(firebaseConfig)
  auth = getAuth(app)

  setPersistence(auth, browserLocalPersistence)
    .then(() => {})
    .catch((error) => {
      throw new Error(`Error server setPersistence ${error}`)
    })
  return auth
}

export { initializeFirebase, auth }
