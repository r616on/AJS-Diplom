import Bowman from "./person/Bowman";
import Daemon from "./person/Daemon";
import Magician from "./person/Magician";
import Swordsman from "./person/Swordsman";
import Undead from "./person/Undead";
import Vampire from "./person/Vampire";
import GamePlay from "./GamePlay";
import cursors from "./cursors";
import genAvailableTravel from "./genAvailableTravel";
import genAvailableAttack from "./genAvailableAttack";

import { generateTeam, generateStart } from "./generators";
import themes from "./themes";

export default class GameController {
  constructor(gamePlay, stateService, team) {
    this.team = team;
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.playingField = [];
    this.activePerson = {};
    this.activePersonPosition = -1;
    this.activePersonTravelArr = [];
    this.activePersonPotentialAttackArr = [];
  }

  init() {
    this.startGame();
    this.gamePlay.addCellEnterListener(this.personInfo.bind(this));
    this.gamePlay.addCellEnterListener(this.cursorsPointer.bind(this));
    this.gamePlay.addCellEnterListener(this.travelRadius.bind(this));

    this.gamePlay.addCellLeaveListener(this.noPersonInfo.bind(this));
    this.gamePlay.addCellLeaveListener(this.noCursorsPointer.bind(this));
    this.gamePlay.addCellLeaveListener(this.noTravelRadius.bind(this));
    //this.gamePlay.addCellLeaveListener(this.notransitionRadius.bind(this));

    this.gamePlay.addCellClickListener(this.characterSelect.bind(this));
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }
  startGame() {
    this.gamePlay.drawUi(themes.prairie);
    this.team.people = generateStart(
      [new Bowman(1), new Swordsman(1)],
      "people"
    );
    this.team.ii = generateStart(
      generateTeam([Daemon, Undead, Vampire], 1, 2).members,
      "ii"
    );
    this.playingField = this.team.people.concat(this.team.ii);
    this.gamePlay.redrawPositions(this.playingField);
  }
  characterSelect(cellIndex) {
    let i = 0;
    this.team.people.forEach((person, index) => {
      if (person.position === cellIndex) {
        if (this.activePersonPosition > -1) {
          this.gamePlay.deselectCell(this.activePersonPosition);
        }
        i += 1;
        this.gamePlay.selectCell(cellIndex);
        this.activePerson = this.team.people[index].character;
        this.activePersonPosition = cellIndex;
        this.activePersonTravelArr = genAvailableTravel(
          cellIndex,
          this.team.people[index].character.travelRange
        );
        this.activePersonPotentialAttackArr = genAvailableAttack(
          cellIndex,
          this.team.people[index].character.attackRange
        );
      }
    });
    if (i === 0) {
      GamePlay.showError("Персонаж не выбран");
    }
  }

  cursorsPointer(cellIndex) {
    this.team.people.forEach((person) => {
      if (person.position === cellIndex) {
        if (
          this.activePersonPosition > -1 &&
          !(this.activePersonPosition === cellIndex)
        ) {
          this.gamePlay.setCursor(cursors.pointer);
        }
      }
    });
  }
  travelRadius(cellIndex) {
    if (this.activePersonTravelArr.includes(cellIndex)) {
      this.gamePlay.selectCell(cellIndex, "green");
      this.gamePlay.setCursor(cursors.pointer);
    }
  }
  noTravelRadius(cellIndex) {
    if (this.activePersonTravelArr.includes(cellIndex)) {
      this.gamePlay.deselectCell(cellIndex);
    }
  }
  onCellLeave(index) {
    // TODO: react to mouse leave
  }

  personInfo(cellIndex) {
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
  noPersonInfo(cellIndex) {
    this.gamePlay.hideCellTooltip(cellIndex);
  }
  noCursorsPointer(cellIndex) {
    this.gamePlay.setCursor(cursors.auto);
  }
}
