'use strict';

const Builder = require('botbuilder');
const Request = require('request-promise-native');
const { URL } = require('../../env');


module.exports = [
  (session) => {
    session.send('Aquí tienes su nombre completo, dirección y sus datos de contacto por si necesitas contactar con Fran');
    Request(`${URL}/section/personal/resume`)
    .then((personalSection) => {
      session.send(personalSection);
      session.endDialog();
    })
    .catch((error) => {
      session.send('Ups, no soy capaz de encontrar sus datos personales, perdona :s');
      session.endDialog();
    });
  }
];
