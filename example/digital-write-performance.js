'use strict';

var five = require('johnny-five');
var PiIO = require('..');

var board = new five.Board({
  io: new PiIO()
});

board.on('ready', function() {
  var writesPerSecond,
    time,
    i;

  this.pinMode('GPIO17', five.Pin.OUTPUT);

  time = process.hrtime();

  for (i = 1; i <= 1e7; i += 1) {
    this.digitalWrite('GPIO17', i & 1);
  }

  time = process.hrtime(time);
  writesPerSecond = Math.floor(i / (time[0] + time[1] / 1E9));

  console.log('writes per second', writesPerSecond);
});

