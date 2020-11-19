// Production specific configuration
// =================================
module.exports = {
  // Express server conection options
  server: {
    ip: process.env.OPENSHIFT_NODEJS_IP || process.env.ip || undefined,
    port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080
  },
  // MongoDB connection options
  mongo: {
    uri:
      process.env.MONGODB_URI ||
      process.env.MONGOHQ_URL ||
      <string>process.env.OPENSHIFT_MONGODB_DB_URL + <string>process.env.OPENSHIFT_APP_NAME ||
      'mongodb://localhost/node-api-bootstrap'
  },
  // Seed database on startup
  seedDB: false
}
