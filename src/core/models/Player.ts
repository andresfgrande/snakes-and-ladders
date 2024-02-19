export default class Player{
    private id: number;
    private name: string;
    private position: number;

    constructor(id: number, name: string, position: number){
        this.id = id;
        this.name = name;
        this.position = position;
    }

    public getId(): number {
        return this.id;
    }

    public getPosition(): number{
        return this.position;
    }

    public setPosition(position: number){
        this.position = position;
    }

    public setName(name: string): void{
        this.name = name;
    }

    public getName(): string{
        return this.name;
    }
}