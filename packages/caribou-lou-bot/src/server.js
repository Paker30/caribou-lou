'use strict';

const Restify = require('restify');
const Builder = require('botbuilder');
const { BotConnector } = require('./env');

const Server = Restify.createServer();
const Connector = new Builder.ChatConnector(BotConnector);
const DialogLabels = {
  personal: 'Datos personales',
  studies: 'Estudios',
  work: 'Experiencia Laboral',
  skills: 'Idiomas y habilidades'
};

Server.post('/api/messages', Connector.listen());
const Bot = new Builder.UniversalBot(Connector, [
  (session) => {
    Builder.Prompts.choice(
      session,
      'Hola, soy Oliver, en estos momentos Fran no puede explicarte su CV pero yo puedo ayudarte, ¿qué quieres saber?',
      [DialogLabels.personal, DialogLabels.studies, DialogLabels.work, DialogLabels.skills],
      {
        maxRetries: 3,
        retryPrompt: 'No entiendo que quieres saber, perdona'
      }
    );
  },
  (session, result) => {
    if (!result.response) {
      session.send('Creo que tendrás que volver a preguntarme :( Ahora seguro que sí te entiedo');
      return session.endDialog();
    }

    session.on('error', (error) => {
      session.send(`Algo ha ido mal con tu respuesta :s ${error.message}`);
      session.endDialog();
    });

    switch (result.response.entity) {
      case DialogLabels.personal:
        return session.beginDialog(DialogLabels.personal);
      case DialogLabels.studies:
        return session.beginDialog(DialogLabels.studies);
      case DialogLabels.work:
        return session.beginDialog(DialogLabels.work);
      case DialogLabels.skills:
        return session.beginDialog(DialogLabels.skills);
    }
  }
]);

Bot.dialog(DialogLabels.personal, require('./bot/dialogs/personal'));

Bot.on('error', (e) => {
  console.log('And error ocurred', e);
});

module.exports = Server;
