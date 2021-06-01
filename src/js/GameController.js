import Bowman from "./person/Bowman";
import Daemon from "./person/Daemon";
import Magician from "./person/Magician";
import Swordsman from "./person/Swordsman";
import Undead from "./person/Undead";
import Vampire from "./person/Vampire";

import { generateTeam, generateStart } from "./generators";
import themes from "./themes";

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.playingField = [];
  }

  init() {
    this.startGame();
    this.personInfo();
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }
  startGame() {
    this.gamePlay.drawUi(themes.prairie);
    const userStart = generateStart(
      [new Bowman(1), new Swordsman(1)],
      "people"
    );
    const iiStart = generateStart(
      generateTeam([Daemon, Undead, Vampire], 1, 2).members,
      "ii"
    );
    this.playingField = userStart.concat(iiStart);

    this.gamePlay.redrawPositions(this.playingField);
  }
  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }
  personInfo() {
    // <- что это за метод и где это нужно сделать решите сами
    this.gamePlay.addCellLeaveListener(this.onCellEnter);
  }

  onCellEnter(cellIndex) {
    this.playingField.forEach((person) => {
      if (person.position === cellIndex) {
        const message = `${U1F396}  ${person.character.level} ${U2694} ${person.character.attack} ${U1F6E1} ${person.character.defence}`;
        this.gamePlay.showCellTooltip(message, cellIndex);
      }
    });
    // some logic here
  }
}
