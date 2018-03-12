'use strict';

const Restify = require('restify');
const Builder = require('botbuilder');
const { BotConnector } = require('./env');


const Server = Restify.createServer();
const Connector = new Builder.ChatConnector(BotConnector);

Server.post('/api/messages', Connector.listen());
new Builder.UniversalBot(Connector, (session) => {
  session.send('You said: %s', session.message.text);
});

module.exports = Server;
