import Game from '../../core/services/Game';
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
    game.addPlayer('Carol');
    expect(game.getPlayersCount()).toBe(3);
  });

  it('should start at position 1', () => {
    game.addPlayer('Alice');
    const playerPosition = game.getPlayerPosition(1);
    expect(playerPosition).toBe(1); 
  });

  it('should move players correctly based on dice roll: 1 + 3 = 4', () => {
    //Mocking dice roll
    const rollSpy = jest.spyOn(Dice.prototype, 'roll').mockReturnValue(3);

    game.addPlayer('Alice');
    game.nextTurn(); 
    const playerPosition = game.getPlayerPosition(1);
    expect(playerPosition).toBe(4); 

    rollSpy.mockRestore();
  });

   it('should move players correctly based on dice roll: 1 + 3 + 4 = 8', () => {
    //Mocking dice roll
    let rollSpy = jest.spyOn(Dice.prototype, 'roll').mockReturnValue(3);

    game.addPlayer('Alice');
    game.nextTurn(); 

    rollSpy = jest.spyOn(Dice.prototype, 'roll').mockReturnValue(4);
    game.nextTurn();

    const playerPosition = game.getPlayerPosition(1);
    expect(playerPosition).toBe(8); 

    rollSpy.mockRestore();
  });

  it('should be able to win', () => {
    //Mocking dice roll
    let rollSpy = jest.spyOn(Dice.prototype, 'roll').mockReturnValue(96);

    game.addPlayer('Alice');
    game.nextTurn(); 

    rollSpy = jest.spyOn(Dice.prototype, 'roll').mockReturnValue(3);
    game.nextTurn();

    const playerPosition = game.getPlayerPosition(1);
    expect(playerPosition).toBe(100); 

    rollSpy.mockRestore();
  });

  it('Should be able to remain in position until winning', () => {
    //Mocking dice roll
    let rollSpy = jest.spyOn(Dice.prototype, 'roll').mockReturnValue(96);

    game.addPlayer('Alice');
    game.nextTurn(); 

    rollSpy = jest.spyOn(Dice.prototype, 'roll').mockReturnValue(4);
    game.nextTurn();

    const playerPosition = game.getPlayerPosition(1);
    expect(playerPosition).toBe(97); 

    rollSpy.mockRestore();
  });

  it('Given the player rolls a 4, their token should move 4 spaces', () => {
    //Mocking dice roll
    const rollSpy = jest.spyOn(Dice.prototype, 'roll').mockReturnValue(4);

    game.addPlayer('Alice');
    game.nextTurn(); 
    
    const playerPosition = game.getPlayerPosition(1); 
    //Player starts at position 1 and moves 4 spaces
    expect(playerPosition).toBe(5); 

    rollSpy.mockRestore();
  });


});
