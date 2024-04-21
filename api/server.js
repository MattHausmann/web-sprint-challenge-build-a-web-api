const express = require('express');

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

const projectRoutes = require('./projects/projects-router');

const server = express();

server.use('/projects', projectRoutes);


module.exports = server;
