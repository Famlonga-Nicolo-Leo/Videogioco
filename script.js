const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Dimensioni canvas
canvas.width = 800;
canvas.height = 400;

// Aggiungi queste definizioni mancanti
const players = {
    p1: {
        x: 100,
        y: 300,
        width: 60,
        height: 120,
        isBlocking: false,
        facing: 'right'
    },
    p2: {
        x: 700,
        y: 300,
        width: 60,
        height: 120,
        isBlocking: false,
        facing: 'left'
    }
};

// Aggiungi i controlli mancanti
const controls = {
    p1: { left: 'a', right: 'd' },
    p2: { left: 'ArrowLeft', right: 'ArrowRight' }
};

let gameState = {
    isFighting: true,
    timer: 99
};

// Input tastiera
const keys = {};
document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

function handleInput(player, controls) {
    // Movimento
    if (keys[controls.left]) {
        player.x -= 5;
        player.facing = 'left';
    }
    if (keys[controls.right]) {
        player.x += 5;
        player.facing = 'right';
    }
}

function drawPlayer(player) {
    ctx.fillStyle = player.isBlocking ? '#555' : '#fff';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function gameLoop() {
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    handleInput(players.p1, controls.p1);
    handleInput(players.p2, controls.p2);
    
    drawPlayer(players.p1);
    drawPlayer(players.p2);
    requestAnimationFrame(gameLoop);
}

// Avvia il gioco
gameLoop();