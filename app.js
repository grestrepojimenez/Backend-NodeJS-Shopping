/**
 * Main application file
 */

const express = require('express');
const http = require('http');

// Add this line
const expressConfig = require('./config/express');
const routeConfig = require('./routes');

// Setup server
const app = express();
const server = http.createServer(app);

const mongoose = require('mongoose');

const config = require('./config/environment');


// Connect to MongoDB
mongoose.connect(config.mongo.uri, { useNewUrlParser: true });
mongoose.connection.on('error', (err) => {
  console.error('Error', 'MongoDB connection error', {
    data: err,
    time: new Date().toISOString(),
  });
  process.exit(-1);
});

// Add this line
expressConfig(app);
routeConfig(app);



// Start server
function startServer() {
  app.shoppingCartBK = server.listen(config.port, config.ip, () => {
    console.log(`Express server listening on ${config.port}, in ${app.get('env')} mode`);
  });
}

setImmediate(startServer);

// Expose app
module.exports = app;

