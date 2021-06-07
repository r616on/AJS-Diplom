export default class Character {
  constructor(level, type = 'generic', attack = 0, defence = 0) {
    this.level = level;
    this.attack = attack;
    this.defence = defence;
    this.health = 50;
    this.type = type;
    if (new.target.name === 'Character') throw 'No Character';
    // TODO: throw error if user use "new Character()"
    if (level === 2) {
      this.levelUp();
      this.level = 2;
    }
    if (level === 3) {
      this.levelUp();
      this.levelUp();
      this.level = 3;
    }
    if (level === 4) {
      this.levelUp();
      this.levelUp();
      this.levelUp();
      this.level = 4;
    }
  }

  levelUp() {
    this.level += 1;
    this.attack = Math.max(
      this.attack,
      +(this.attack * (1.8 - (1 - this.health / 100))).toFixed(),
    );
    this.health += 80;
    if (this.health > 101) {
      this.health = 100;
    }
  }
}
