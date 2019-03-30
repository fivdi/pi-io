'use strict';

const five = require('johnny-five');
const PiIO = require('..');

const board = new five.Board({
  io: new PiIO()
});

board.on('ready', function() {
  const led = new five.Led('GPIO17');
  const button = new five.Button('GPIO4');

  button.on('down', function() {
    led.on();
  });

  button.on('up', function() {
    led.off();
  });
});

