'use strict';

const Builder = require('botbuilder');
const Request = require('request-promise-native');
const { URL } = require('../../env');
const RequestOptions = {
  uri: `${URL}/section/studies/resume`,
  json: true
};

module.exports = [
  (session) => {
    session.send('Aquí tienes los sitios donde Fran estudió');
    Request(RequestOptions)
      .then(({ text }) => {
        const card = new Builder.HeroCard(session);
        card.title('Estudios');
        card.subtitle('En 7 años estudiando, estos son los títulos que obtuvo');
        card.text(text);
        const message = new Builder.Message();
        message.addAttachment(card);
        session.send(message);
        session.endDialog();
      })
      .catch((error) => {
        session.send('Ups, no soy capaz de encontrar en donde estudió, perdona :s');
        session.endDialog();
      });
  }
];
