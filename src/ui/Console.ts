import Game from "../core/services/Game";
import { rl } from "../utils/utilities";
import { TurnResult } from "../core/interfaces/IGame";

export default class Console{
    game: Game;
    constructor(game: Game){
        this.game = game;
    }
       
    public mainMenu():void {
        console.log("\nSnakes and Ladders");
        console.log("1. Add Player");
        console.log("2. Start Game");
        console.log("3. Exit");
        rl.question("Select an option: ", (answer) => {
            switch (answer) {
                case '1':
                    this.addPlayer();
                    break;
                case '2':
                    this.startGame();
                    break;
                case '3':
                    rl.close();
                    break;
                default:
                    console.clear();
                    this.printMessage("Invalid option, try again.");
                    this.mainMenu();
                    break;
            }
        });
    }

    public gameMenu():void {
        console.log("\nSnakes and Ladders");
        console.log("1. Roll Dice and move");
        console.log("2. Finish Game");
        rl.question("Select an option: ", (answer) => {
            switch (answer) {
                case '1':
                    this.nextTurn();
                    break;
                case '2':
                    this.endGame();
                    break;
                default:
                    console.clear();
                    this.printMessage("Invalid option, try again.");
                    this.printMessage(`${this.game.getCurrentPlayer()}'s turn.`);
                    this.gameMenu();
                    break;
            }
        });
    }

    public addPlayer():void {
        console.clear();
        rl.question("Enter player name: ", (name) => {
            this.game.addPlayer(name);
            this.printMessage(`${name} added.`);
            this.mainMenu();
        });
    }

    public startGame():void {
        console.clear();
        if (this.game.getPlayersCount() < this.game.getMinPlayersNum()) {
            this.printMessage(`At least ${this.game.getMinPlayersNum()} players are required to start the game.`);
            this.mainMenu();
        } else {
            this.printMessage("Starting the game...");
            this.showScores();
            this.printMessage(`${this.game.getCurrentPlayer()}'s turn.`);
            this.gameMenu(); 
        }
    }

    public play(): void{
        this.mainMenu();
    }

    public nextTurn(): void{
        console.clear();  

        const turnResult: TurnResult = this.game.nextTurn();
        this.showScores();
        this.printMessage(`${turnResult.currentPlayer} -> dice roll: ${turnResult.diceRoll} - moves from square ${turnResult.prevPosition} to square ${turnResult.newPosition}`);

        if(turnResult.isWinner){
            this.printMessage(`${turnResult.currentPlayer} wins!`);
        }

        this.printMessage(`${this.game.getCurrentPlayer()}'s turn.`);
        this.gameMenu();
    }

    public endGame(): void{
        console.clear();
        this.game.endGame();
        this.mainMenu();
    }

    public showScores(): void{
        this.divider();
        this.game.getScores().forEach((player, index)=>{
            console.log(`${index + 1} - ${player.name} is on square ${player.position}`);
        });
        this.divider();
    }

    public printMessage(message: string): void {
        this.divider();
        console.log(message);
        this.divider();
    }

    public divider(): void {
        console.log("-------------------------------------------------");
    }

}


