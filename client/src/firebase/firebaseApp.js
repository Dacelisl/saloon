import { initializeApp } from 'firebase/app'
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

// Configura la persistencia en el almacenamiento de sesión del navegador
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // La persistencia de la autenticación se configuró correctamente
  })
  .catch((error) => {
    // Error al configurar la persistencia de la autenticación
    console.error('Error al configurar la persistencia:', error)
  })

export { auth }
