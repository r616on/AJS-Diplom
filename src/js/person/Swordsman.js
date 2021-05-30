import Character from "../Character";

export default class Swordsman extends Character {
  constructor(level, type = "swordsman") {
    super(level, type, 40, 10);
    this.health = 100;
    this.travelRange = 4;
    this.attackRange = 1;
  }
}
