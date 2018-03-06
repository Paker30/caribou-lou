'use strict';

const Joi = require('joi');

const internals = {
  name: 'resume',
  version: '1.0.0'
};

internals.dependencies = ['resume-dao', 'hapi-swagger'];

internals.register = async (server, options) => {
  const ResumeDao = server.caribouDao;

  server.route({
    method: 'GET',
    path: '/section/{section}/resume',
    config: {
      description: 'Get sections of a resume',
      notes: ['Returns the section which is passed as param'],
      tags: ['api'],
      validate: {
        params: {
          section: Joi.string()
            .allow(['personal', 'professional', 'skills', 'studies'])
            .required()
            .description('The resume\'s section to retrieve')
        }
      },
      cors: true,
      handler: (request, reply) => {
        return server.caribouDao
          .find(request.params.section)
          .then((section) => section)
          .catch((err) => {
            throw new Error();
          });
      }
    }
  });
};

module.exports = internals;

