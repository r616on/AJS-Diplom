import Bowman from "../person/Bowman ";

test("test Bowman ", () => {
  const data = { attack: 25, defence: 25, type: "bowman" };
  expect(new Bowman()).toEqual(expect.objectContaining(data));
});
