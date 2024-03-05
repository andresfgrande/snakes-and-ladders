export interface TurnResult{
    playerName: string;
    isWinner: boolean;
    playerMoves: boolean;
    prevPosition: number;
    newPosition: number;
    diceRoll: number;
    steppedIn: string;
    start: number ;
    end: number ;
}

export interface Score{
    ranking: number;
    name: string;
    position: number;
}

export interface MoveResult{
    playerMoves: boolean;
    playerPosition: number;
    steppedIn: string;
    start: number ;
    end: number ;
}

