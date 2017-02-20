'use strict';

var five = require('johnny-five');
var PiIO = require('..');

var board = new five.Board({
  io: new PiIO()
});

board.on('ready', function() {
  var button = new five.Button('GPIO4');

  button.on('down', function() {
    console.log('down');
  });

  button.on('up', function() {
    console.log('up');
  });
});

