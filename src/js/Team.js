export default class Team {
  constructor() {
    this.members = [];
    this.ii = [];
    this.people = [];
  }

  add(obj) {
    this.members.push(obj);
  }

  addAll(...arr) {
    arr.forEach((item) => {
      this.members.push(item);
    });
  }

  toArray() {
    return this.members;
  }
}
