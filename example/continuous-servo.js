'use strict';

const five = require('johnny-five');
const PiIO = require('..');

const board = new five.Board({
  io: new PiIO()
});

board.on('ready', function() {
  const servo = new five.Servo({
    pin: 'GPIO27',
    type: 'continuous'
  });

  servo.cw(0.8);
});

