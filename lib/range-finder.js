'use strict';

var Gpio = require('pigpio').Gpio;

function RangeFinder(triggerGpioNo, echoGpioNo) {
  if (!(this instanceof RangeFinder)) {
    return new RangeFinder(triggerGpioNo, echoGpioNo);
  }

  if (triggerGpioNo === echoGpioNo || typeof(echoGpioNo) !== 'number') {
    this._singlePin = true;
    echoGpioNo = triggerGpioNo;
  } else {
    this._singlePin = false;
  }

  this._triggerGpio = new Gpio(triggerGpioNo, {
    mode: Gpio.OUTPUT,
    pullUpDown: Gpio.PUD_OFF,
    alert: this._singlePin
  });

  if (this._singlePin) {
    this._echoGpio = this._triggerGpio;
  } else {
    this._echoGpio = new Gpio(echoGpioNo, {
      mode: Gpio.INPUT,
      pullUpDown: Gpio.PUD_OFF,
      alert: true
    });
  }

  this._callback = undefined;
  this._startTick = undefined;
  this._ignoreAlerts = false;
  this._timeout = undefined;

  this._triggerGpio.digitalWrite(0);

  // If a single pin is used for both trigger and echo there will be alert
  // events for trigger pulses and echo pulses. Trigger pulses are ignored.
  this._echoGpio.on('alert', function (level, tick) {
    var endTick,
      diff;

    if (this._ignoreAlerts) {
      return;
    }

    // level === 0 implies falling edge of pulse.
    // level === 1 implies rising edge of pulse.
    if (level === 1) {
      this._startTick = tick;
    } else if (this._startTick === undefined) {
      // The rising edge of a pulse was not detected. Ignore alerts and
      // allow the 250ms timeout started in pingRead to occur.
      this._ignoreAlerts = true;
    } else {
      endTick = tick;

      // Determine pulse width in microseconds (unsigned 32 bit arithmetic.)
      diff = (endTick >> 0) - (this._startTick >> 0);

      // Ignore short pulses less than 20 microseconds wide.
      // Short pulses are usually trigger pulses.
      if (diff > 20) {
        if (diff > 40000) {
          // Assume the hc-sr04 timed out. If the hc-sr04 sends a pulse and
          // can't detect it, it will timeout after approx. 200000
          // microseconds. To recover, ignore alerts and allow the 250ms
          // timeout started in pingRead to occur.
          this._ignoreAlerts = true;
        } else {
          clearTimeout(this._timeout);
          this._callback(null, diff);
        }
      }
    }
  }.bind(this));
}

RangeFinder.prototype.pingRead = function (callback) {
  this._callback = callback;

  (function trigger() {
    this._startTick = undefined;
    this._ignoreAlerts = false;

    if (this._singlePin) {
      this._triggerGpio.mode(Gpio.OUTPUT);
    }

    this._triggerGpio.trigger(10, 1);

    if (this._singlePin) {
      this._triggerGpio.mode(Gpio.INPUT);
    }

    this._timeout = setTimeout(function() {
      // Some hc-sr04 sensors appear to hang and don't timeout after 200000
      // microseconds. Setting the pin-mode to output appears to force the
      // timeout to occur.
      if (this._singlePin) {
        this._triggerGpio.mode(Gpio.OUTPUT);
      }

      setTimeout(function () {
        trigger.bind(this)();
      }.bind(this), 100);
    }.bind(this), 250);
  }.bind(this)());
};

module.exports = RangeFinder;

