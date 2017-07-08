'use strict';

var LinuxIO = require('linux-io'),
  pigpio = require('pigpio'),
  Gpio = pigpio.Gpio,
  util = require('util'),
  pins = require('./pins'),
  controller = require('./controller'),
  RangeFinder = require('./range-finder');

function PiIO() {
  LinuxIO.call(this, {
    name: 'Pi-IO',
    pins: pins,
    defaultI2cBus: 1,
    defaultLed: 'LED0'
  });

  pigpio.initialize();

  // After explicitly calling pigpio.initialize wait 100ms for pigpio to become
  // ready for usage. This delay is necessary for alerts to function correctly.
  // See https://github.com/joan2937/pigpio/issues/127
  // Update: This issue was fixed with pigpio V63 in May 2017. When Raspbian is
  // updated to include pigpio V63 the timeout here can be removed.
  setTimeout(function () {
    this.emit('connect');
    this.emit('ready');
  }.bind(this), 100);
}
util.inherits(PiIO, LinuxIO);

PiIO.prototype._pinPigpioMode = function(pinData, pigpioMode) {
  if (!pinData.gpio) {
    pinData.gpio = new Gpio(pinData.gpioNo, {
      mode: pigpioMode,
      pullUpDown : Gpio.PUD_OFF
    });
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

PiIO.prototype._enablePullUpResistor = function(pinData) {
  pinData.gpio.pullUpDown(Gpio.PUD_UP);
};

PiIO.prototype._enablePullDownResistor = function(pinData) {
  pinData.gpio.pullUpDown(Gpio.PUD_DOWN);
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

PiIO.HCSR04 = controller.HCSR04;

module.exports = PiIO;

