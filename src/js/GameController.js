import Bowman from "./person/Bowman";
import Daemon from "./person/Daemon";
import Magician from "./person/Magician";
import Swordsman from "./person/Swordsman";
import Undead from "./person/Undead";
import Vampire from "./person/Vampire";
import GamePlay from "./GamePlay";

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
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.noCellEnter.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
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
    this.personInfo();
    this.gamePlay.redrawPositions(this.playingField);
  }
  onCellClick(index) {
    this.playingField.forEach((person) => {
      if (person.position === index) {
        if (
          person.character.type === "bowman" ||
          person.character.type === "swordsman" ||
          person.character.type === "magician"
        ) {
          const selectIdex = this.gamePlay.cells.findIndex((element) => {
            if (element.classList.contains("selected")) {
              return true;
            }
          });
          if (selectIdex > -1) {
            this.gamePlay.deselectCell(selectIdex);
          }
          this.gamePlay.selectCell(index);
        } else {
          //////////////////////////////////////////////////////////////xz
          GamePlay.showError(index, "Персонаж не выбран");
        }
      }

      // TODO: react to click
    });
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }
  personInfo() {
    // <- что это за метод и где это нужно сделать решите сами
  }

  onCellEnter(cellIndex) {
    this.playingField.forEach((person) => {
      if (person.position === cellIndex) {
        let message = `${String.fromCodePoint("0x0001F396")}  ${
          person.character.level
        } `;
        message += `${String.fromCodePoint("0x2694")}  ${
          person.character.attack
        } `;
        message += `${String.fromCodePoint("0x0001F6E1")}  ${
          person.character.defence
        } `;
        message += `${String.fromCodePoint("0x2764")}  ${
          person.character.health
        } `;
        this.gamePlay.showCellTooltip(message, cellIndex);
      }
    });
  }
  noCellEnter(cellIndex) {
    this.gamePlay.hideCellTooltip(cellIndex);
  }
}
