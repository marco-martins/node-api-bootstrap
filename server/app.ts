/**
 * Main application file
 */
import express from 'express'
import mongoose from 'mongoose'
import config from './config/environment'
import configExpress from './config/express'
import routes from './routes'
import http from 'http'
import seedDatabaseIfNeeded from './config/seed'

// SETUP DB
mongoose.Promise = global.Promise
mongoose.connection.on('error', function (err) {
  console.error(`[ERROR] MongoDB connection: ${err}`)
  process.exit(-1) // eslint-disable-line no-process-exit
})
// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options)

// SETUP SERVER
const app = express()
// Load express configs
configExpress(app)
// Load app routes
app.use(routes)

// Start server
function startServer () {
  // We don't need the server connection to run the tests
  if (process.env.NODE_ENV === 'test') { return }

  const server = http.createServer(app)
  server.listen(config.server.port, config.server.ip, function () {
    console.log('[INFO] Express server listening on port %d, in %s mode', config.server.port, app.get('env'))
  })
}

seedDatabaseIfNeeded()
setImmediate(startServer)

// Expose app
export default app
