// Test specific configuration
// ===========================
module.exports = {
  // Express server conection options
  server: {
    port: 8181
  },
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost:27017/node-api-bootstrap-test'
  },
  // Seed database on startup
  seedDB: false
}
