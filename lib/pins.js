'use strict';

module.exports = [{
  ids: ['P1-7', 'GPIO4'],
  gpioNo: 4,
  modes: [0, 1, 3, 4]
}, {
  ids: ['P1-11', 'GPIO17'],
  gpioNo: 17,
  modes: [0, 1, 3, 4]
}, {
  ids: ['P1-13', 'GPIO27'],
  gpioNo: 27,
  modes: [0, 1, 3, 4]
}, {
  ids: ['P1-40', 'GPIO21'],
  gpioNo: 21,
  modes: [0, 1, 3, 4]
}, {
  ids: ['LED0'],
  ledPath: '/sys/class/leds/led0',
  modes: [1]
}];

