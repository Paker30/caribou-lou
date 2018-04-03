'use strict';

const Builder = require('botbuilder');
const Request = require('request-promise-native');
const { URL } = require('../../env');
const RequestOptions = {
  uri: `${URL}/section/personal/resume`,
  json: true
};

module.exports = [
  (session) => {
    session.send('Aquí tienes su nombre completo, dirección y sus datos de contacto por si necesitas contactar con Fran');
    Request(RequestOptions)
      .then(({ text }) => {
        const card = new Builder.HeroCard(session);
        card.title('Datos personales');
        card.subtitle('Si necesitas contactar con Fran, aquí tienes su contacto');
        card.text(text);
        const message = new Builder.Message();
        message.addAttachment(card);
        session.send(message);
        session.endDialog();
      })
      .catch((error) => {
        session.send('Ups, no soy capaz de encontrar sus datos personales, perdona :s');
        session.endDialog();
      });
  }
];
