import Game from "./classes/Game";
import readline from "readline";
import Player from "./classes/Player"; 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const game = new Game();

function mainMenu() {2
    console.log("\nSnakes and Ladders");
    console.log("1. Add Player");
    console.log("2. Start Game");
    console.log("3. Exit");
    rl.question("Select an option: ", (answer) => {
        switch (answer) {
            case '1':
                addPlayer();2
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
    console.clear();
    console.log("\nSnakes and Ladders");
    console.log("1. Roll Dice and move");
    console.log("2. Finish Game");
    rl.question("Select an option: ", (answer) => {
        switch (answer) {
            case '1':
                //Roll dice and move
                break;
            case '2':
                //Finish game and go to main menu
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
        const id = game.players.length + 1;
        const player = new Player(id, name, 1);
        game.addPlayer(player);
        console.log(`${name} added.`);
        mainMenu();
    });
}

function startGame() {
    console.clear();
    if (game.players.length < 2) {
        console.log("At least two players are required to start the game.");
        mainMenu();
    } else {
        game.startGame();
        mainMenu();
    }
}

mainMenu(); 
