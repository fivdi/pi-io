'use strict';

const five = require('johnny-five');
const PiIO = require('..');

const board = new five.Board({
  io: new PiIO()
});

board.on('ready', function() {
  const servo = new five.Servo({
    pin: 'P1-19',
    pwmRange: [600, 2300]
  });

  (function next() {
    servo.to(0);
    setTimeout(function () {
      servo.to(180);
      setTimeout(next, 2000);
    }, 2000);
  }());
});

