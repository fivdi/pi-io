'use strict';

var five = require('johnny-five');
var PiIO = require('..');

var board = new five.Board({
  io: new PiIO()
});

board.on('ready', function() {
  var led = new five.Led('GPIO17');

  led.on();
  led.fade(0, 2000);
});

