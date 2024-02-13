export default class Player{
    id: number;
    name: string;
    position: number;

    constructor(id: number, name: string, position: number){
        this.id = id;
        this.name = name;
        this.position = position;
    }

    setPosition(position: number){
        this.position = position;
    }

    setName(name: string){
        this.name = name;
    }
}