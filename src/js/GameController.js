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
    this.activePerson = {};
    this.activePersonPosition = -1;
    this.activePersonTravelArr = [];
    this.activePotentialAttackArr = [];
    this.level = 1;
    this.runningPeople = true;

    this.prizeScore = 0;
    this.finishScore = 0;
  }

  init() {
    //levelInfo.innerText = `Level:2`;

    // localStorage.clear();
    // console.log(this.stateService.storage.getItem("state"));
    if (this.stateService.storage.getItem("state")) {
      this.loadGame();
    } else {
      this.startGame();
    }
    // this.startGame();
    this.gamePlay.addCellEnterListener(this.personInfo.bind(this));
    this.gamePlay.addCellLeaveListener(this.noPersonInfo.bind(this));

    this.gamePlay.addSaveGameListener(this.saveGame.bind(this));
    this.gamePlay.addLoadGameListener(this.loadGame.bind(this));
    this.gamePlay.addNewGameListener(this.startGame.bind(this));
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }
  initListener() {
    this.gamePlay.addCellEnterListener(this.cursorsPointer.bind(this));
    this.gamePlay.addCellEnterListener(this.travelRadiusAndAttac.bind(this));

    this.gamePlay.addCellLeaveListener(this.noCursorsPointer.bind(this));
    this.gamePlay.addCellLeaveListener(this.noTravelRadiusAndAttac.bind(this));

    this.gamePlay.addCellClickListener(this.personSelect.bind(this));
    this.gamePlay.addCellClickListener(this.travel.bind(this));
    this.gamePlay.addCellClickListener(this.attack.bind(this));
  }

  turnOrder() {
    if (!this.runningPeople) {
      this.iiRunning();
    }
  }

  startGame() {
    this.initListener();
    this.level = 1;
    this.playingField = [];
    this.activePerson = {};
    this.activePersonPosition = -1;
    this.activePersonTravelArr = [];
    this.activePotentialAttackArr = [];
    this.prizeScore = 0;
    // ///

    // this.gamePlay.addCellEnterListener(this.cursorsPointer.bind(this));
    // this.gamePlay.addCellEnterListener(this.travelRadiusAndAttac.bind(this));

    // this.gamePlay.addCellLeaveListener(this.noCursorsPointer.bind(this));
    // this.gamePlay.addCellLeaveListener(this.noTravelRadiusAndAttac.bind(this));

    // this.gamePlay.addCellClickListener(this.personSelect.bind(this));
    // this.gamePlay.addCellClickListener(this.travel.bind(this));
    // this.gamePlay.addCellClickListener(this.attack.bind(this));
    // // //

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
    function activeInfo() {
      const levelInfo = this.gamePlay.level;
      const prizeScoreInfo = this.gamePlay.prizeScore;
      const finishScoreInfo = this.gamePlay.finishScore;
      levelInfo.innerText = `Level:${this.level}`;
      prizeScoreInfo.innerText = `Текущий счет:${this.prizeScoreInfo}`;
      finishScoreInfo.innerText = `Общий счет:${this.finishScoreInfo}`;
    }

    /// 2level
    if (this.level === 1) {
      this.level += 1;
      activeInfo();
      /// /genTeam
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
      /// render
      this.gamePlay.drawUi(themes.desert);
      this.playingField = this.team.people.concat(this.team.ii);
      this.gamePlay.redrawPositions(this.playingField);
      /// /3level
    } else if (this.level === 2) {
      this.level += 1;
      activeInfo();
      /// /genTeam
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
      /// render
      this.gamePlay.drawUi(themes.arctic);
      this.playingField = this.team.people.concat(this.team.ii);
      this.gamePlay.redrawPositions(this.playingField);
      /// /4 level
    } else if (this.level === 3) {
      this.level += 1;
      activeInfo();
      /// /genTeam
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
      /// render
      this.gamePlay.drawUi(themes.arctic);
      this.playingField = this.team.people.concat(this.team.ii);
      this.gamePlay.redrawPositions(this.playingField);
      ///Finish
    } else if (this.level === 4) {
      if (this.prizeScore > this.finishScore) {
        this.finishScore = this.prizeScore;
      }
      this.gamePlay.cellClickListeners = [];
      this.gamePlay.cellEnterListeners = [];
      this.gamePlay.cellLeaveListeners = [];
      this.gamePlay.addCellEnterListener(this.personInfo.bind(this));
      this.gamePlay.addCellLeaveListener(this.noPersonInfo.bind(this));
      alert("Win!!");
    }
  }

  personSelect(cellIndex) {
    this.playingField.forEach((person) => {
      if (person.position === cellIndex) {
        if (
          person.character.type === "swordsman" ||
          person.character.type === "bowman" ||
          person.character.type === "magician"
        ) {
          if (this.activePersonPosition > -1) {
            // this.gamePlay.deselectCell(this.activePersonPosition);
            this.setActivePersonClean();
          }

          this.setActivePerson(cellIndex);
        }
      }
    });
    if (this.activePersonPosition === -1) {
      GamePlay.showError("не выбран персонаж");
    }
  }

  setActivePerson(cellIndex) {
    /// ///SELect
    this.gamePlay.selectCell(cellIndex);

    this.playingField.forEach((person) => {
      if (person.position === cellIndex) {
        /// Set Active Persone
        this.activePerson = person.character;
        this.activePersonPosition = cellIndex;
        this.activePersonTravelArr = genAvailableTravel(
          cellIndex,
          person.character.travelRange
        );
        this.activePotentialAttackArr = genAvailableAttack(
          cellIndex,
          person.character.attackRange
        );
      }
    });
  }

  setActivePersonClean() {
    this.gamePlay.deselectCell(this.activePersonPosition);
    /// Clear Activ Person
    this.activePerson = {};
    this.activePersonPosition = -1;
    this.activePersonTravelArr = [];
    this.activePotentialAttackArr = [];
  }

  cursorsPointer(cellIndex) {
    this.playingField.forEach((person) => {
      if (person.position === cellIndex) {
        if (
          person.character.type === "swordsman" ||
          person.character.type === "bowman" ||
          person.character.type === "magician"
        ) {
          this.gamePlay.setCursor(cursors.pointer);
        }
      }
    });

    // this.team.people.forEach((person) => {
    //   if (person.position === cellIndex) {
    //     if (
    //       this.activePersonPosition > -1 &&
    //       !(this.activePersonPosition === cellIndex)
    //     ) {
    //       this.gamePlay.setCursor(cursors.pointer);
    //     }
    //   }
    // });
  }

  travelRadiusAndAttac(cellIndex) {
    const peopleArrPos = this.playingField
      .filter(
        (person) =>
          person.character.type === "swordsman" ||
          person.character.type === "bowman" ||
          person.character.type === "magician"
      )
      .map((person) => person.position);
    const personPositionArr = this.playingField.map(
      (person) => person.position
    );
    if (
      !personPositionArr.includes(cellIndex) &&
      this.activePersonTravelArr.includes(cellIndex)
    ) {
      this.gamePlay.selectCell(cellIndex, "green");
      this.gamePlay.setCursor(cursors.pointer);
    } else if (
      !peopleArrPos.includes(cellIndex) &&
      !this.activePersonTravelArr.includes(cellIndex)
    ) {
      this.gamePlay.setCursor(cursors.notallowed);
    }
    if (
      personPositionArr.includes(cellIndex) &&
      this.activePotentialAttackArr.includes(cellIndex)
    ) {
      this.playingField.forEach((person) => {
        if (person.position === cellIndex) {
          if (
            person.character.type === "daemon" ||
            person.character.type === "undead" ||
            person.character.type === "vampire"
          ) {
            this.gamePlay.selectCell(cellIndex, "red");
            this.gamePlay.setCursor(cursors.crosshair);
          }
        }
      });
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

  travel(cellIndex, player = "people") {
    ////norm
    const personPositionArr = this.playingField.map(
      (person) => person.position
    );
    if (
      this.activePersonPosition > -1 &&
      !personPositionArr.includes(cellIndex) &&
      this.activePersonTravelArr.includes(cellIndex)
    ) {
      const index = this.playingField.findIndex((person) => {
        if (person.position === this.activePersonPosition) {
          return true;
        }
      });
      this.playingField[index].position = cellIndex;
      this.setActivePersonClean();
      //this.gamePlay.deselectCell(this.activePersonPosition);
      this.gamePlay.deselectCell(cellIndex);
      this.gamePlay.redrawPositions(this.playingField);
      if (player === "ii") {
        this.runningPeople = true;
      } else {
        this.runningPeople = false;
      }
      this.turnOrder();
    } else if (
      this.activePersonPosition > -1 &&
      !personPositionArr.includes(cellIndex) &&
      !this.activePersonTravelArr.includes(cellIndex) &&
      !this.activePotentialAttackArr.includes(cellIndex)
    ) {
      GamePlay.showError("нельзя пойти и атаковать");
    }
  }

  attack(cellIndex, player = "people") {
    let rivalPosit = [];
    /// Create arr rival
    if (player === "people") {
      rivalPosit = this.playingField
        .filter(
          (person) =>
            person.character.type === "daemon" ||
            person.character.type === "undead" ||
            person.character.type === "vampire"
        )
        .map((person) => person.position);
    } else if (player === "ii") {
      rivalPosit = this.playingField
        .filter(
          (person) =>
            person.character.type === "swordsman" ||
            person.character.type === "bowman" ||
            person.character.type === "magician"
        )
        .map((person) => person.position);
    }
    /// check  avalible attack and attack animation
    if (
      rivalPosit.includes(cellIndex) &&
      this.activePersonPosition > -1 &&
      this.activePotentialAttackArr.includes(cellIndex)
    ) {
      // Damage calculation
      ///Lag 2lev not an integer
      const damage = Math.trunc(
        Math.max(
          this.activePerson.attack -
            this.playingField.find((person) => person.position === cellIndex)
              .character.defence,
          this.activePerson.attack * 0.9
        )
      );
      // Damage run
      const damagePromise = this.gamePlay.showDamage(cellIndex, damage);
      damagePromise.then(() => {
        //Attack dammag
        this.playingField.forEach((person, index) => {
          if (person.position === cellIndex) {
            //console.log(person);
            person.character.health = person.character.health - damage;

            if (person.character.health < 1) {
              this.setActivePersonClean();
              this.gamePlay.deselectCell(cellIndex);
              /// /delete in team and playfield person
              this.playingField.splice(index, 1);

              this.gamePlay.redrawPositions(this.playingField);
            } else {
              this.gamePlay.deselectCell(cellIndex);
              this.setActivePersonClean();
              this.gamePlay.redrawPositions(this.playingField);
            }
          }
        });

        const iiEnd = this.playingField.filter(
          (person) =>
            person.character.type === "daemon" ||
            person.character.type === "undead" ||
            person.character.type === "vampire"
        );
        const peopleEnd = this.playingField.filter(
          (person) =>
            person.character.type === "swordsman" ||
            person.character.type === "bowman" ||
            person.character.type === "magician"
        );

        if (iiEnd.length === 0) {
          this.prizeScore += peopleEnd.reduce(
            (sum, person) => sum + person.character.health,
            0
          );
          this.levelUp();
        } else if (peopleEnd.length === 0) {
          this.gamePlay.cellClickListeners = [];
          this.gamePlay.cellEnterListeners = [];
          this.gamePlay.cellLeaveListeners = [];
          this.gamePlay.addCellEnterListener(this.personInfo.bind(this));
          this.gamePlay.addCellLeaveListener(this.noPersonInfo.bind(this));
          alert("You Louse!!");
        }
        if (player === "ii") {
          this.runningPeople = true;
        } else {
          this.runningPeople = false;
        }
        this.turnOrder();
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
    this.stateService.runningPeople = this.runningPeople;
    this.stateService.playingField = this.playingField;
    //Statistic
    this.stateService.finishScore = this.finishScore;
    this.stateService.prizeScore = this.prizeScore;
    this.stateService.save();
    alert("game saved");
  }

  loadGame() {
    this.initListener();
    const data = this.stateService.load();
    this.level = data.level;
    this.runningPeople = data.runningPeople;
    this.playingField = data.playingField;
    this.finishScore = data.finishScore;
    this.prizeScore = data.prizeScore;
    // this.setActivePerson(this.activePersonPosition);
    if (this.level === 1) {
      this.gamePlay.drawUi(themes.prairie);
    } else if (this.level === 2) {
      this.gamePlay.drawUi(themes.desert);
    } else if (this.level === 3) {
      this.gamePlay.drawUi(themes.arctic);
    } else if (this.level === 4) {
      this.gamePlay.drawUi(themes.mountain);
    }
    this.gamePlay.redrawPositions(this.playingField);
  }

  iiRunning() {
    function getRandom(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const iiPersonArr = this.playingField
      .filter(
        (person) =>
          person.character.type === "daemon" ||
          person.character.type === "undead" ||
          person.character.type === "vampire"
      )
      .map((person) => person.position);

    const peoplePersonArrPos = this.playingField
      .filter(
        (person) =>
          person.character.type === "swordsman" ||
          person.character.type === "bowman" ||
          person.character.type === "magician"
      )
      .map((person) => person.position);
    const allPerson = this.playingField.map((person) => person.position);

    const activeRandom = iiPersonArr[getRandom(0, iiPersonArr.length - 1)];
    this.setActivePerson(activeRandom);
    let i = 0;
    peoplePersonArrPos.forEach((item) => {
      if (i === 0) {
        if (this.activePotentialAttackArr.includes(item)) {
          this.attack(item, "ii");
          i += 1;
        }
      }
    });

    if (i === 0 && !allPerson.includes(this.activePersonTravelArr[2])) {
      this.travel(this.activePersonTravelArr[2], "ii");
    } else if (i === 0 && !allPerson.includes(this.activePersonTravelArr[3])) {
      this.travel(this.activePersonTravelArr[3], "ii");
    } else if (i === 0 && !allPerson.includes(this.activePersonTravelArr[4])) {
      this.travel(this.activePersonTravelArr[4], "ii");
    }

    //
  }
}
