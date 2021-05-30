/**
 * Entry point of app: don't change this
 */
import GamePlay from "./GamePlay";
import GameController from "./GameController";
import GameStateService from "./GameStateService";
import themes from "./themes";
import PositionedCharacter from "./PositionedCharacter";
import Bowman from "./person/Bowman ";
import { characterGenerator, generateTeam } from "./generators";

const gamePlay = new GamePlay();
gamePlay.bindToDOM(document.querySelector("#game-container"));

const stateService = new GameStateService(localStorage);

const gameCtrl = new GameController(gamePlay, stateService);
gameCtrl.init();
gamePlay.drawUi(themes.prairie);
const bow = new Bowman(1);
bow.health = 50;
bow.LevelUp();
console.log(bow);
let arr2 = [Bowman, Bowman, Bowman];
// const bowTest = new PositionedCharacter(bow, 23);
// const bowTest2 = new PositionedCharacter(bow, 45);
// const arr = [bowTest, bowTest2];
console.dir(arr2);
let gen = characterGenerator(arr2, 1);
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
// gamePlay.redrawPositions(arr);
// don't write your code here
