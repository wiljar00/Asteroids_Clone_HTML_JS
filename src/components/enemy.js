class Enemy {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.width = settings.enemySize;
        this.height = settings.enemySize;
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

window.Enemu = Enemy;