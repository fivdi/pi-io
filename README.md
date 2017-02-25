# pi-io 

A proof of concept to demonstrate that it's feasible to implement a Linux IO
Plugin for Johnny-Five using [linux-io](https://github.com/fivdi/linux-io).

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
'P1-3', 'GPIO2' | INPUT, OUTPUT, PWM, SERVO | Alternatively for I2C
'P1-5', 'GPIO3' | INPUT, OUTPUT, PWM, SERVO | Alternatively for I2C
'P1-7', 'GPIO4' | INPUT, OUTPUT, PWM, SERVO |
'P1-8', 'GPIO14' | INPUT, OUTPUT, PWM, SERVO |
'P1-10', 'GPIO15' | INPUT, OUTPUT, PWM, SERVO |
'P1-11', 'GPIO17' | INPUT, OUTPUT, PWM, SERVO |
'P1-12', 'GPIO18' | INPUT, OUTPUT, PWM, SERVO |
'P1-13', 'GPIO27' | INPUT, OUTPUT, PWM, SERVO |
'P1-15', 'GPIO22' | INPUT, OUTPUT, PWM, SERVO |
'P1-16', 'GPIO23' | INPUT, OUTPUT, PWM, SERVO |
'P1-18', 'GPIO24' | INPUT, OUTPUT, PWM, SERVO |
'P1-19', 'GPIO10' | INPUT, OUTPUT, PWM, SERVO |
'P1-21', 'GPIO9' | INPUT, OUTPUT, PWM, SERVO |
'P1-22', 'GPIO25' | INPUT, OUTPUT, PWM, SERVO |
'P1-23', 'GPIO11' | INPUT, OUTPUT, PWM, SERVO |
'P1-24', 'GPIO8' | INPUT, OUTPUT, PWM, SERVO |
'P1-26', 'GPIO7' | INPUT, OUTPUT, PWM, SERVO |
'P1-29', 'GPIO5' | INPUT, OUTPUT, PWM, SERVO |
'P1-31', 'GPIO6' | INPUT, OUTPUT, PWM, SERVO |
'P1-32', 'GPIO12' | INPUT, OUTPUT, PWM, SERVO |
'P1-33', 'GPIO13' | INPUT, OUTPUT, PWM, SERVO |
'P1-35', 'GPIO19' | INPUT, OUTPUT, PWM, SERVO |
'P1-36', 'GPIO16' | INPUT, OUTPUT, PWM, SERVO |
'P1-37', 'GPIO26' | INPUT, OUTPUT, PWM, SERVO |
'P1-38', 'GPIO20' | INPUT, OUTPUT, PWM, SERVO |
'P1-40', 'GPIO21' | INPUT, OUTPUT, PWM, SERVO |
'LED0' | OUTPUT | Built-in LED

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

