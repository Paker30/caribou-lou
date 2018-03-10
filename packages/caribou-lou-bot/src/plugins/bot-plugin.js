'use strict';

const BotBuilder = require('botbuilder');
const { BotConnector } = require('../env');

const register = async (server, options) => {
  //Crear el conector para el bot
  const connector = new BotBuilder.ChatConnector(BotConnector);
  const bot = new BotBuilder.UniversalBot(connector, (session) => {
    session.send("You said: %s", session.message.text);
  });
  server.decorate('server', 'connector', connector);
};

const internals = {
  name: 'bot-connector',
  register
};

module.exports = internals;
