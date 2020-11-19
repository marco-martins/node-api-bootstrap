// Use local.env.js for environment variables that will be set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:4200',
  SESSION_SECRET: 'my-app-secret',

  FACEBOOK_ID: 'app-id',
  FACEBOOK_SECRET: 'secret',

  GOOGLE_ID: 'app-id',
  GOOGLE_SECRET: 'secret',

  MAIL_HOST: 'smtp.example.email',
  MAIL_PORT: 587,
  MAIL_USER: 'email@example.com',
  MAIL_PASS: 'email-password',

  // Control debug level for modules using visionmedia/debug
  // DEBUG: 'http*,socket.io:socket'
  DEBUG: 'http*'
}
