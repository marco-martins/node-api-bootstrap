/**
 * Main application routes
 */
import { Router } from 'express'

const routes = Router()

// Insert routes below
routes.use('/users', require('./api/user/user.routes'))

export default routes
