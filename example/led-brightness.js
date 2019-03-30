'use strict';

const five = require('johnny-five');
const PiIO = require('..');

const board = new five.Board({
  io: new PiIO()
});

board.on('ready', function() {
  const led = new five.Led('GPIO17');

  (function next() {
    led.brightness(20);
    setTimeout(function () {
      led.brightness(255);
      setTimeout(next, 1000);
    }, 1000);
  }());
});

