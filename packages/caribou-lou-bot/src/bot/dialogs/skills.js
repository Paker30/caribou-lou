'use strict';

const Builder = require('botbuilder');
const Request = require('request-promise-native');
const { URL } = require('../../env');
const RequestOptions = {
  uri: `${URL}/section/skills/resume`,
  json: true
};

module.exports = [
  (session) => {
    session.send('Estas son las habilidades destacadas de Fran');
    Request(RequestOptions)
      .then(({ text }) => {
        const card = new Builder.HeroCard(session);
        card.title('Idiomas, lenguages, herramientas');
        card.subtitle('Estos son los idiomas y lenguajes con los que está más familiarizado');
        card.text(text);
        const message = new Builder.Message();
        message.addAttachment(card);
        session.send(message);
        session.endDialog();
      })
      .catch((error) => {
        session.send('Ups, no soy capaz de encontrar sus habilidades, perdona :s');
        session.endDialog();
      });
  }
];
