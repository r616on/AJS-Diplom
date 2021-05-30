import Character from "../Character";

export default class Vampire extends Character {
  constructor(level, type = "vampire") {
    super(level, type, 25, 25);
    this.health = 100;
    this.travelRange = 2;
    this.attackRange = 2;
  }
}
