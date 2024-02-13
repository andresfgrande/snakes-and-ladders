export default class Dice{
    sides: number;
    constructor(sides: number){
        this.sides = sides;
    }
    public roll(){
        return Math.floor(Math.random() * this.sides) + 1;
    }
}