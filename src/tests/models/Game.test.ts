import Game from '../../core/services/Game';
import Player from '../../core/models/Player';
import Dice from '../../core/models/Dice';

describe('Game', () => {
  let game: Game;

  beforeEach(() => {
    let boardSize: number = 100;
    let diceFaces: number = 6;
    let minPlayersNum: number = 2;
    game = new Game(boardSize, diceFaces, minPlayersNum);
  });

  it('should add players correctly', () => {
    game.addPlayer('Alice');
    game.addPlayer('Bob');
    expect(game.getPlayersCount()).toBe(2);
  });

  it('should move players correctly based on controlled dice roll', () => {
    //Mocking dice
    const rollSpy = jest.spyOn(Dice.prototype, 'roll').mockReturnValue(3);

    game.addPlayer('Alice');
    game.nextTurn(); 
    const player = game.players[0];
    expect(player.position).toBe(4); 

    rollSpy.mockRestore();
  });

  /*it('should allow for a random win', () => {
    game.addPlayer('Alice');
    //No mocking Dice
    let playerWon = false;
    while(!playerWon) {
      game.nextTurn();
      playerWon = game.isWinner(game.players[0]);
    }
    expect(playerWon).toBe(true);
  });*/


});
