function Player() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.targetX = canvas.width / 2;
    this.targetY = canvas.height / 2;
    this.width = 100;
    this.height = 100;
    this.image = document.getElementById('playerImage'); 
    this.speed = settings.playerSpeed;
    this.shootingCooldown = 0;
    this.rotation = 0;
}

// Player class methods
Player.prototype.shoot = function () {
    if (this.shootingCooldown <= 0) {
        projectiles.push({
            x: this.x + this.width / 2,
            y: this.y + this.height / 2,
            radius: settings.bullet_size,
            color: 'yellow',
            velocityX: Math.cos(this.rotation) * settings.bullet_speed,
            velocityY: Math.sin(this.rotation) * settings.bullet_speed
        });

        this.shootingCooldown = settings.shootingCooldown; 
    }
};

Player.prototype.draw = function () {
    ctx.save(); // Save the current context state
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(this.rotation);

    // Rotate the image 90 degrees (in radians)
    ctx.rotate(Math.PI / 2);

    // Draw the player image
    ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);

    ctx.restore(); // Restore the context state
};

window.Player = Player;