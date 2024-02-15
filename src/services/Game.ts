import Board from "../models/Board";
import Dice from "../models/Dice";
import Player from "../models/Player";

export default class Game{
    board: Board;
    players: Player[];
    dice: Dice;
    currentPlayerIndex: number;
    minPlayersNum: number;

    constructor(boardSize: number, diceFaces: number, minPlayersNum: number){
        this.minPlayersNum = minPlayersNum;
        this.board = new Board(boardSize);
        this.dice = new Dice(diceFaces);
        this.minPlayersNum = minPlayersNum;
        this.players = [];
        this.currentPlayerIndex = 0;
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

    public nextTurn(): void {
        const player = this.players[this.currentPlayerIndex];
        
        this.movePlayer(player, this.dice.roll());
        this.showResult();
        this.isWinner(player);
        
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
       
        console.log("--------------------------------------------");
        this.showCurrentPlayer();
    }

   
    public showResult(): void{
        const auxPlayers: Player[] = this.players.slice();
        const sortedPlayers = auxPlayers.sort((a, b) => b.position - a.position);

        sortedPlayers.forEach((player, index)=>{
            console.log(`${index + 1} - ${player.name} is on square ${player.position}`);
        });
    }

    public movePlayer(player: Player, positions: number){
        if(player.position + positions <= this.board.size){
            player.setPosition(player.position + positions);
            console.log(`${player.name} -> dice roll: ${positions} - moves to position: ${player.position}`);
            console.log("--------------------------------------------");
        }else{
            console.log(`${player.name} -> dice roll: ${positions} - stays in position: ${player.position}`);
            console.log("--------------------------------------------");
        }
    }

    public isWinner(player: Player): boolean{
        if(player.position >= this.board.size){
            console.log(`${player.name} wins!`);
            return true;
        }
        return false;
    }

    public showCurrentPlayer(): void{
        const player = this.players[this.currentPlayerIndex];
        console.log(`${player.name}'s turn.`);
    }

    public getPlayersCount(): number {
        return this.players.length;
    }

    public getMinPlayersNum(): number {
        return this.minPlayersNum;
    }
}