import { calcTileType } from '../utils';

const boardSize = 8;
const data = [
  [0, [boardSize], 'top-left'],
  [1, [boardSize], 'top'],
  [7, [boardSize], 'top-right'],
  [15, [boardSize], 'right'],
  [16, [boardSize], 'left'],
  [56, [boardSize], 'bottom-left'],
  [62, [boardSize], 'bottom'],
  [63, [boardSize], 'bottom-right'],
  [9, [boardSize], 'center'],
];
test.each(data)(
  'Test decorative border frame function calcTileType index=%s',
  (index, bS, expected) => {
    expect(calcTileType(index, bS)).toBe(expected);
  },
);
