const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const backgroundImage = document.getElementById('backgroundImage');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 48;

const player = new Player();

// Projectiles
const projectiles = [];
const blocks = [];

function createRandomBlock() {
    const block = new Enemy(Math.random() * (canvas.width - settings.blockSize), 
                            Math.random() * (canvas.height - settings.blockSize), 
                            settings.blockColor);
    blocks.push(block);
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
    const allBlocksPickedUp = blocks.every(block => {
        return block.isPickedUp;
    });

    if (allBlocksPickedUp) {
        messageArea.innerHTML = 'Congratulations! You cleared all the enemies!';
        messageArea.classList.add('success');
        messageArea.style.display = 'block';
        // showResetButton();
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
    for (const block of blocks) {
        block.draw();

        // Check for collision with player
        if (!block.isPickedUp && isCollision(player, block)) {
            block.isPickedUp = true;
            score.value += 1;
            updateScoreDisplay();
        }
    }
}

function initEnemies() {
    // Create initial random blocks
    for (let i = 0; i < settings.totalBlocks; i++) {
        createRandomBlock();
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

        // Check for collision with blocks
        for (let j = blocks.length - 1; j >= 0; j--) {
            const block = blocks[j];

            if (!block.isPickedUp && isCollision(projectile, block)) {
                block.isPickedUp = true;
                score.value += 1;
                updateScoreDisplay();
                // Remove the projectile when it hits a block
                projectiles.splice(i, 1);

                // Remove the block from the array
                blocks.splice(j, 1);
                
                console.log(`Block: Color - ${block.color}, Picked Up - ${block.isPickedUp}`);
            
                break; // Break the inner loop, as the projectile can only hit one block
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

function handleShooting() {
    // Handle shooting cooldown
    if (player.shootingCooldown > 0) {
        player.shootingCooldown--;
    }

    // Handle shooting
    if (keyState[' ']) {
        player.shoot();
    }
}

function setupUI() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

function drawPlayer() {
    player.draw();
    drawProjectiles();
    handleShooting();
}

//  #########################################   //
//              Main Game Loop                  //
//  #########################################   //
function update() {
    setupUI();

    drawPlayer();
    drawEnemies();

    checkWinCondition();
    requestAnimationFrame(update);
}

//  #########################################   //
//              Start Game                      //
//  #########################################   //
initEnemies()
update();
