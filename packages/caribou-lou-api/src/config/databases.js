'use strict';
const { DB_URL } = require('./env');


const internals = {};

internals.development = {
  mongoConnections: {
    decorate: 'ResumeDb',
    url: DB_URL
  }
};

module.exports = internals[process.env.NODE_ENV];
