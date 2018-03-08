'use strict';

const Config = require('../config/databases');
const CaribouDao = require('caribou-lou-dao');

const register = async (server, options) => {
  //LLamar al módulo que hace las operaciones en base de datos
  const dao = CaribouDao(server.ResumeDb.db);
  server.decorate('server', 'caribouDao', dao);
};

const internals = {
  name: 'resume-dao',
  dependencies: ['hapi-mongodb'],
  register
};

module.exports = internals;
