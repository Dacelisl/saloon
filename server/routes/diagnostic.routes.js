import express from 'express'
import { diagnosticController } from '../controllers/diagnostic.controller.js'
import { adminAccess, registeredUser } from '../middleware/auth.js'

export const DiagnosticRoutes = express.Router()

DiagnosticRoutes.get('/', registeredUser, diagnosticController.getAllUsersDiagnostics)
DiagnosticRoutes.get('/user/:did', registeredUser, diagnosticController.getAllDiagnosticsByUserId)
DiagnosticRoutes.get('/id/:did', registeredUser, diagnosticController.getDiagnosticById)
DiagnosticRoutes.get('/scalpTypes', registeredUser, diagnosticController.getScalpTypes)
DiagnosticRoutes.get('/procedureTypes', registeredUser, diagnosticController.getProcedureTypes)
DiagnosticRoutes.get('/hairTypes', registeredUser, diagnosticController.getHairTypes)
DiagnosticRoutes.post('/', adminAccess, diagnosticController.createDiagnostic)
DiagnosticRoutes.put('/:did', adminAccess, diagnosticController.updateDiagnostic)
DiagnosticRoutes.delete('/:did', adminAccess, diagnosticController.deleteDiagnosticById)
