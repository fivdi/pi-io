'use strict';

module.exports = [
  /* P1_1 - 3V3 */
  /* P1_2 - 5V */
  { ids: ['P1-3', 'GPIO2'], gpioNo: 2, modes: [0, 1, 3, 4] },
  /* P1_4 - 5V */
  { ids: ['P1-5', 'GPIO3'], gpioNo: 3, modes: [0, 1, 3, 4] },
  /* P1_6 - Ground */
  { ids: ['P1-7', 'GPIO4'], gpioNo: 4, modes: [0, 1, 3, 4] },
  { ids: ['P1-8', 'GPIO14'], gpioNo: 14, modes: [0, 1, 3, 4] },
  /* P1_9 - Ground */
  { ids: ['P1-10', 'GPIO15'], gpioNo: 15, modes: [0, 1, 3, 4] },
  { ids: ['P1-11', 'GPIO17'], gpioNo: 17, modes: [0, 1, 3, 4] },
  { ids: ['P1-12', 'GPIO18'], gpioNo: 18, modes: [0, 1, 3, 4] },
  { ids: ['P1-13', 'GPIO27'], gpioNo: 27, modes: [0, 1, 3, 4] },
  /* P1_14 - Ground */
  { ids: ['P1-15', 'GPIO22'], gpioNo: 22, modes: [0, 1, 3, 4] },
  { ids: ['P1-16', 'GPIO23'], gpioNo: 23, modes: [0, 1, 3, 4] },
  /* P1_17 - 3V3 */
  { ids: ['P1-18', 'GPIO24'], gpioNo: 24, modes: [0, 1, 3, 4] },
  { ids: ['P1-19', 'GPIO10'], gpioNo: 10, modes: [0, 1, 3, 4] },
  /* P1_20 - Ground */
  { ids: ['P1-21', 'GPIO9'], gpioNo: 9, modes: [0, 1, 3, 4] },
  { ids: ['P1-22', 'GPIO25'], gpioNo: 25, modes: [0, 1, 3, 4] },
  { ids: ['P1-23', 'GPIO11'], gpioNo: 11, modes: [0, 1, 3, 4] },
  { ids: ['P1-24', 'GPIO8'], gpioNo: 8, modes: [0, 1, 3, 4] },
  /* P1_25 - Ground */
  { ids: ['P1-26', 'GPIO7'], gpioNo: 7, modes: [0, 1, 3, 4] },
  /* P1_27 - ID_SD */
  /* P1_28 - ID_SC */
  { ids: ['P1-29', 'GPIO5'], gpioNo: 5, modes: [0, 1, 3, 4] },
  /* P1_30 - Ground */
  { ids: ['P1-31', 'GPIO6'], gpioNo: 6, modes: [0, 1, 3, 4] },
  { ids: ['P1-32', 'GPIO12'], gpioNo: 12, modes: [0, 1, 3, 4] },
  { ids: ['P1-33', 'GPIO13'], gpioNo: 13, modes: [0, 1, 3, 4] },
  /* P1_34 - Ground */
  { ids: ['P1-35', 'GPIO19'], gpioNo: 19, modes: [0, 1, 3, 4] },
  { ids: ['P1-36', 'GPIO16'], gpioNo: 16, modes: [0, 1, 3, 4] },
  { ids: ['P1-37', 'GPIO26'], gpioNo: 26, modes: [0, 1, 3, 4] },
  { ids: ['P1-38', 'GPIO20'], gpioNo: 20, modes: [0, 1, 3, 4] },
  /* P1_39 - Ground */
  { ids: ['P1-40', 'GPIO21'], gpioNo: 21, modes: [0, 1, 3, 4] },

  { ids: ['LED0'], ledPath: '/sys/class/leds/led0', modes: [1] }
];

