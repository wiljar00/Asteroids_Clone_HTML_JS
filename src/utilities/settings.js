// Initialize settings
var settings = {
    totalEnemies: 1,
    enemySize: 75, 
    enemyImagePath: '../src/assets/enemy.png',
    playerSpeed: 10,
    bullet_speed: 15,
    bullet_size: 10,
    shootingCooldown: 1
};

function resetSettings() {
    settings = {
        totalEnemies: 1,
        enemySize: 75, 
        enemyImagePath: '../src/assets/enemy.png',
        playerSpeed: 10,
        bullet_speed: 15,
        bullet_size: 10,
        shootingCooldown: 1
    };
}

// Export settings and reset function
window.settings = settings;
window.resetSettings = resetSettings;
