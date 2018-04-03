'use strict';

const Builder = require('botbuilder');
const DialogLabels = {
  personal: 'Datos personales',
  studies: 'Estudios',
  professional: 'Experiencia Laboral',
  skills: 'Idiomas y habilidades',
  support: 'Ayuda'
};

module.exports = [
  (session) => {
    const Message = '¿Quieres saber algo más?, dime que quieres saber';
    Builder.Prompts.choice(
      session,
      '¿Quieres saber algo más?, dime que quieres saber',
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
    }
  },
  (session, result) => {
    session.endDialog();
  }
];
