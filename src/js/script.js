const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const score = {
    value: 0,
    x: 20,
    y: 20,
    color: 'blue',
    draw: function () {
        ctx.fillStyle = this.color;
        ctx.font = '24px Arial';
        ctx.fillText('Score: ' + this.value, this.x, this.y);
    }
};

const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    targetX: canvas.width / 2,
    targetY: canvas.height / 2,
    width: 32,
    height: 32,
    color: 'blue',
    speed: 5,
    draw: function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};

const blocks = [];
const blockSize = 40;

function createRandomBlock(color) {
    const block = {
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height),
        width: blockSize,
        height: blockSize,
        color: color,
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

function isCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

const keyState = {};

window.addEventListener('keydown', function (e) {
    keyState[e.key] = true;
});

window.addEventListener('keyup', function (e) {
    keyState[e.key] = false;
});

window.addEventListener('mousemove', function (e) {
    player.targetX = e.clientX - player.width / 2;
    player.targetY = e.clientY - player.height / 2;
});

function update() {
    if (!keyState['ArrowUp'] && !keyState['ArrowDown'] && !keyState['ArrowLeft'] && !keyState['ArrowRight']) {
        // If no arrow key is pressed, update the player position based on mouse input
        // player.x += (player.targetX - player.x) * 0.1;
        // player.y += (player.targetY - player.y) * 0.1;
    }

    // Handle arrow key input
    if (keyState['ArrowUp']) {
        player.y -= player.speed;
    } else if (keyState['ArrowDown']) {
        player.y += player.speed;
    }

    if (keyState['ArrowLeft']) {
        player.x -= player.speed;
    } else if (keyState['ArrowRight']) {
        player.x += player.speed;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00FF00';
    ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

    score.draw();

    for (const block of blocks) {
        block.draw();
        if (!block.isPickedUp && isCollision(player, block)) {
            block.isPickedUp = true;
            score.value += 1;
        }
    }

    player.draw();

    requestAnimationFrame(update);
}

for (let i = 0; i < 10; i++) {
    createRandomBlock('red');
    createRandomBlock('yellow');
}

update();

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});