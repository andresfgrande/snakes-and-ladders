import Board from "../models/Board";
import Dice from "../models/Dice";
import Player from "../models/Player";
import { TurnResult, Score, MoveResult } from "../interfaces/IGame";

export default class Game{
    private board: Board;
    private players: Player[];
    private dice: Dice;
    private currentPlayerIndex: number;
    private minPlayersNum: number;

    constructor(boardSize: number, diceFaces: number, minPlayersNum: number){
        this.minPlayersNum = minPlayersNum;
        this.board = new Board(boardSize);
        this.dice = new Dice(diceFaces);
        this.players = [];
        this.currentPlayerIndex = 0;
    }

    /**
     * Adds a new player to the game.
     */
    public addPlayer(name: string): void{
        let initialPosition: number = 1;
        const newPlayer: Player = new Player(this.getPlayersCount() + 1, name, initialPosition);
        this.players.push(newPlayer);
    }

    /**
     * Executes the next turn of the game
     */
    public nextTurn(): TurnResult {
        const player: Player = this.players[this.currentPlayerIndex];
        const prevPosition: number = player.getPosition()

        //Roll dice
        const roll: number = this.rollDice();

        //Move player and get results
        const moveResult: MoveResult = this.movePlayer(player, roll);

        //Check if player wins in this turn
        const isWinner: boolean = this.isWinner(player);

        //Update player index for next turn
        this.updateCurrentPlayerIndex();

        return {
            playerName: player.getName(), 
            isWinner: isWinner, 
            playerMoves: moveResult.playerMoves, 
            prevPosition: prevPosition,
            newPosition: moveResult.playerPosition,
            diceRoll: roll
        };
    }

    /**
     * Updates the current player index by incrementing it based on the number of players
     */
    private updateCurrentPlayerIndex(): void{
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }

    /**
     * Retrieves the players scores by ordering the players by their position
     */
    public getScores(): Score[] {
  
        const auxPlayers: Player[] = this.players.slice();
        const sortedPlayers: Player[] = auxPlayers.sort((a, b) => b.getPosition() - a.getPosition());

       return sortedPlayers.map((player, index)=>{
            return {
                ranking: index + 1,
                name: player.getName(),
                position: player.getPosition()
            }
        });
    }

    /**
     * Move the player to a new position on the board based on the given number of positions.
     */
    private movePlayer(player: Player, positions: number): MoveResult {
        let playerMoves: boolean = false;
        if(player.getPosition() + positions <= this.board.getSize()){
            player.setPosition(player.getPosition()+ positions);
            playerMoves = true;
        }
        return {
            playerMoves: playerMoves, 
            playerPosition: player.getPosition()
        };
    }

    /**
     * Checks if the player wins the game
     */
    private isWinner(player: Player): boolean{
        return player.getPosition() >= this.board.getSize();
    }

    private rollDice(): number{
        return this.dice.roll();
    }

    public getCurrentPlayerName(): string{
        return this.players[this.currentPlayerIndex].getName();
    }

    public getPlayersCount(): number {
        return this.players.length;
    }

    public getMinPlayersNum(): number {
        return this.minPlayersNum;
    }

    public isReadyToStart(): boolean {
        return this.getPlayersCount() >= this.getMinPlayersNum();
    }

    /**
     * End the game by resetting players and current player index.
     */
    public endGame(): void {
        this.players = [];
        this.currentPlayerIndex = 0;
    }

    public getPlayerPosition(id: number): number {
        return this.players[id-1].getPosition();
    }
}