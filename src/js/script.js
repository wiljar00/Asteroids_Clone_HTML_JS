// Get the canvas element
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const backgroundImage = document.getElementById('backgroundImage');

// Set the canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const totalBlocks = 10;

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
    // Check if all green blocks are picked up
    const allgreenBlocksPickedUp = blocks.every(block => {
        return block.color === 'green' && block.isPickedUp;
    });

    // Check if any black blocks are picked up
    const anyblackBlocksPickedUp = blocks.some(block => {
        return block.color === 'black' && block.isPickedUp;
    });

    if (allgreenBlocksPickedUp && !anyblackBlocksPickedUp) {
        // Display a message in the message area for winning
        messageArea.innerHTML = 'Congratulations! You picked up all green blocks and avoided the black ones!';
        messageArea.classList.add('success');
        messageArea.style.display = 'block';
    } else if (anyblackBlocksPickedUp) {
        // Display a message in the message area for losing
        messageArea.innerHTML = 'Game Over! You picked up a black block!';
        messageArea.classList.add('failure');
        messageArea.style.display = 'block';
    }
}


const keyState = {};

// Handle keyboard input
window.addEventListener('keydown', function (e) {
    console.log("key keydown listener")
    keyState[e.key] = true;
});

window.addEventListener('keyup', function (e) {
    console.log("key keyup listener")
    keyState[e.key] = false;
});

// Handle mouse move for smoother target movement
window.addEventListener('mousemove', function (e) {
    player.targetX = e.clientX - player.width / 2;
    player.targetY = e.clientY - player.height / 2;

    // Update player rotation based on mouse position
    const dx = player.targetX - (player.x + player.width / 2);
    const dy = player.targetY - (player.y + player.height / 2);
    player.rotation = Math.atan2(dy, dx);
});

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

// Update function
function update() {

    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Handle shooting cooldown
    if (player.shootingCooldown > 0) {
        player.shootingCooldown--;
    }

    // Handle shooting
    if (keyState[' ']) {
        player.shoot();
    }

    // Draw the score
    score.draw();

    // Handle arrow key input for movement
    if (keyState['W']) {
        console.log("key w pressed")
        player.y -= player.speed;
    } else if (keyState['S']) {
        console.log("key s pressed")
        player.y += player.speed;
    }

    if (keyState['A']) {
        console.log("key a pressed")
        player.x -= player.speed;
    } else if (keyState['D']) {
        console.log("key d pressed")
        player.x += player.speed;
    }

    // Update player rotation based on mouse position
    const dx = player.targetX - (player.x + player.width / 2);
    const dy = player.targetY - (player.y + player.height / 2);
    player.rotation = Math.atan2(dy, dx);

    // Draw and update blocks
    for (const block of blocks) {
        block.draw();

        // Check for collision with player
        if (!block.isPickedUp && isCollision(player, block)) {
            if (block.color === 'green') {
                block.isPickedUp = true;
                score.value += 1;
            } else {
                block.isPickedUp = true;
                score.value -= 1;
            }
        }
    }

    // Draw the player
    player.draw();

    // Draw and update projectiles
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
                if (block.color === 'green') {
                    block.isPickedUp = true;
                    score.value += 1;
                    console.log(`Block: Color - ${block.color}, Picked Up - ${block.isPickedUp}`);

                } else {
                    block.isPickedUp = true;
                    score.value -= 1;
                    console.log(`Block: Color - ${block.color}, Picked Up - ${block.isPickedUp}`);

                }
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

    // Check win condition
    checkWinCondition();

    requestAnimationFrame(update);
}

// Create initial random blocks
for (let i = 0; i < totalBlocks; i++) {
    createRandomBlock('green');
    createRandomBlock('black');
}

update();

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});