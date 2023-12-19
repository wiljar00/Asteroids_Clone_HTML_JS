// Get the canvas element
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set the canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Player object
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 32,
    height: 32,
    color: 'red',
    speed: 5,
    draw: function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};

// Block object
const blocks = [];
const blockSize = 20;

// Function to create a random block
function createRandomBlock() {
    const block = {
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height / 2), // Place blocks in the top half of the canvas
        width: blockSize,
        height: blockSize,
        color: 'green',
        isPickedUp: false,
        draw: function () {
            if (!this.isPickedUp) {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }
    };
    blocks.push(block);
}

// Function to check collision between two rectangles
function isCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

// Handle keyboard input
window.addEventListener('keydown', function (e) {
    switch (e.key) {
        case 'ArrowUp':
            player.y -= player.speed;
            break;
        case 'ArrowDown':
            player.y += player.speed;
            break;
        case 'ArrowLeft':
            player.x -= player.speed;
            break;
        case 'ArrowRight':
            player.x += player.speed;
            break;
    }
});

// Update function
function update() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the background (grass)
    ctx.fillStyle = '#00FF00'; // Green for grass
    ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

    // Draw and update blocks
    for (const block of blocks) {
        block.draw();

        // Check for collision with player
        if (!block.isPickedUp && isCollision(player, block)) {
            block.isPickedUp = true;
            // Add your logic for what happens when a block is picked up
        }
    }

    // Draw the player
    player.draw();

    // Request the next animation frame
    requestAnimationFrame(update);
}

// Create initial random blocks
for (let i = 0; i < 5; i++) {
    createRandomBlock();
}

// Start the game loop
update();

// Handle window resize
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
