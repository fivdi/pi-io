'use strict';

var RangeFinder = require('./range-finder');

// Copied from https://github.com/rwaldron/johnny-five/blob/v0.11.1/lib/fn.js#L6-L22
function toFixed(number, digits) {
  // Guard against error when number is null or undefined
  // Cast result as number
  return +(number || 0).toFixed(digits);
};

// Based on https://github.com/rwaldron/johnny-five/blob/v0.11.1/lib/proximity.js#L170-L212
module.exports.HCSR04 = {
  initialize: {
    value: function(opts, dataHandler) {
      var msToNextRead = 65;

      var rangeFinder = new RangeFinder(
        this.io._pins[this.io.normalize(opts.triggerPin)].gpioNo,
        this.io._pins[this.io.normalize(opts.echoPin)].gpioNo
      );

      var read = function() {
        this.io._pingReadLock(function(release) {
          rangeFinder.pingRead(function(err, microseconds) {
            if (err) {
              this.io.emit('error', err);
            } else {
              dataHandler(microseconds);
            }

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

