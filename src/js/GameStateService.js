export default class GameStateService {
  constructor(storage) {
    this.storage = storage;
    this.level = 1;
    this.running = "people";
    this.playingField = [];
  }

  save(state) {
    this.storage.setItem("state", JSON.stringify(state));
  }

  load() {
    try {
      return JSON.parse(this.storage.getItem("state"));
    } catch (e) {
      throw new Error("Invalid state");
    }
  }
}
