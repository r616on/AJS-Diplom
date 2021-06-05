import genAvailableAttack from "../genAvailableAttack";
import genAvailableTravel from "../genAvailableTravel";

const data = [
  [0, 2, [1, 2, 8, 9, 10, 16, 17, 18]],
  [9, 2, [0, 1, 2, 3, 8, 10, 11, 16, 17, 18, 19, 24, 25, 26, 27]],
  [26, 2, [9, 11, 16, 20, 32, 36, 41, 43]],
  [27, 2, [10, 12, 17, 21, 33, 37, 42, 44]],
  [7, 2, [13, 22]],
  [37, 2, [20, 22, 27, 31, 43, 47, 52, 54]],
  [54, 2, [37, 39, 44, 60]],
  [0, 4, [10, 11, 12, 17, 19, 20, 25, 26, 28, 33, 34, 35]],
  [7, 4, [11, 12, 13, 19, 20, 22, 27, 29, 30, 36, 37, 38]],
  [
    14,
    4,
    [2, 3, 4, 18, 19, 20, 26, 27, 29, 31, 34, 36, 37, 39, 43, 44, 45, 47],
  ],
  [
    21,
    4,
    [
      1, 2, 4, 6, 9, 10, 11, 15, 25, 26, 27, 31, 33, 34, 36, 38, 41, 43, 44, 46,
      47, 50, 51, 52, 54, 55,
    ],
  ],
  [9, 4, [3, 4, 5, 19, 20, 21, 24, 26, 28, 29, 32, 34, 35, 37, 40, 42, 43, 44]],
  [
    18,
    4,
    [
      1, 3, 5, 6, 8, 12, 13, 14, 24, 28, 29, 30, 33, 35, 37, 38, 40, 41, 43, 44,
      46, 48, 49, 51, 52, 53,
    ],
  ],
  [
    27,
    4,
    [
      1, 2, 4, 5, 7, 8, 10, 12, 14, 15, 16, 17, 21, 22, 23, 32, 33, 37, 38, 39,
      40, 42, 44, 46, 47, 49, 50, 52, 53, 55, 56, 57, 58, 60, 61, 62,
    ],
  ],
  [
    36,
    4,
    [
      1, 2, 3, 5, 6, 7, 8, 10, 11, 13, 14, 16, 17, 19, 21, 23, 24, 25, 26, 30,
      31, 40, 41, 42, 46, 47, 48, 49, 51, 53, 55, 56, 58, 59, 61, 62,
    ],
  ],
  [
    28,
    4,
    [
      0, 2, 3, 5, 6, 8, 9, 11, 13, 15, 16, 17, 18, 22, 23, 32, 33, 34, 38, 39,
      40, 41, 43, 45, 47, 48, 50, 51, 53, 54, 57, 58, 59, 61, 62, 63,
    ],
  ],
  [
    35,
    4,
    [
      0, 1, 2, 4, 5, 6, 9, 10, 12, 13, 15, 16, 18, 20, 22, 23, 24, 25, 29, 30,
      31, 40, 41, 45, 46, 47, 48, 50, 52, 54, 55, 57, 58, 60, 61, 63,
    ],
  ],
];

test.each(data)(
  "Test available cells func 'genAvailableAttack' Position = %s , level = %s ",
  (index, cells, expected) => {
    let dataExp = Array.from(
      new Set(
        genAvailableTravel(index, cells)
          .concat(expected)
          .sort((a, b) => {
            if (a > b) return 1;
            if (a == b) return 0;
            if (a < b) return -1;
          })
      )
    );
    expect(genAvailableAttack(index, cells)).toEqual(dataExp);
  }
);
