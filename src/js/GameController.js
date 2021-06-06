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
import PositionedCharacter from "./PositionedCharacter";

import { generateTeam, genPositioned } from "./generators";
import themes from "./themes";

export default class GameController {
  constructor(gamePlay, stateService, team) {
    this.team = team;
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.playingField = [];
    this.activPositionPlayingField = [];
    this.activePerson = {};
    this.activePersonPosition = -1;
    this.activePersonTravelArr = [];
    this.activePotentialAttackArr = [];
    this.level = 1;
    this.running = "people";
  }

  init() {
    this.startGame();
    this.gamePlay.addCellEnterListener(this.personInfo.bind(this));
    this.gamePlay.addCellEnterListener(this.cursorsPointer.bind(this));
    this.gamePlay.addCellEnterListener(this.travelRadiusAndAttac.bind(this));
    //this.gamePlay.addCellEnterListener(this.attacRadius.bind(this));

    this.gamePlay.addCellLeaveListener(this.noPersonInfo.bind(this));
    this.gamePlay.addCellLeaveListener(this.noCursorsPointer.bind(this));
    this.gamePlay.addCellLeaveListener(this.noTravelRadiusAndAttac.bind(this));
    //this.gamePlay.addCellLeaveListener(this.noAttacRadius.bind(this));

    this.gamePlay.addCellClickListener(this.characterSelect.bind(this));
    this.gamePlay.addCellClickListener(this.travel.bind(this));
    this.gamePlay.addCellClickListener(this.attack.bind(this));

    this.gamePlay.addSaveGameListener(this.saveGame.bind(this));
    this.gamePlay.addLoadGameListener(this.loadGame.bind(this));

    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }
  startGame() {
    this.gamePlay.drawUi(themes.prairie);
    this.team.people = genPositioned(
      [new Bowman(1), new Swordsman(1)],
      "people"
    );
    this.team.ii = genPositioned(
      generateTeam([Daemon, Undead, Vampire], 1, 2),
      "ii"
    );
    // const daemon = new PositionedCharacter(new Daemon(), 10);
    // this.team.ii.push(daemon);
    this.playingField = this.team.people.concat(this.team.ii);
    this.gamePlay.redrawPositions(this.playingField);
  }
  levelUp() {
    ///2level
    if (this.level === 1) {
      this.level += 1;
      ////genTeam
      this.team.people.forEach((person) => {
        person.character.levelUp();
      });
      this.team.people = genPositioned(
        generateTeam([Swordsman, Bowman, Magician], 1, 1),
        "people",
        this.team.people
      );
      this.team.ii = genPositioned(
        generateTeam([Daemon, Undead, Vampire], 2, this.team.people.length),
        "ii"
      );
      ///render
      this.gamePlay.drawUi(themes.desert);
      this.playingField = this.team.people.concat(this.team.ii);
      this.gamePlay.redrawPositions(this.playingField);
      ////3level
    } else if (this.level === 2) {
      this.level += 1;
      ////genTeam
      this.team.people.forEach((person) => {
        person.character.levelUp();
      });
      this.team.people = genPositioned(
        generateTeam([Swordsman, Bowman, Magician], 2, 2),
        "people",
        this.team.people
      );

      this.team.ii = genPositioned(
        generateTeam([Daemon, Undead, Vampire], 3, this.team.people.length),
        "ii"
      );
      ///render
      this.gamePlay.drawUi(themes.arctic);
      this.playingField = this.team.people.concat(this.team.ii);
      this.gamePlay.redrawPositions(this.playingField);
      ////4 level
    } else if (this.level === 3) {
      this.level += 1;
      ////genTeam
      this.team.people.forEach((person) => {
        person.character.levelUp();
      });
      this.team.people = genPositioned(
        generateTeam([Swordsman, Bowman, Magician], 3, 2),
        "people",
        this.team.people
      );

      this.team.ii = genPositioned(
        generateTeam([Daemon, Undead, Vampire], 4, this.team.people.length),
        "ii"
      );
      ///render
      this.gamePlay.drawUi(themes.arctic);
      this.playingField = this.team.people.concat(this.team.ii);
      this.gamePlay.redrawPositions(this.playingField);
    } else if (this.level === 4) {
      alert("Win!!");
    }
  }

  characterSelect(cellIndex) {
    this.team.people.forEach((person, index) => {
      if (person.position === cellIndex) {
        if (this.activePersonPosition > -1) {
          this.gamePlay.deselectCell(this.activePersonPosition);
        }
        this.gamePlay.selectCell(cellIndex);
        this.setActivePerson(index, cellIndex);
      }
    });
    // if (i === 0) {
    //   GamePlay.showError("Ошибка");
    // }
  }
  //////переписать под лоад
  setActivePerson(index, cellIndex) {
    this.activPositionPlayingField = this.playingField.map(
      (item) => item.position
    );
    this.activePerson = this.team.people[index].character;
    this.activePersonPosition = cellIndex;
    this.activePersonTravelArr = genAvailableTravel(
      cellIndex,
      this.team.people[index].character.travelRange
    );
    this.activePotentialAttackArr = genAvailableAttack(
      cellIndex,
      this.team.people[index].character.attackRange
    );
  }

  setActivePersonClean() {
    this.activPositionPlayingField = [];
    this.activePerson = {};
    this.activePersonPosition = -1;
    this.activePersonTravelArr = [];
    this.activePotentialAttackArr = [];
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
  travelRadiusAndAttac(cellIndex) {
    const peopleArr = this.team.people.map((person) => person.position);
    const iiArr = this.team.ii.map((person) => person.position);

    if (
      !this.activPositionPlayingField.includes(cellIndex) &&
      this.activePersonTravelArr.includes(cellIndex)
    ) {
      this.gamePlay.selectCell(cellIndex, "green");
      this.gamePlay.setCursor(cursors.pointer);
    } else if (peopleArr.includes(cellIndex)) {
      this.gamePlay.setCursor(cursors.pointer);
    } else if (!peopleArr.includes(cellIndex)) {
      this.gamePlay.setCursor(cursors.notallowed);
    }
    ///// attak
    if (
      this.activePotentialAttackArr.includes(cellIndex) &&
      iiArr.includes(cellIndex)
    ) {
      this.gamePlay.selectCell(cellIndex, "red");
      this.gamePlay.setCursor(cursors.crosshair);
    } else if (
      !this.activePotentialAttackArr.includes(cellIndex) &&
      iiArr.includes(cellIndex)
    ) {
      this.gamePlay.setCursor(cursors.notallowed);
    }
  }
  noTravelRadiusAndAttac(cellIndex) {
    if (this.activePersonTravelArr.includes(cellIndex)) {
      this.gamePlay.deselectCell(cellIndex);
      // this.gamePlay.setCursor(cursors.auto);
    } else if (this.activePotentialAttackArr.includes(cellIndex)) {
      this.gamePlay.deselectCell(cellIndex);
    }
  }
  travel(cellIndex) {
    if (
      this.activePersonPosition > -1 &&
      !this.activPositionPlayingField.includes(cellIndex) &&
      this.activePersonTravelArr.includes(cellIndex)
    ) {
      this.playingField.forEach((person) => {
        if (person.position === this.activePersonPosition) {
          this.gamePlay.deselectCell(this.activePersonPosition);
          person.position = cellIndex;
          this.setActivePersonClean();
          this.gamePlay.deselectCell(cellIndex);
          this.gamePlay.redrawPositions(this.playingField);
        }
      });
    }
  }
  attack(cellIndex) {
    const iiArr = this.team.ii.map((person) => person.position);
    if (
      this.activePersonPosition > -1 &&
      // iiArr.includes(cellIndex) &&
      this.activePotentialAttackArr.includes(cellIndex)
    ) {
      const damage = this.gamePlay.showDamage(
        cellIndex,
        this.activePerson.attack
      );
      damage.then((e) => {
        this.gamePlay.redrawPositions(this.playingField);
      });
      this.playingField.forEach((person, index) => {
        if (person.position === cellIndex) {
          person.character.health =
            person.character.health - this.activePerson.attack;
          ////delete in team and playfield person
          if (person.character.health < 1) {
            if (
              this.team.ii.findIndex((item) => item.position === cellIndex) > -1
            ) {
              this.team.ii.splice(
                this.team.ii.findIndex((item) => item.position === cellIndex),
                1
              );
            } else if (
              this.team.people.findIndex(
                (item) => item.position === cellIndex
              ) > -1
            ) {
              this.team.people.splice(
                this.team.people.findIndex(
                  (item) => item.position === cellIndex
                ),
                1
              );
            }
            this.playingField.splice(index, 1);
            this.gamePlay.deselectCell(this.activePersonPosition);
            this.gamePlay.deselectCell(cellIndex);
          }
          //////chek team

          if (this.team.ii.length === 0) {
            this.levelUp();
          }
        }
      });
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
  saveGame() {
    this.stateService.level = this.level;
    this.stateService.running = this.running;
    this.stateService.playingField = this.playingField;
    this.stateService.peopleTeam = this.team.people;
    this.stateService.iiTeam = this.team.ii;
    this.stateService.activePersonPosition = this.activePersonPosition;
    this.stateService.save();
  }
  loadGame() {
    const data = this.stateService.load();
    console.log(data);
    this.level = data.level;
    this.running = data.running;
    this.playingField = data.playingField;
    this.team.people = data.peopleTeam;
    this.team.ii = data.iiTeam;
    this.activePersonPosition = data.setActivePerson;
    //this.setActivePerson(this.activePersonPosition, this.activePersonPosition);
    this.gamePlay.redrawPositions(this.playingField);
  }
}
