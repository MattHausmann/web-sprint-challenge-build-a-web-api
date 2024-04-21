const express = require('express');
const server = express();
server.use(express.json());


const projectRoutes = require('./projects/projects-router');
const actionRoutes = require('./actions/actions-router');


server.use('/api/projects', projectRoutes);
server.use('/api/actions', actionRoutes);


module.exports = server;
