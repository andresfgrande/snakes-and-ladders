export default class Board {
    private size: number;

    public snakes: Map<number, number> = new Map();
    public ladders: Map<number, number> = new Map();
    
    constructor(size: number) {
        this.size = size;
        this.generateSnakes(8);
        this.generateLadders(8); 
    }

    public getSize(): number {
        return this.size;
    }

    public setSize(size: number) {
        this.size = size;
    }

    private generateSnakes(count: number) {
        for (let i = 0; i < count; ) {
            let start = this.randomPosition();
            let end = this.randomPosition();
            
            if (start > end && start < this.size && end > 1 && !this.snakes.has(start) && !this.ladders.has(start)) {
                this.snakes.set(start, end);
                i++;
            }
        }
    }

    private generateLadders(count: number) {
        for (let i = 0; i < count; ) {
            let start = this.randomPosition();
            let end = this.randomPosition();
            
            if (start < end && start > 1 && end < this.size && !this.ladders.has(start) && !this.snakes.has(start)) {
                this.ladders.set(start, end);
                i++;
            }
        }
    }

    private randomPosition(): number {
        return Math.floor(Math.random() * (this.size - 2)) + 2;
    }
}
