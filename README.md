# Pi-IO

A proof of concept to demonstrate that it's feasible to implement a Raspberry
Pi IO Plugin for Johnny-Five using
[Linux-IO](https://github.com/fivdi/linux-io).

Tested on a Raspberry Pi 4 Model B with Node.js v16.0.0. Should function with
Node.js v10 or higher.

## Installation

#### Step 1 - Install the pigpio C library

The [pigpio C library](https://github.com/joan2937/pigpio) is a prerequisite
for pi-io.

Run the following command to determine which version of the pigpio C library
is installed:

```
pigpiod -v
```

For the Raspberry Pi Zero, 1, 2 and 3 V41 or higher of the pigpio C library is
required. For the Raspberry Pi 4 V69 or higher is required.

If the pigpio C library is not installed or if the installed version is too
old, the latest version can be installed with the following commands:

```
sudo apt-get update
sudo apt-get install pigpio
```

Alternative installation instructions for the pigpio C library can be found
[here](http://abyz.me.uk/rpi/pigpio/download.html).

**Warning:** The pigpio C library contains a number of utilities. One of these
utilities is pigpiod which launches the pigpio C library as a daemon. This
utility should not be used as the pi-io uses the pigpio C library directly.

#### Step 2 - Install the pi-io Node.js package

```
npm install pi-io
```

## Johnny-Five Features Supported

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
Ping | yes <sup>*)</sup>

*) Ping was tested with three HC-SR04 proximity sensors with varying degrees
of success. One sensor functioned as expected. The second didn't timeout as
it should but it's was possible to workaround the issue with software. The
third sensor didn't function. The issues may be related to the fact that a
single pin is used for both trigger and echo.

To workaround these issues a controller was implemented that allows separate
pins to be used for trigger and echo. The same three HC-SR04 proximity sensors
functioned well with this controller.

## Supported Pins

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

### Pluse an LED connected to GPIO17

<img src="https://raw.githubusercontent.com/fivdi/pi-io/master/doc/led.png">

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

### Rotate a continuous servo connected to GPIO27 clockwise

<img src="https://raw.githubusercontent.com/fivdi/pi-io/master/doc/continuous-servo.png">

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

### Measure proximity with a HC-SR04 using separate pins for trigger and echo

<img src="https://raw.githubusercontent.com/fivdi/pi-io/master/doc/hc-sr04-two-pin.png">

```js
var five = require('johnny-five');
var PiIO = require('pi-io');

var board = new five.Board({
  io: new PiIO()
});

board.on('ready', function() {
  var proximity = new five.Proximity({
    controller: PiIO.HCSR04, // Custom controller
    triggerPin: 'GPIO23',
    echoPin: 'GPIO24'
  });

  proximity.on("change", function() {
    console.log("cm: ", this.cm);
  });
});
```

### Measure proximity with a HC-SR04 connected to GPIO25

Note that this circuit uses a single pin for trigger and echo. Whether or not
this functions correctly appears to be highly dependent on the particular
HC-SR04 sensor being used. The circuit shown above that uses separate pins for
trigger and echo is far more reliable.

<img src="https://raw.githubusercontent.com/fivdi/pi-io/master/doc/hc-sr04.png">

```js
var five = require('johnny-five');
var PiIO = require('pi-io');

var board = new five.Board({
  io: new PiIO()
});

board.on('ready', function() {
  var proximity = new five.Proximity({
    controller: 'HCSR04',
    pin: 'GPIO25'
  });

  proximity.on("data", function() {
    console.log("cm: ", this.cm);
  });
});
```

## Examples

Additional examples can be found in the
[example directory](https://github.com/fivdi/pi-io/tree/master/example).

