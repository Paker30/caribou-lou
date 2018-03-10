'use strict';

const internals = {
  name: 'bot-messages',
  version: '1.0.0'
};

internals.dependencies = ['bot-connector'];

internals.register = async (server, options) => {

  server.route({
    method: 'POST',
    path: '/api/messages',
    config: {
      description: 'Returns what any says',
      notes: ['It echoes any message it\'s sended'],
      tags: ['api'],
      cors: true,
      handler: (request, reply) => {
        return server.connector.listen(request, reply);
      }
    }
  });
};

module.exports = internals;

