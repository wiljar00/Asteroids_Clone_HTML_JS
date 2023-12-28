// Get the canvas element
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const backgroundImage = document.getElementById('backgroundImage');

// Set the canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const totalBlocks = 10;
const blockColor = 'red'

// Create a new instance of the Player class
const player = new Player();

// Projectile array
const projectiles = [];

// Block object
const blocks = [];
const blockSize = 40;

// Function to create a random block
function createRandomBlock(color) {
    const block = new Block(Math.random() * canvas.width, Math.random() * canvas.height, color);
    blocks.push(block);
}

// Function to check collision between a rectangle and a circle
function isCollision(circle, rect) {
    const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
    const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));

    const distanceX = circle.x - closestX;
    const distanceY = circle.y - closestY;
    const distanceSquagreen = distanceX * distanceX + distanceY * distanceY;

    return distanceSquagreen < (circle.radius * circle.radius);
}

function checkWinCondition() {
    // Check if all blocks are picked up
    const allBlocksPickedUp = blocks.every(block => {
        return block.isPickedUp;
    });

    if (allBlocksPickedUp) {
        // Display a message in the message area for winning
        messageArea.innerHTML = 'Congratulations! You cleared all the enemies!';
        messageArea.classList.add('success');
        messageArea.style.display = 'block';
    } 
}

// Add the changeBackground function here
function changeBackground() {
    var select = document.getElementById("backgroundSelect");
    var selectedOption = select.options[select.selectedIndex].value;

    // Update the background image source based on the selected option
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
        }
    }
}

function initEnemies() {
    // Create initial random blocks
    for (let i = 0; i < totalBlocks; i++) {
        createRandomBlock(blockColor);
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
    score.draw();
}

function drawPlayer() {
    player.draw();
    drawProjectiles();
    handleShooting();
}

// Update function
function update() {
    setupUI();

    drawPlayer();
    drawEnemies();

    checkWinCondition();
    requestAnimationFrame(update);
}

initEnemies()
update();

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});