# Implementation Notes

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
 * Ping
   * Implementation based on the [pigpio C library](https://github.com/joan2937/pigpio) using the [pigpio C library wrapper](https://github.com/fivdi/pigpio)

