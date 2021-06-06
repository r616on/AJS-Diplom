export default class GameStateService {
  constructor(storage) {
    this.storage = storage;
    this.level = 1;
    this.running = "";
    this.playingField = [];
    this.peopleTeam = [];
    this.iiTeam = [];
    this.activePersonPosition = -1;
  }

  save() {
    const saveData = {
      storage: this.storage,
      level: this.level,
      running: this.running,
      playingField: this.playingField,
      peopleTeam: this.peopleTeam,
      iiTeam: this.iiTeam,
      activePersonPosition: this.activePersonPosition,
    };
    this.storage.setItem("state", JSON.stringify(saveData));
  }

  load() {
    try {
      return JSON.parse(this.storage.getItem("state"));
    } catch (e) {
      throw new Error("Invalid state");
    }
  }
}
