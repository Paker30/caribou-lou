'use strict';

const Glue = require('glue');
const DatabaseConfigurations = require('./config/databases');


const manifest = {
  server: {
    port: 9000
  },
  register: {
    plugins: [
      {
        plugin: require('hapi-mongodb'),
        options: DatabaseConfigurations.mongoConnections
      },
      require('./resume.GET'),
      require('./plugins/resume-dao'),
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
