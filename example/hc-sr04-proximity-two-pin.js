'use strict';

var five = require('johnny-five');
var PiIO = require('..');

var board = new five.Board({
  io: new PiIO()
});

board.on('ready', function() {
  var proximity = new five.Proximity({
    controller: PiIO.HCSR04, // Custom controller
    triggerPin: 'GPIO23',
    echoPin: 'GPIO24'
  });

  proximity.on("change", function() {
    console.log("cm: ", this.cm);
  });
});

