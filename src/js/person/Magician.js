import Character from "../Character";

export default class Magician extends Character {
  constructor(level, type = "magician") {
    super(level, type, 10, 40);
    this.health = 100;
    this.travelRange = 1;
    this.attackRange = 4;
  }
}
