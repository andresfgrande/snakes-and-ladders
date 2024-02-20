import Game from "./core/services/Game";
import Console from "./ui/Console";

const boardSize: number = 100;
const diceFaces: number = 6;
const minPlayersNum: number = 2;

const snakesAndLadders = new Game(boardSize, diceFaces, minPlayersNum);
const console = new Console(snakesAndLadders);

console.play();
