import Game from "./services/Game";
import readline from "readline";
import Player from "./models/Player"; 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const snakesAndLadders = new Game(100, 6, 2);

function mainMenu() {2
    console.log("\nSnakes and Ladders");
    console.log("1. Add Player");
    console.log("2. Start Game");
    console.log("3. Exit");
    rl.question("Select an option: ", (answer) => {
        switch (answer) {
            case '1':
                addPlayer();
                break;
            case '2':
                startGame();
                break;
            case '3':
                rl.close();
                break;
            default:
                console.log("Invalid option, try again.");
                mainMenu();
                break;
        }
    });
}

function gameMenu() {
    console.log("\nSnakes and Ladders");
    console.log("1. Roll Dice and move");
    console.log("2. Finish Game");
    rl.question("Select an option: ", (answer) => {
        switch (answer) {
            case '1':
                console.clear();
                snakesAndLadders.nextTurn();
                gameMenu();
                break;
            case '2':
                //TODO finish and reset game
                mainMenu();
                break;
            default:
                console.log("Invalid option, try again.");
                gameMenu();
                break;
        }
    });
}

function addPlayer() {
    console.clear();
    rl.question("Enter player name: ", (name) => {
        const id = snakesAndLadders.getPlayersCount() + 1;
        const player = new Player(id, name, 1);
        snakesAndLadders.addPlayer(player);
        console.log(`${name} added.`);
        mainMenu();
    });
}

function startGame() {
    console.clear();
    if (snakesAndLadders.getPlayersCount() < snakesAndLadders.getMinPlayersNum()) {
        console.log(`At least ${snakesAndLadders.getMinPlayersNum()} players are required to start the game.`);
        console.log("-----------------------------------------------------");
        mainMenu();
    } else {
        console.log("Starting the game...");
        console.log("---------------------");
        snakesAndLadders.showCurrentPlayer();
        gameMenu(); 
    }
}

//TODO nextTurn() and endGame()

mainMenu(); 
