'use strict';

const PORT = process.env.PORT || 3978;
const BotConnector = {
  appId: process.env.APP_ID || null,
  appPassword: process.env.APP_PASSWORD || null
};
const API_WS = process.env.WS || 'http://localhost';
const API_PORT = process.env.PORT || 9000;
const URL = process.env.URL || `${API_WS}:${API_PORT}`;

module.exports = { PORT, BotConnector, URL };
