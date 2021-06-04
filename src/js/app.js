/**
 * Entry point of app: don't change this
 */
import GamePlay from "./GamePlay";
import GameController from "./GameController";
import GameStateService from "./GameStateService";
import genAvailableFeld from "./genAvailableFeld";
import PositionedCharacter from "./PositionedCharacter";
import Bowman from "./person/Bowman";
import Daemon from "./person/Daemon";
import Magician from "./person/Magician";
import { characterGenerator, generateTeam, generateStart } from "./generators";

const gamePlay = new GamePlay();
gamePlay.bindToDOM(document.querySelector("#game-container"));

const stateService = new GameStateService(localStorage);
const gameCtrl = new GameController(gamePlay, stateService);
gameCtrl.init();

console.log(genAvailableFeld(7, 4));

// let arr2 = [Bowman, Daemon, Magician];
// // const bowTest = new PositionedCharacter(bow, 23);
// // const bowTest2 = new PositionedCharacter(bow, 45);
// // const arr = [bowTest, bowTest2];
// console.dir(arr2);
// let gen = generateTeam(arr2, 1, 2);
// console.log(gen);
// let posit = generateStart(gen.members, "people");
// console.log(posit);

// gamePlay.redrawPositions(posit);
// don't write your code here
