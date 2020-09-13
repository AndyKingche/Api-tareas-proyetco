const express = require('express');
const message = require('../components/tareas/network');

const routes = function(server){
    server.use('/tarea',message);
}
module.exports = routes;