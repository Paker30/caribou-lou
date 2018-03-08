'use strict';
const { DB_URL } = require('./env');


const internals = {};

internals.development = {
  mongoConnections: {
    decorate: 'ResumeDb',
    url: DB_URL
  }
};

internals.test = {
  mongoConnections: {
    decorate: 'ResumeDb',
    url: 'mongodb://ciervo:27017'
  }
};

module.exports = internals[process.env.NODE_ENV];
