import path from 'path'
import _ from 'lodash'

// Set default node environment to development
const env = (process.env.NODE_ENV ||= 'development')

if (env === 'development') {
  // Load env variables from local file
  const localEnv = require('../local.env')

  for (const k in localEnv) {
    process.env[k] = localEnv[k]
  }
}

// All configurations will extend these options
// ============================================
const defaults = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(path.resolve(__dirname, '/../../..')),

  server: {
    // Server IP
    ip: process.env.IP || 'localhost',
    // Server port
    port: process.env.PORT || 8080
  },

  // Should we populate the DB with sample data?
  seedDB: true,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'my-secret-string'
  },

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost:27017/node-api-bootstrap-dev',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  },

  facebook: {
    clientID: process.env.FACEBOOK_ID || 'id',
    clientSecret: process.env.FACEBOOK_SECRET || 'secret',
    callbackURL: `${process.env.DOMAIN || ''}/auth/facebook/callback`
  },

  google: {
    clientID: process.env.GOOGLE_ID || 'id',
    clientSecret: process.env.GOOGLE_SECRET || 'secret',
    callbackURL: `${process.env.DOMAIN || ''}/auth/google/callback`
  }
}

// Export the config object based on the NODE_ENV
// ==============================================
export default _.merge(defaults, require(`./${process.env.NODE_ENV}`) || {})
