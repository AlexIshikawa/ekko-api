import { Router } from "express";

import AppointmentController from './app/controllers/AppointmentsController'

const routes = new Router()

routes.get('/appointments', AppointmentController.index)
routes.post('/appointments', AppointmentController.create)

export default routes
