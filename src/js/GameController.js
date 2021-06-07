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
  }

  init() {
    this.startGame();
    this.gamePlay.addCellEnterListener(this.personInfo.bind(this));
    this.gamePlay.addCellEnterListener(this.cursorsPointer.bind(this));
    this.gamePlay.addCellEnterListener(this.travelRadiusAndAttac.bind(this));

    this.gamePlay.addCellLeaveListener(this.noPersonInfo.bind(this));
    this.gamePlay.addCellLeaveListener(this.noCursorsPointer.bind(this));
    this.gamePlay.addCellLeaveListener(this.noTravelRadiusAndAttac.bind(this));

    this.gamePlay.addCellClickListener(this.personSelect.bind(this));
    this.gamePlay.addCellClickListener(this.travel.bind(this));
    this.gamePlay.addCellClickListener(this.attack.bind(this));
    this.gamePlay.addCellClickListener(this.turnOrder.bind(this));

    this.gamePlay.addSaveGameListener(this.saveGame.bind(this));
    this.gamePlay.addLoadGameListener(this.loadGame.bind(this));

    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }
  turnOrder() {
    if (!this.runningPeople) {
      this.iiRunning();
    }
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

  personSelect(cellIndex) {
    this.playingField.forEach((person) => {
      if (person.position === cellIndex) {
        if (
          person.character.type === "swordsman" ||
          person.character.type === "bowman" ||
          person.character.type === "magician"
        ) {
          if (this.activePersonPosition > -1) {
            this.setActivePersonClean();
          }
          this.setActivePerson(cellIndex);
        }
      }
    });
  }
  setActivePerson(cellIndex) {
    //////SELect
    this.gamePlay.selectCell(cellIndex);
    this.playingField.forEach((person) => {
      if (person.position === cellIndex) {
        ///Set Active Persone
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
    ///deselect
    this.gamePlay.deselectCell(this.activePersonPosition);
    /// Clear Activ Person
    this.activPositionPlayingField = [];
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
    const personPositionArr = this.playingField.map(
      (person) => person.position
    );
    if (
      this.activePersonPosition > -1 &&
      !personPositionArr.includes(cellIndex) &&
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
      if (player === "ii") {
        this.runningPeople = true;
      } else {
        this.runningPeople = false;
      }
    }
  }
  attack(cellIndex, player = "people") {
    let rivalPosit = [];
    ///Create arr rival
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
    ///check  avalible attack and attack animation
    if (
      rivalPosit.includes(cellIndex) &&
      this.activePersonPosition > -1 &&
      this.activePotentialAttackArr.includes(cellIndex)
    ) {
      const damage = this.gamePlay.showDamage(
        cellIndex,
        this.activePerson.attack
      );
      damage.then((e) => {
        if (player === "ii") {
          this.runningPeople = true;
        } else {
          this.runningPeople = false;
        }

        this.gamePlay.redrawPositions(this.playingField);
      });
      /// attack and check team
      this.playingField.forEach((person, index) => {
        if (person.position === cellIndex) {
          person.character.health =
            person.character.health - this.activePerson.attack;

          if (person.character.health < 1) {
            ////delete in team and playfield person
            this.playingField.splice(index, 1);
            this.gamePlay.deselectCell(this.activePersonPosition);
            this.gamePlay.deselectCell(cellIndex);
          }

          //////chek team
          let iilPositEnd = this.playingField
            .filter(
              (person) =>
                person.character.type === "daemon" ||
                person.character.type === "undead" ||
                person.character.type === "vampire"
            )
            .map((person) => person.position);
          let peoplePositEnd = this.playingField
            .filter(
              (person) =>
                person.character.type === "swordsman" ||
                person.character.type === "bowman" ||
                person.character.type === "magician"
            )
            .map((person) => person.position);

          if (iilPositEnd.length === 0) {
            this.levelUp();
          } else if (peoplePositEnd.length === 0) {
            alert("End");
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

    this.setActivePerson(iiPersonArr[getRandom(0, iiPersonArr.length - 1)]);
    const peoplePersonArrPos = this.playingField
      .filter(
        (person) =>
          person.character.type === "swordsman" ||
          person.character.type === "bowman" ||
          person.character.type === "magician"
      )
      .map((person) => person.position);
    let i = 0;
    peoplePersonArrPos.forEach((item) => {
      if (this.activePotentialAttackArr.includes(item)) {
        this.attack(item, "ii");
        i += 1;
      }
    });
    if (i === 0) {
      this.travel(this.activePersonTravelArr[1], "ii");
    }

    //

    //     //       // .map((person) => person.position);
    //            iiPersonArr.forEach(index=>{
    //      for(let i=1; i<5;i+=1){
    //             let attacArr=genAvailableAttack(index.position,i);

    //           }
    //            })
    //  function* generateIndxPeople(arr) {
    //    for (let i = 0; i < arr.length; i += 1) {
    //      yield arr[i];
    //    }
    //  }
    //    let genPeople = generateIndxPeople(peoplePersonArrPos);
    //    console.log(genPeople.next());
    //    console.log(genPeople.next());
    //    console.log(genPeople.next());
    //     //       iiPersonArr.forEach(person=>{
    //     //          if(genAvailableAttack(person.position,person.character.attackRange))
    //        })
    // peoplePersonArrPos.forEach(index=>{
    //   if(genAvailableAttack(person.position,person.character.attackRange).includes(index)){

    //   }
    // })
  }
}
