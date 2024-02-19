export default class Board{
    private size:number;
    
    constructor(size: number){
        this.size = size;
    }

    public getSize(): number{
        return this.size;
    }

    public setSize(size: number){
        this.size = size;
    }
}