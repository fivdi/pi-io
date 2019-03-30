'use strict';

const five = require('johnny-five');
const PiIO = require('..');

const board = new five.Board({
  io: new PiIO()
});

board.on('ready', function() {
  const pin = board.io.normalize('GPIO17');
  let writesPerSecond;
  let time;
  let i;

  this.pinMode(pin, five.Pin.OUTPUT);

  time = process.hrtime();

  for (i = 1; i <= 1e7; i += 1) {
    this.digitalWrite(pin, i & 1);
  }

  time = process.hrtime(time);
  writesPerSecond = Math.floor(i / (time[0] + time[1] / 1E9));

  console.log('writes per second', writesPerSecond);
});

