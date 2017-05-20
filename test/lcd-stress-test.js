'use strict';

// This is an LCD stress test to determine whether or not there are timing
// issues when using an LCD with pi-io. The test continuously fills the LCD
// with each character as quickly as it can. After the LCD is filled with the
// character '5' the program pauses for one second and then continues.
//
// Initially this test failed and the following issue was created:
// https://github.com/rwaldron/johnny-five/issues/1295
// This issue has since been resolved.

var five = require('johnny-five');
var PiIO = require('..');

var board = new five.Board({
  io: new PiIO()
});

board.on('ready', function() {
  var lcd = new five.LCD({
    // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
    pins: ['GPIO13', 'GPIO19', 'GPIO16', 'GPIO26', 'GPIO20', 'GPIO21'],
    rows: 4,
    cols: 20
  });

  var charCode = 0;

  (function fillDisplay() {
    lcd.cursor(0, 0).print(new Array(20 * 4 + 1).join(String.fromCharCode(charCode)))
    charCode = (charCode + 1) & 0xff;
    setTimeout(fillDisplay, charCode === 0x36 ? 1000 : 0);
  }());
});

