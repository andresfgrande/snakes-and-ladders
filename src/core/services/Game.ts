import Board from "../models/Board";
import Dice from "../models/Dice";
import Player from "../models/Player";
import { TurnResult, Score, MoveResult } from "../interfaces/IGame";

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

    public addPlayer(name: string): void{
        let initialPosition: number = 1;
        const newPlayer: Player = new Player(this.getPlayersCount() + 1, name, initialPosition);
        this.players.push(newPlayer);
    }

    public nextTurn(): TurnResult {
        const player: Player = this.players[this.currentPlayerIndex];
        const prevPosition: number = player.position;
        const roll: number = this.dice.roll();
        const moveResult: MoveResult = this.movePlayer(player, roll);

        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;

        return {
            currentPlayer: player.name, 
            isWinner: this.isWinner(player), 
            playerMoves: moveResult.playerMoves, 
            prevPosition: prevPosition,
            newPosition: moveResult.playerPosition,
            diceRoll: roll
        };
    }

    public getScores(): Score[] {
  
        const auxPlayers: Player[] = this.players.slice();
        const sortedPlayers: Player[] = auxPlayers.sort((a, b) => b.position - a.position);

       return sortedPlayers.map((player, index)=>{
            return {
                ranking: index + 1,
                name: player.name,
                position: player.position
            }
        });
    }

    public movePlayer(player: Player, positions: number): MoveResult {
        let playerMoves: boolean = false;
        if(player.position + positions <= this.board.size){
            player.setPosition(player.position + positions);
            playerMoves = true;
        }
        return {
            playerMoves: playerMoves, 
            playerPosition: player.position
        };
    }

    public isWinner(player: Player): boolean{
        return player.position >= this.board.size;
    }

    public getCurrentPlayer(): string{
        return this.players[this.currentPlayerIndex].name;;
    }

    public getPlayersCount(): number {
        return this.players.length;
    }

    public getMinPlayersNum(): number {
        return this.minPlayersNum;
    }

    public endGame(): void {
        this.players = [];
        this.currentPlayerIndex = 0;
    }
}