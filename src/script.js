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

    // Add the changeBackground function here
    function changeBackground() {
        var select = document.getElementById("backgroundSelect");
        var selectedOption = select.options[select.selectedIndex].value;

        // Update the background image source based on the selected option
        if (selectedOption === "cloudy_sky") {
            document.getElementById("backgroundImage").src = "../src/assets/backgrounds/cloudy_sky.jpg";
        } else if (selectedOption === "space") {
            document.getElementById("backgroundImage").src = "../src/assets/backgrounds/space.jpg";
        }
        // Add more conditions for other background options as needed
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

function drawBlocks() {
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

// Update function
function update() {

    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Handle shooting
    handleShooting();

    // Draw the score
    score.draw();

    // Draw and update blocks
    drawBlocks()

    // Draw the player
    player.draw();

    // Draw and update projectiles
    drawProjectiles();

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