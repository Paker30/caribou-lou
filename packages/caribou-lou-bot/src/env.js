'use strict';

const PORT = process.env.PORT || 3978;
const BotConnector = {
  appId: process.env.APP_ID || null,
  appPassword: process.env.APP_PASSWORD || null
};

module.exports = { PORT, BotConnector };
