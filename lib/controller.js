'use strict';

const RangeFinder = require('./range-finder');

// Copied from https://github.com/rwaldron/johnny-five/blob/v0.11.1/lib/fn.js#L6-L22
function toFixed(number, digits) {
  // Guard against error when number is null or undefined
  // Cast result as number
  return +(number || 0).toFixed(digits);
}

// Based on https://github.com/rwaldron/johnny-five/blob/v0.11.1/lib/proximity.js#L170-L212
module.exports.HCSR04 = {
  initialize: {
    value: function(opts, dataHandler) {
      const msToNextRead = 65;

      const rangeFinder = new RangeFinder(
        this.io._pins[this.io.normalize(opts.triggerPin)].gpioNo,
        this.io._pins[this.io.normalize(opts.echoPin)].gpioNo
      );

      const read = function() {
        // If an attempt is made to measure proximity with two or more HC-SR04
        // sensors concurrently the sound pulses from the different sensors
        // can interfere with each other. The lock here prevents this from
        // happening.
        this.io._pingReadLock(function(release) {
          // Note that the pingRead callback does not have an err argument. If
          // pingRead can't measure proximity it calls the callback with the
          // microseconds argument set to 0.
          rangeFinder.pingRead(function(microseconds) {
            dataHandler(microseconds);

            setTimeout(read, msToNextRead);

            release();
          }.bind(this));
        }.bind(this));
      }.bind(this);

      read();
    }
  },
  toCm: {
    value: function(raw) {
      return toFixed(raw / 29.1 / 2, 3);
    }
  }
};

