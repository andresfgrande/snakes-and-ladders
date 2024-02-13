import Board from "./Board";
import Dice from "./Dice";
import Player from "./Player";

export default class Game{
    board: Board;
    players: Player[];
    dice: Dice;

    constructor(board: Board, players: Player[], dice: Dice){
        this.board = board;
        this.players = players;
        this.dice = dice;
    }

    public addPlayer(player: Player){
        this.players.push(player);
    }

    public setBoard(board: Board){
        this.board = board;
    }

    public setDice(dice: Dice){
        this.dice = dice;
    }

    public startGame(){
        //Dice roll starts
    }

    public showResult(){
        //Show players array ordered by position
    }

    movePlayer(player: Player){
        //Move the player
    }
}