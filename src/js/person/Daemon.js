import Character from "../Character";

export default class Daemon extends Character {
  constructor(level, type = "daemon") {
    super(level, type, 10, 40);
    this.health = 100;
    this.travelRange = 1;
    this.attackRange = 4;
  }
}
