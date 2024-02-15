import Game from "../../core/services/Game";
import { rl } from "../../utils/utilities";

export default class Menu{
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
                    this.invalidOption();
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
                    this.invalidOption();
                    this.game.showCurrentPlayer();
                    this.gameMenu();
                    break;
            }
        });
    }

    public addPlayer():void {
        console.clear();
        rl.question("Enter player name: ", (name) => {
            this.game.addPlayer(name);
            console.log(`${name} added.`);
            this.mainMenu();
        });
    }

    public startGame():void {
        console.clear();
        if (this.game.getPlayersCount() < this.game.getMinPlayersNum()) {
            console.log(`At least ${this.game.getMinPlayersNum()} players are required to start the game.`);
            console.log("-----------------------------------------------------");
            this.mainMenu();
        } else {
            console.log("Starting the game...");
            console.log("---------------------");
            this.game.showCurrentPlayer();
            this.gameMenu(); 
        }
    }


    public play(): void{
        this.mainMenu();
    }

    public nextTurn(): void{
        console.clear();
        this.game.nextTurn();
        this.gameMenu();
    }

    public endGame(): void{
        console.clear();
        this.game.endGame();
        this.mainMenu();
    }

    public invalidOption(): void{
        console.clear();
        console.log("Invalid option, try again.");
        console.log("---------------------------");
    }

}


