class Block {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.width = blockSize;
        this.height = blockSize;
        this.color = color;
        this.isPickedUp = false;
    }

    draw() {
        if (!this.isPickedUp) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    // Add other methods or properties as needed
}

window.Block = Block;