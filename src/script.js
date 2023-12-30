const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const backgroundImage = document.getElementById('backgroundImage');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 45; // TODO: why does the height need adjustment? Maybe image size?

const player = new Player();
const projectiles = [];
const enemies = [];

const startGameButton = document.getElementById('startGameButton');
let gameStarted = false;

function createRandomEnemies() {
    const enemy = new Enemy(Math.random() * (canvas.width - settings.enemySize), 
                            Math.random() * (canvas.height - settings.enemySize));
    enemies.push(enemy);
}

function updateScoreDisplay() {
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
        scoreElement.textContent = score.value;
    }
}

function isCollision(circle, rect) {
    const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
    const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));

    const distanceX = circle.x - closestX;
    const distanceY = circle.y - closestY;
    const distanceSquagreen = distanceX * distanceX + distanceY * distanceY;

    return distanceSquagreen < (circle.radius * circle.radius);
}

function showResetButton() {
    // TODO
}

function checkWinCondition() {
    const allEnemiesShot = enemies.every(enemy => {
        return enemy.isHit;
    });

    if (allEnemiesShot) {
        messageArea.innerHTML = 'Congratulations! You cleared all the enemies!';
        messageArea.classList.add('success');
        messageArea.style.display = 'block';
        showStartButton();
    } 
}

function changeBackground() {
    var select = document.getElementById("backgroundSelect");
    var selectedOption = select.options[select.selectedIndex].value;

    if (selectedOption === "space") {
        document.getElementById("backgroundImage").src = "../src/assets/backgrounds/space.jpg";
    } else if (selectedOption === "cloudy_sky") {
        document.getElementById("backgroundImage").src = "../src/assets/backgrounds/cloudy_sky.jpg";
    } else if (selectedOption === "beach") {
        document.getElementById("backgroundImage").src = "../src/assets/backgrounds/beach.jpg";
    } else if (selectedOption === "city") {
        document.getElementById("backgroundImage").src = "../src/assets/backgrounds/city.jpg";
    } else if (selectedOption === "grassy_fields") {
        document.getElementById("backgroundImage").src = "../src/assets/backgrounds/grassy_fields.jpg";
    }
}



// const startGameButton = document.getElementById('startGameButton');
// startGameButton.addEventListener('click', function () {
    // const backgroundMusic = document.getElementById('backgroundMusic');

    // Unmute the audio
    // backgroundMusic.muted = false;

    // Additional code to start the game can go here

    // Hide the button after the game starts
    // startGameButton.style.display = 'none';

    // Show the canvas and other game elements
//     canvas.style.display = 'block';
//     document.getElementById('backgroundImage').style.display = 'block';
//     document.getElementById('playerImage').style.display = 'block';
// });

function drawEnemies() {
    for (const enemy of enemies) {
        enemy.draw();

        // Check for collision with player
        if (!enemy.isHit && isCollision(player, enemy)) {
            enemy.isHit = true;
            score.value += 1;
            updateScoreDisplay();
        }
    }
}

function initEnemies() {
    // Create initial random enemies
    for (let i = 0; i < settings.totalEnemies; i++) {
        createRandomEnemies();
    }
}

function drawProjectiles() {
    for (let i = projectiles.length - 1; i >= 0; i--) {
        const projectile = projectiles[i];

        // Move the projectile
        projectile.x += projectile.velocityX;
        projectile.y += projectile.velocityY;

        // Draw the projectile
        ctx.fillStyle = projectile.color;
        ctx.beginPath();
        ctx.arc(projectile.x, projectile.y, projectile.radius, 0, Math.PI * 2);
        ctx.fill();

        // Check for collision with enemies
        for (let j = enemies.length - 1; j >= 0; j--) {
            const enemy = enemies[j];

            if (!enemy.isHit && isCollision(projectile, enemy)) {
                enemy.isHit = true;
                score.value += 1;
                updateScoreDisplay();

                // Remove the projectile when it hits a enemy
                projectiles.splice(i, 1);

                // Remove the enemy from the array
                enemies.splice(j, 1);
                        
                break; // Break the inner loop, as the projectile can only hit one enemy
            }
        }

        // Remove the projectile if it goes out of bounds
        if (
            projectile.x - projectile.radius > canvas.width ||
            projectile.x + projectile.radius < 0 ||
            projectile.y - projectile.radius > canvas.height ||
            projectile.y + projectile.radius < 0
        ) {
            projectiles.splice(i, 1);
        }
    }
}

function setupUI() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

function drawPlayer() {
    player.draw();
    drawProjectiles();
    if (player.shootingCooldown > 0) {
        player.shootingCooldown--;
    }
}

function showStartButton() {
    startGameButton.hidden = false;
}

function hideStartButton() {
    startGameButton.hidden = true;
}

function hideWinningMessage() {
    // messageArea.hidden = true;
    messageArea.style.display = 'none';
}

function startGame() {
    gameStarted = true;
    hideStartButton();
    hideWinningMessage();

    initEnemies()
    update();
}

startGameButton.addEventListener('click', startGame);

//  #########################################   //
//              Main Game Loop                  //
//  #########################################   //
function update() {
    if (!gameStarted) {
        return;
    }

    setupUI();
    drawPlayer();
    drawEnemies();
    checkWinCondition();

    requestAnimationFrame(update);
}



//  #########################################   //
//              Start Game                      //
//  #########################################   //

update();
