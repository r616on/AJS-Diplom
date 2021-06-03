import genAvailableFeld from "../genAvailableFeld";

// test("the shopping list has milk on it", () => {
//   expect(shoppingList).toContain("milk");
//   expect(new Set(shoppingList)).toContain("milk");
// });

const data = [
  [4, 2, [3, 5, 11, 12, 13, 2, 6, 18, 20, 22]],
  [49, 2, [40, 41, 42, 48, 50, 56, 57, 58, 33, 35, 51]],
  [9, 2, [0, 1, 2, 8, 10, 16, 17, 18, 11, 25, 27]],
  [14, 2, [5, 6, 7, 13, 15, 21, 22, 23, 12, 28, 30]],
  [36, 1, [27, 28, 29, 35, 37, 43, 44, 45]],
];
test.each(data)(
  "Test available cells func 'genAvailableFeld' Position = %s , level = %s ",
  (index, cells, expected) => {
    expected = expected.sort((a, b) => {
      if (a > b) return 1;
      if (a == b) return 0;
      if (a < b) return -1;
    });
    expect(genAvailableFeld(index, cells)).toEqual(expected);
  }
);
