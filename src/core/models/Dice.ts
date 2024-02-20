export default class Dice{
    private sides: number;

    constructor(sides: number){
        this.sides = sides;
    }

    public roll(): number{
        return Math.floor(Math.random() * this.sides) + 1;
    }

    public getSides(): number{
        return this.sides;
    }

    public setSides(sides: number): void{
        this.sides = sides;
    }
}