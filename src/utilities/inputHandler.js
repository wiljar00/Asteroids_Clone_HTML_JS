// Your input handling code here

// Example:
const keyState = {};

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
        case 'W':
            player.y -= player.speed;
            break;
        case 'A':
            player.x -= player.speed;
            break;
        case 'S':
            player.y += player.speed;
            break;
        case 'D':
            player.x += player.speed;
            break;
    }
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
