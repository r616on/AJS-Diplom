export default class Team {
  constructor() {
    this.members = new Set();
  }

  add(obj) {
    if (!this.members.has(obj)) {
      this.members.add(obj);
    } else {
      throw new Error("Персонаж уже есть в комманде");
    }
  }

  addAll(...arr) {
    arr.forEach((item) => {
      this.members.add(item);
    });
  }

  toArray() {
    const arr = Array.from(this.members);
    return arr;
  }
}
