'use strict';

var Gpio = require('pigpio').Gpio;

function RangeFinder(gpio) {
  if (!(this instanceof RangeFinder)) {
    return new RangeFinder(gpio);
  }

  this._gpio = gpio;
  this._callback = undefined;
  this._startTick = undefined;
  this._ignoreAlerts = false;
  this._timeout = undefined;

  this._gpio.digitalWrite(0);

  // As one pin is used for both trigger and echo there will be alert events
  // for the trigger pulses and the echo pulses.
  this._gpio.on('alert', function (level, tick) {
    var endTick,
      diff;

    if (this._ignoreAlerts) {
      return;
    }

    if (level === 1) {
      this._startTick = tick;
    } else {
      endTick = tick;
          
      if (this._startTick === undefined) {
        // We missed the rising edge of a pulse. Ignore alerts and allow the
        // 250ms timeout started in pingRead to occur.
        this._ignoreAlerts = true;
        return;
      }

      // Determine pulse width in microseconds (unsigned 32 bit arithmetic.)
      diff = (endTick >> 0) - (this._startTick >> 0);

      // Ignore short pulses. The short pulses are usually the trigger pulses.
      if (diff > 20) {
        if (diff > 40000) {
          // The hc-sr04 timed out. Ignore alerts and allow the 250ms timeout
          // started in pingRead to occur.
          this._ignoreAlerts = true;
          return;
        }

        clearTimeout(this._timeout);

        this._callback(null, diff);
      }
    }
  }.bind(this));
}

RangeFinder.prototype.pingRead = function (callback) {
  this._callback = callback;

  (function trigger() {
    this._startTick = undefined;
    this._ignoreAlerts = false;

    this._gpio.mode(Gpio.OUTPUT);
    this._gpio.trigger(10, 1);
    this._gpio.mode(Gpio.INPUT);

    this._timeout = setTimeout(function() {
      trigger.bind(this)();
    }.bind(this), 250);
  }.bind(this)());
};

module.exports = RangeFinder;

