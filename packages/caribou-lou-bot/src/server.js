'use strict';

const Glue = require('glue');
const { PORT } = require('./env');
const Package = require('../package');
const Vision = require('vision');
const Inert = require('inert');
const HapiSwagger = require('hapi-swagger');

const swaggerOptions = {
  info: {
    title: 'Caribou-lou bot API Documentation',
    version: Package.version
  }
};

const manifest = {
  server: {
    port: PORT
  },
  register: {
    plugins: [
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: swaggerOptions
      },
      require('./plugins/bot-plugin'),
      require('./messages.POST'),
    ],
    options: {
      once: true
    }
  }
};

const options = {
  relativeTo: __dirname
};

const startServer = async () => {
  try {
    const server = await Glue.compose(manifest, options);
    await server.start();
    console.log('hapi days!');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = { startServer };
