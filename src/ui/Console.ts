import Game from "../core/services/Game";
import { rl } from "../utils/utilities";
import { TurnResult } from "../core/interfaces/IGame";

export default class Console{
    private game: Game;
    constructor(game: Game){
        this.game = game;
    }
       
    private mainMenu():void {
        console.log("\nSNAKES AND LADDERS");
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

    private gameMenu():void {
        console.log("\nSNAKES AND LADDERS");
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
                    this.printMessage(`${this.game.getCurrentPlayerName()}'s turn.`);
                    this.gameMenu();
                    break;
            }
        });
    }

    private addPlayer():void {
        console.clear();
        rl.question("Enter player name: ", (name) => {
            this.game.addPlayer(name);
            this.printMessage(`${name} added.`);
            this.mainMenu();
        });
    }

    private startGame():void {
        console.clear();
        if (this.game.isReadyToStart()) {
            this.printMessage("Starting the game...");
            this.showScores();
            this.printMessage(`${this.game.getCurrentPlayerName()}'s turn.`);
            this.gameMenu(); 
        } else {
            this.printMessage(`At least ${this.game.getMinPlayersNum()} players are required to start the game.`);
            this.mainMenu();
        }
    }

    public play(): void{
        this.mainMenu();
    }

    private nextTurn(): void{
        console.clear();  

        const turnResult: TurnResult = this.game.nextTurn();
        this.showScores();
        if(turnResult.playerMoves){
            this.printMessage(`${turnResult.playerName}  `+
                              `-> dice roll: ${turnResult.diceRoll} `+
                              `- moves from square ${turnResult.prevPosition} to square ${turnResult.newPosition}`);
        }else{
            this.printMessage(`${turnResult.playerName} -> dice roll: ${turnResult.diceRoll} `+
                              `- stays in square ${turnResult.newPosition}`);
        }

        if(turnResult.isWinner){
            this.printMessage(`${turnResult.playerName} wins!`);
        }

        this.printMessage(`${this.game.getCurrentPlayerName()}'s turn.`);
        this.gameMenu();
    }

    private endGame(): void{
        console.clear();
        this.game.endGame();
        this.mainMenu();
    }

    private showScores(): void{
        this.divider();
        this.game.getScores().forEach((player, index)=>{
            console.log(`${index + 1} - ${player.name} is on square ${player.position}`);
        });
        this.divider();
    }

    private printMessage(message: string): void {
        this.divider();
        console.log(message);
        this.divider();
    }

    private divider(): void {
        console.log("-------------------------------------------------");
    }

}


