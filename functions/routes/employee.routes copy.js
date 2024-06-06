import { initializeApp } from 'firebase-admin/app'
import { getFunctions, https } from 'firebase-functions'
import cors from 'cors'
import { employeeController } from './controllers/employee.controller.js'
import { adminAccess, registeredUser } from './middleware/auth.js'

const app = initializeApp()
const functions = getFunctions(app)

const corsHandler = cors({ origin: true })

// Función genérica para manejar las rutas
export const api = https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const path = req.path

      // Define las rutas y sus funciones asociadas
      const routes = {
        '/employee/create': (req, res) => employeeController.createRol(req, res),
        '/employee/logOut': (req, res) => employeeController.getLogOut(req, res),
        '/employee/login': (req, res) => employeeController.getLogin(req, res),
        '/employee': (req, res) => employeeController.getAllEmployees(req, res),
        '/employee/:id': (req, res) => employeeController.getEmployeeById(req, res),
        '/employee/email/:email': (req, res) => employeeController.getEmployeeByEmail(req, res),
        '/employee/doc/:email': (req, res) => employeeController.getDocuments(req, res),
        '/employee/upload': (req, res) => employeeController.createDocument(req, res),
        '/employee/:id': (req, res) => employeeController.updateEmployee(req, res),
        '/employee/:email': (req, res) => employeeController.deleteEmployee(req, res),
      }

      // Verifica si la ruta existe
      const handler = routes[path]
      if (handler) {
        // Verifica la autorización
        if (path === '/employee/create' || path === '/employee/upload' || (path.startsWith('/employee/') && req.method === 'PUT') || (path.startsWith('/employee/') && req.method === 'DELETE')) {
          await adminAccess(req, res, () => handler(req, res))
        } else if (path.startsWith('/employee') && req.method === 'GET') {
          await registeredUser(req, res, () => handler(req, res))
        } else if (path === '/employee/logOut' || path === '/employee/login') {
          await handler(req, res)
        } else {
          res.status(401).send('No autorizado')
        }
      } else {
        res.status(404).send('Ruta no encontrada')
      }
    } catch (error) {
      console.error(error)
      res.status(500).send('Error interno del servidor')
    }
  })
})
