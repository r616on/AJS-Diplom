/**
 * Entry point of app: don't change this
 */
import Team from "./Team";
import GamePlay from "./GamePlay";
import GameController from "./GameController";
import GameStateService from "./GameStateService";
import genAvailableFeld from "./genAvailableTravel";
import PositionedCharacter from "./PositionedCharacter";
import Bowman from "./person/Bowman";
import Daemon from "./person/Daemon";
import Magician from "./person/Magician";
import { characterGenerator, generateTeam, generateStart } from "./generators";
import genAvailableAttack from "./genAvailableAttack";
import genAvailableTravel from "./genAvailableTravel";

const gamePlay = new GamePlay();
gamePlay.bindToDOM(document.querySelector("#game-container"));
const team = new Team();
const stateService = new GameStateService(localStorage);
const gameCtrl = new GameController(gamePlay, stateService, team);
gameCtrl.init();
