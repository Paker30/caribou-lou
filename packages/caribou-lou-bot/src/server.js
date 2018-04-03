'use strict';

const Restify = require('restify');
const Builder = require('botbuilder');
const { BotConnector } = require('./env');

const Server = Restify.createServer();
const Connector = new Builder.ChatConnector(BotConnector);
const DialogLabels = {
  personal: 'Datos personales',
  studies: 'Estudios',
  professional: 'Experiencia Laboral',
  skills: 'Idiomas y habilidades',
  support: 'Ayuda',
  pdf: 'pdf'
};

Server.post('/api/messages', Connector.listen());
const Bot = new Builder.UniversalBot(Connector, [
  (session) => {
    Builder.Prompts.choice(
      session,
      'Hola, soy Oliver, en estos momentos Fran no puede explicarte su CV pero yo puedo ayudarte, ¿qué quieres saber?',
      [DialogLabels.personal, DialogLabels.studies, DialogLabels.skills, DialogLabels.professional],
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
      case DialogLabels.skills:
        return session.beginDialog(DialogLabels.skills);
      case DialogLabels.professional:
        return session.beginDialog(DialogLabels.professional);
      case DialogLabels.pdf:
        return session.beginDialog(DialogLabels.pfd);
    }
  },
  (session, result) => {
    session.send(`Si deseas saber más u obtener más información, solo pregunta por ello. Sino, ha sido un placer ayudarte :)`);
    session.endDialog();
  }
]);

Bot.dialog(DialogLabels.personal, require('./bot/dialogs/personal')).triggerAction({
  matches: [/personal/i]
});
Bot.dialog(DialogLabels.studies, require('./bot/dialogs/studies')).triggerAction({
  matches: [/estudios/i]
});
Bot.dialog(DialogLabels.skills, require('./bot/dialogs/skills')).triggerAction({
  matches: [/habilidades/i]
});
Bot.dialog(DialogLabels.professional, require('./bot/dialogs/professional')).triggerAction({
  matches: [/experiencia/i]
});
Bot.dialog(DialogLabels.pdf, require('./bot/dialogs/toPDF')).triggerAction({
  matches: [/pdf/i]
});
Bot.dialog(DialogLabels.support, require('./bot/dialogs/support')).triggerAction(
  {matches: [/saber más/i, /ayuda/i, /cv/i]}
);

Bot.on('error', (e) => {
  console.log('And error ocurred', e);
});

module.exports = Server;
