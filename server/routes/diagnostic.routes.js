import express from 'express'
import { diagnosticController } from '../controllers/diagnostic.controller.js'
import { authorize } from '../middleware/auth.js'

export const DiagnosticRoutes = express.Router()

DiagnosticRoutes.get('/', authorize, diagnosticController.getAllUsersDiagnostics)
DiagnosticRoutes.get('/user/:did', authorize, diagnosticController.getAllDiagnosticsByUserId)
DiagnosticRoutes.get('/id/:did', authorize, diagnosticController.getDiagnosticById)
DiagnosticRoutes.get('/scalpTypes', authorize, diagnosticController.getScalpTypes)
DiagnosticRoutes.get('/hairTypes', authorize, diagnosticController.getHairTypes)
DiagnosticRoutes.post('/', authorize, diagnosticController.createDiagnostic)
DiagnosticRoutes.put('/:did', authorize, diagnosticController.updateDiagnostic)
DiagnosticRoutes.delete('/:did', authorize, diagnosticController.deleteDiagnosticById)
