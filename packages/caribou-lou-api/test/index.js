'use strict';

const { expect } = require('code');
const Lab = require('lab');
const { it, describe, test } = exports.lab = Lab.script();

//Section to test
process.env.NODE_ENV = 'test';
const hapiServer = require('../src/server');

it('Check it\'s a hapi server', () => {

  expect(hapiServer).to.exists();
});
