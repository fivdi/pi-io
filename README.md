# pi-io 

A proof of concept to demonstrate that it's feasible to implement a Linux IO
Plugin for Johnny-Five using [linux-io](https://github.com/fivdi/linux-io).
linux-io supports the following features:

 * Digital IO
   * Implementation based on the [GPIO sysfs interface](https://www.kernel.org/doc/Documentation/gpio/sysfs.txt) using [onoff](https://github.com/fivdi/onoff)
 * I2C
   * Implementation based on the [/dev interface](https://www.kernel.org/doc/Documentation/i2c/dev-interface) using [i2c-bus](https://github.com/fivdi/i2c-bus)
 * Built-in LEDs
   * Implementation based on the [LED sysfs interface](https://www.kernel.org/doc/Documentation/leds/leds-class.txt) using [led.js](https://github.com/fivdi/linux-io/blob/master/lib/led.js)

pi-io extends and overrides linux-io to provide the following features:

 * Digital IO
   * The default implementation provided by linux-io is overridden to provide a more performant implementation based on the [pigpio C library](https://github.com/joan2937/pigpio) using the [pigpio C library wrapper](https://github.com/fivdi/pigpio)
 * PWM and Servo pulses on any number of GPIOs simultaneously
   * Implementation based on the [pigpio C library](https://github.com/joan2937/pigpio) using the [pigpio C library wrapper](https://github.com/fivdi/pigpio)

Tested on a Raspberry Pi 3 with Node.js v6.9.5.

## Installation

```
npm install pi-io
```

## Johnny-Five Features Supported

The Johnny-Five features supported by a platform are summarized in tables on
the [Platform Support](http://johnny-five.io/platform-support/) page. The
features supported by pi-io shown in the following tables:

Feature | Support
:--- | :---
Analog Read | no
Digital Read | yes
Digital Write | yes
PWM | yes
Servo | yes
I2C | yes
One Wire | no
Stepper | no
Serial/UART | no
DAC | no
Ping | no

Pin ID | Supported Modes | Comments
:--- | :--- | :---
P1-3 or GPIO2 | INPUT, OUTPUT, PWM, SERVO | Alternatively I2C SDA1
P1-5 or GPIO3 | INPUT, OUTPUT, PWM, SERVO | Alternatively I2C SCL1
P1-7 or GPIO4 | INPUT, OUTPUT, PWM, SERVO |
P1-8 or GPIO14 | INPUT, OUTPUT, PWM, SERVO |
P1-10 or GPIO15 | INPUT, OUTPUT, PWM, SERVO |
P1-11 or GPIO17 | INPUT, OUTPUT, PWM, SERVO |
P1-12 or GPIO18 | INPUT, OUTPUT, PWM, SERVO |
P1-13 or GPIO27 | INPUT, OUTPUT, PWM, SERVO |
P1-15 or GPIO22 | INPUT, OUTPUT, PWM, SERVO |
P1-16 or GPIO23 | INPUT, OUTPUT, PWM, SERVO |
P1-18 or GPIO24 | INPUT, OUTPUT, PWM, SERVO |
P1-19 or GPIO10 | INPUT, OUTPUT, PWM, SERVO |
P1-21 or GPIO9 | INPUT, OUTPUT, PWM, SERVO |
P1-22 or GPIO25 | INPUT, OUTPUT, PWM, SERVO |
P1-23 or GPIO11 | INPUT, OUTPUT, PWM, SERVO |
P1-24 or GPIO8 | INPUT, OUTPUT, PWM, SERVO |
P1-26 or GPIO7 | INPUT, OUTPUT, PWM, SERVO |
P1-29 or GPIO5 | INPUT, OUTPUT, PWM, SERVO |
P1-31 or GPIO6 | INPUT, OUTPUT, PWM, SERVO |
P1-32 or GPIO12 | INPUT, OUTPUT, PWM, SERVO |
P1-33 or GPIO13 | INPUT, OUTPUT, PWM, SERVO |
P1-35 or GPIO19 | INPUT, OUTPUT, PWM, SERVO |
P1-36 or GPIO16 | INPUT, OUTPUT, PWM, SERVO |
P1-37 or GPIO26 | INPUT, OUTPUT, PWM, SERVO |
P1-38 or GPIO20 | INPUT, OUTPUT, PWM, SERVO |
P1-40 or GPIO21 | INPUT, OUTPUT, PWM, SERVO |
LED0 | OUTPUT | Built-in LED

## Usage

Pluse an LED connected to GPIO17:

```js
var five = require('johnny-five');
var PiIO = require('pi-io');

var board = new five.Board({
  io: new PiIO()
});

board.on('ready', function() {
  var led = new five.Led('GPIO17');

  led.pulse(1000);
});
```

Rotate a continuous servo connected to GPIO27 clockwise:

```js
var five = require('johnny-five');
var PiIO = require('pi-io');

var board = new five.Board({
  io: new PiIO()
});

board.on('ready', function() {
  var servo = new five.Servo({
    pin: 'GPIO27',
    type: "continuous"
  });

  servo.cw(0.8);
});
```

## Examples

Additional examples can be found in the
[example directory](https://github.com/fivdi/pi-io/tree/master/example).

