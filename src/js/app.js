/**
 * Entry point of app: don't change this
 */
import Team from "./Team";
import GamePlay from "./GamePlay";
import GameController from "./GameController";
import GameStateService from "./GameStateService";

const gamePlay = new GamePlay();
gamePlay.bindToDOM(document.querySelector("#game-container"));
const team = new Team();
const stateService = new GameStateService(localStorage);
const gameCtrl = new GameController(gamePlay, stateService, team);
gameCtrl.init();
console.log("111");
