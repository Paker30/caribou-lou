'use strict';

const Builder = require('botbuilder');
const Markdownpdf = require('markdown-pdf');
const Redable = require('stream').Readable();
const Request = require('request-promise-native');
const Util = require('util');
const Fs = require('fs');
const { URL } = require('../../env');
const RequestOptionsPersonal = {
  uri: `${URL}/section/personal/resume`,
  json: true
};
const RequestOptionsProfessional = {
  uri: `${URL}/section/professional/resume`,
  json: true
};
const RequestOptionsSkills = {
  uri: `${URL}/section/skills/resume`,
  json: true
};
const RequestOptionsStudies = {
  uri: `${URL}/section/personal/resume`,
  json: true
};
const Personal = Request(RequestOptionsPersonal);
const Professional = Request(RequestOptionsProfessional);
const Skills = Request(RequestOptionsSkills);
const Studies = Request(RequestOptionsStudies);
const Resume = [Personal, Professional, Skills, Studies];

module.exports = [
  (session) => {
    session.send('Aquí está el CV en formato PDF');
    Promise.all(Resume)
      .then(([personal, professional, skills, studies]) => {
        const WritablePDF = Fs.createWriteStream('./resume.pdf');
        const WholeResume = personal.text.concat(professional.text, skills.text, studies.text);
        Fs.writeFileSync('./resume.md', WholeResume);
        Fs.createReadStream('./resume.md')
          .pipe(Markdownpdf())
          .pipe(WritablePDF);

        const msg = new Builder.Message(session);
        const base64 = Buffer.from('./resume.pdf').toString('base64');
        msg.addAttachment({
          contentUrl: Util.format('data:%s;base64,%s', 'aplicattion/pdf', base64),
          name: 'resume.pdf'
        });
        session.send(msg);
        session.endDialog();
      })
      .catch((error) => {
        session.send('Ups, no soy capaz de encontrar sus datos personales, perdona :s');
        session.endDialog();
      });
  }
];
