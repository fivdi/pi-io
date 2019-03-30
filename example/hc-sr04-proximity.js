'use strict';

const five = require('johnny-five');
const PiIO = require('..');

const board = new five.Board({
  io: new PiIO()
});

board.on('ready', function() {
  const proximity = new five.Proximity({
    controller: 'HCSR04',
    pin: 'GPIO25'
  });

  proximity.on('data', function() {
    console.log('cm: ', this.cm);
  });
});

