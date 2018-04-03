'use strict';
const RestifyServer = require('./server');
const { PORT } = require('./env');

RestifyServer.listen(PORT, () => {
  console.log('%s listening to %s', RestifyServer.name, RestifyServer.url);
});
