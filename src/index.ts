import Game from "./core/services/Game";
import Console from "./ui/Console";

let boardSize: number = 100;
let diceFaces: number = 6;
let minPlayersNum: number = 2;

const snakesAndLadders = new Game(boardSize, diceFaces, minPlayersNum);
const console = new Console(snakesAndLadders);

console.play();
