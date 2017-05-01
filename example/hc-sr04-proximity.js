'use strict';

var five = require('johnny-five');
var PiIO = require('..');

var board = new five.Board({
  io: new PiIO()
});

board.on('ready', function() {
  var proximity = new five.Proximity({
    controller: 'HCSR04',
    pin: 'GPIO25'
  });

  proximity.on("data", function() {
    console.log("cm: ", this.cm);
  });
});

