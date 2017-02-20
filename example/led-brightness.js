'use strict';

var five = require('johnny-five');
var PiIO = require('..');

var board = new five.Board({
  io: new PiIO()
});

board.on('ready', function() {
  var led = new five.Led('GPIO17');

  (function next() {
    led.brightness(20);
    setTimeout(function () {
      led.brightness(255);
      setTimeout(next, 1000);
    }, 1000);
  }());
});

