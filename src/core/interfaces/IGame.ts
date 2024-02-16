export interface TurnResult{
    currentPlayer: string;
    isWinner: boolean;
    playerMoves: boolean;
    prevPosition: number;
    newPosition: number;
    diceRoll: number;
}

export interface Score{
    ranking: number;
    name: string;
    position: number;
}

export interface MoveResult{
    playerMoves: boolean;
    playerPosition: number;
}

