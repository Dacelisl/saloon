import { initializeApp } from 'firebase/app'
import axios from 'axios'
import { getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth'

let auth

async function initializeFirebase() {
  const response = await axios.get('https://us-central1-project-fabiosalon.cloudfunctions.net/getFirebaseConfig')
  const firebaseConfig = response.data
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
