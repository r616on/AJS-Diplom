import Character from "../Character";

export default class Bowman extends Character {
  constructor(level, type = "bowman") {
    super(level, type, 25, 25);
    this.travelRange = 2;
    this.attackRange = 2;
    this.health = 100;
  }
}
