export default class Player{
    id: number;
    name: string;
    position: number;

    constructor(id: number, name: string, position: number){
        this.id = id;
        this.name = name;
        this.position = position;
    }

    public setPosition(position: number){
        this.position = position;
    }

    public setName(name: string){
        this.name = name;
    }
}