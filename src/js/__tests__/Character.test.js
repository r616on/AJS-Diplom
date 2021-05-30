import Character from "../Character";
//import Bowerman from "../person/Bowerman";

test("Test NO Character", () => {
  expect(() => new Character(1)).toThrow(Error("No Character"));
});
// test("test levelUP based Bowerman", () => {
//   const data = { attack: 30, defence: 30, level: 2 };
//   const bowerman = new Bowerman();
//   bowerman.levelUp();
//   expect(bowerman).toEqual(expect.objectContaining(data));
// });
// test("test levelUP based Bowerman health = 0", () => {
//   const bowerman = new Bowerman("Bow");
//   bowerman.health = 0;
//   expect(() => bowerman.levelUp()).toThrow(
//     "Жизней меньше 0 невозможно увеличить уровень"
//   );
// });

// test("test damage based Bowerman 25 point", () => {
//   const data = { health: 81.25 };
//   const bowerman = new Bowerman("Bow");
//   bowerman.damage(25);
//   expect(bowerman).toEqual(expect.objectContaining(data));
// });

// test("test damage based Bowerman health > 0", () => {
//   const bowerman = new Bowerman("Bow");
//   bowerman.health = -1;
//   expect(() => bowerman.damage(25)).toThrow(
//     "Жизней  0 невозможно отнять больше"
//   );
// });
