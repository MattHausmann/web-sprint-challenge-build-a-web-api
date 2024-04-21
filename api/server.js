const express = require('express');
const server = express();
server.use(express.json());


const projectRoutes = require('./projects/projects-router');


server.use('/api/projects', projectRoutes);


module.exports = server;
