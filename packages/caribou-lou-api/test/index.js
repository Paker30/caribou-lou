'use strict';

const Lab = require('lab');
const { it, describe, expect } = exports.lab = Lab.script();

//Section to test
process.env.NODE_ENV = 'test';
const hapiServer = require('../src/server');

it('Check it\'s a hapi server', (done) => {

  expect(hapiServer).to.exists();
  done();
});
