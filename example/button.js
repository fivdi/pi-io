'use strict';

const five = require('johnny-five');
const PiIO = require('..');

const board = new five.Board({
  io: new PiIO()
});

board.on('ready', function() {
  const button = new five.Button('GPIO4');

  button.on('down', function() {
    console.log('down');
  });

  button.on('up', function() {
    console.log('up');
  });
});

