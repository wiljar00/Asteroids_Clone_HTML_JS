const keyState = {};
const acceleration = 0.2; 
const friction = 0.1; 

function handleKeyDown(e) {
    keyState[e.key] = true;
}

function handleKeyUp(e) {
    keyState[e.key] = false;
}

function handleMouseMove(e, player) {
    player.targetX = e.clientX - player.width / 2;
    player.targetY = e.clientY - player.height / 2;

    const dx = player.targetX - (player.x + player.width / 2);
    const dy = player.targetY - (player.y + player.height / 2);
    player.rotation = Math.atan2(dy, dx);
}

function handleKeyInput(e, player) {
    switch (e.key) {
        case 'w':
            player.y -= player.speed;
            break;
        case 'a':
            player.x -= player.speed;
            break;
        case 's':
            player.y += player.speed;
            break;
        case 'd':
            player.x += player.speed;
            break;
    }

    // Apply friction to slow down the player gradually
    // player.velocityX *= 1 - friction;
    // player.velocityY *= 1 - friction;

    // Update the player's position based on velocity
    // player.x += player.velocityX;
    // player.y += player.velocityY;
}

// Export relevant variables and functions
window.keyState = keyState;
window.handleKeyDown = handleKeyDown;
window.handleKeyUp = handleKeyUp;
window.handleMouseMove = handleMouseMove;
window.handleKeyInput = handleKeyInput;

window.addEventListener('mousemove', function (e) {
    handleMouseMove(e, player);
});

// Add event listeners for keydown and keyup
window.addEventListener('keydown', function (e) {
    handleKeyDown(e);
    handleKeyInput(e, player);
});

window.addEventListener('keyup', function (e) {
    handleKeyUp(e);
});

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
