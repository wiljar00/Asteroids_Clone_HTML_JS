class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = settings.enemySize;
        this.height = settings.enemySize;
        this.isHit = false;
        this.image = new Image();
        this.image.src = settings.enemyImagePath; 
    }

    draw() {
        if (!this.isHit) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
}

window.Enemy = Enemy;
