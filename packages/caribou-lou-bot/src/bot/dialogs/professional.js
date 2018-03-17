'use strict';

const Builder = require('botbuilder');
const Request = require('request-promise-native');
const { URL } = require('../../env');
const RequestOptions = {
  uri: `${URL}/section/professional/resume`,
  json: true
};


module.exports = [
  (session) => {
    Request(RequestOptions)
      .then(({ text }) => {
        const card = new Builder.HeroCard(session);
        card.title('Experiencia laboral');
        card.subtitle('Estos son todos los lugares donde Fran ha trabajado desde que se graduó');
        card.text(text);
        const message = new Builder.Message();
        message.addAttachment(card);
        session.send(message);
        session.endDialog();
      })
      .catch((error) => {
        session.send('Ups, no soy capaz de encontrar los lugares donde ha trabajado, perdona :s');
        session.endDialog();
      });
  }
];
