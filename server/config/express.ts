/**
 * Express configuration
 */
import { Application } from 'express'
import morgan from 'morgan'
import compression from 'compression'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import methodOverride from 'method-override'
import cookieParser from 'cookie-parser'
import errorHandler from 'errorhandler'
import cors from 'cors'
// import path from 'path'
// import config from './environment'

export default function (app: Application) {
  const env = app.get('env')
  // Monorepo configurations (optional)
  // app.set('appPath', path.join(config.root, 'client'))
  // app.use(express.static(app.get('appPath')))

  app.use(morgan('dev'))
  app.use(helmet())
  app.use(compression())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(methodOverride())
  app.use(cookieParser())

  // Cors configurations
  if (env === 'development') {
    app.use(
      cors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        maxAge: 3600
      })
    )
  }

  // Error handler - has to be last
  if (env === 'development' || env === 'test') {
    app.use(errorHandler())
  }
}
