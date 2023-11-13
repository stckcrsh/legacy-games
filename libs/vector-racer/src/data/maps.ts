export const rectangle = {
  name: 'rectangle',
  paths: [
    [
      [1, 1],
      [1, 30],
      [59, 30],
      [59, 1],
      [1, 1],
    ],
    [
      [9, 12],
      [9, 19],
      [50, 19],
      [50, 12],
      [9, 12],
    ],
  ],
  corners: [],
  start: {
    line: [
      [30, 1],
      [30, 12],
    ],
    direction: [1, 0],
    positions: [[30, 7]],
  },
};

export const small = {
  name: 'small',
  paths: [
    [
      [1, 1],
      [1, 30],
      [30, 30],
      [30, 1],
      [1, 1],
    ],
    [
      [13, 13],
      [17, 13],
      [17, 17],
      [13, 17],
      [13, 13],
    ],
  ],
  corners: [],
  start: {
    line: [
      [15, 1],
      [15, 13],
    ],
    direction: [1, 0],
    positions: [[15, 6]],
  },
};

export const basic = {
  name: 'basic',
  paths: [
    [
      [18, 0],
      [20, 0.25],
      [23, 1.5],
      [25, 3.85],
      [28, 6],
      [31, 7],
      [35, 7],
      [35, 17],
      [30, 22],
      [1, 22],
      [1, 17],
      [6, 12.5],
      [1, 9],
      [1, 1],
      [7, 1],
      [8, 0],
      [18, 0],
    ],
    [
      [18, 3],
      [20, 4],
      [22, 6],
      [25, 8],
      [28, 9.5],
      [31, 10],
      [31, 16],
      [29, 18],
      [5, 18],
      [10, 14],
      [10, 12],
      [4, 7],
      [4, 4],
      [5, 4],
      [7, 3],
      [18, 3],
    ],
  ],
  corners: [],
  start: {
    line: [
      [15, 0],
      [15, 3],
    ],
    direction: [1, 0],
    positions: [[15, 1.5]],
  },
};

export const maps = {
  rectangle,
  small,
  basic,
};