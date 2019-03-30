'use strict';

// In order for this test program to function correctly nothing should be
// connected to GPIO6.

const assert = require('assert');
const five = require('johnny-five');
const PiIO = require('..');

const board = new five.Board({
  io: new PiIO(),
  repl: false,
  debug: false
});

board.on('ready', function() {
  let callbacks = 0;

  this.pinMode('GPIO6', this.MODES.INPUT);

  this.digitalRead('GPIO6', function (value) {
    callbacks += 1;

    if (callbacks === 1) {
      assert(value === 1, 'expected GPIO6 to have a value of 1');

      // Enable pull-down. Because nothing is connected to GPIO6 this should
      // pull GPIO6 low and result in the digitalRead callback being called
      // with a value of 0.
      this.digitalWrite('GPIO6', 0);
    } else  if (callbacks === 2) {
      assert(value === 0, 'expected GPIO6 to have a value of 0');

      process.exit();
    }
  });

  // Enable pull-up. Because nothing is connected to GPIO6 this should pull
  // GPIO6 high and result in the digitalRead callback being called with a
  // value of 1.
  this.digitalWrite('GPIO6', 1);
});

