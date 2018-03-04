'use strict';

const internals = {
  name: 'resume',
  version: '1.0.0'
};

internals.dependencies = ['resume-dao'];

internals.register = async (server, options) => {
  const ResumeDao = server.caribouDao;

  server.route({
    method: 'GET',
    config: {
      cors: true
    },
    path: '/resume',
    handler: (request, reply) => {
      return { 'hola': 'hola' };
    }
  });

  server.route({
    method: 'GET',
    config: {
      cors: true
    },
    path: '/section/{section}/resume',
    handler: (request, reply) => {
      return server.caribouDao
        .find(request.params.section)
        .then((section) => section)
        .catch((err) => {
          throw new Error();
        });
    }
  });
};

module.exports = internals;

