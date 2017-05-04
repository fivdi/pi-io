'use strict';

var LinuxIO = require('linux-io'),
  pigpio = require('pigpio'),
  Gpio = pigpio.Gpio,
  util = require('util'),
  pins = require('./pins'),
  RangeFinder = require('./range-finder');

function PiIO() {
  LinuxIO.call(this, {
    pins: pins,
    defaultI2cBus: 1,
    defaultLed: 'LED0'
  });

  pigpio.initialize();

  // After explicitly calling pigpio.initialize wait 50ms for pigpio to become
  // ready for usage. This delay is necessary for alerts to function correctly.
  // See https://github.com/joan2937/pigpio/issues/127
  setTimeout(function () {
    this.emit('connect');
    this.emit('ready');
  }.bind(this), 100);
}
util.inherits(PiIO, LinuxIO);

PiIO.prototype._pinPigpioMode = function(pinData, pigpioMode) {
  if (!pinData.gpio) {
    pinData.gpio = new Gpio(pinData.gpioNo, {mode: pigpioMode});
  } else {
    pinData.gpio.mode(pigpioMode);
  }
};

PiIO.prototype._pinModeInput = function(pinData) {
  this._pinPigpioMode(pinData, Gpio.INPUT);
};

PiIO.prototype._pinModeOutput = function(pinData) {
  this._pinPigpioMode(pinData, Gpio.OUTPUT);
};

PiIO.prototype._pinModePwm = function(pinData) {
  this._pinPigpioMode(pinData, Gpio.OUTPUT);
};

PiIO.prototype._pinModeServo = function(pinData) {
  this._pinPigpioMode(pinData, Gpio.OUTPUT);

  pinData.servoConfig = {
    min: 500,
    max: 2500
  };
};

PiIO.prototype._digitalReadSync = function(pinData) {
  return pinData.gpio.digitalRead();
};

PiIO.prototype._digitalWriteSync = function(pinData, value) {
  pinData.gpio.digitalWrite(value);
};

PiIO.prototype._pwmWriteSync = function(pinData, value) {
  pinData.gpio.pwmWrite(value >> 0);
};

PiIO.prototype._servoWriteSync = function(pinData, value) {
  var min = pinData.servoConfig.min,
    max = pinData.servoConfig.max;

  pinData.gpio.servoWrite((min + (value / 180) * (max - min)) >> 0);
};

PiIO.prototype._pingRead = function(pinData, callback) {
  if (!pinData.custom.rangeFinder) {
    pinData.custom.rangeFinder = new RangeFinder(pinData.gpioNo);
  }

  pinData.custom.rangeFinder.pingRead(callback);
};

module.exports = PiIO;

