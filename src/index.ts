import Game from "./core/services/Game";
import Menu from "./ui/services/Menu";

let boardSize: number = 100;
let diceFaces: number = 6;
let minPlayersNum: number = 2;

const snakesAndLadders = new Game(boardSize, diceFaces, minPlayersNum);
const userInterface = new Menu(snakesAndLadders);

userInterface.play();

