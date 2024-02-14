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
       //TODO

       //Dice roll
       //Move player
       //Check winner
    }

    public showResult(){
        const sortedPlayers = this.players.sort((a, b) => b.position - a.position);
        this.players.forEach((player, index)=>{
            console.log(`${index + 1} - ${player.name} is on square ${player.position}`);
        });
    }

    public movePlayer(player: Player, positions: number){
        if(player.position + positions <= 100){
            player.setPosition(player.position + positions);
            console.log(`${player.name} dice roll: ${positions} - moves to position: ${player.position}`);
        }else{
            console.log(`${player.name} dice roll: ${positions} - stays in position: ${player.position}`);
        }
    }

    public checkWinner(player: Player){
        if(player.position >= this.board.size){
            console.log(`${player.name} is the winner!`);
        }
    }
}