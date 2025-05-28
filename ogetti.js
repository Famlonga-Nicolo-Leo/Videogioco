// 🖼️ Caricamento immagini
const idleFrames = [];
const walkFrames = [];
const punchFrames = [];

const kickImg = new Image();
kickImg.src = './sprites/c1.png';

const jumpImg = new Image();
jumpImg.src = './sprites/sa1.png';

const crouchImg = new Image();
crouchImg.src = './sprites/ac1.png';

for (let i = 1; i <= 4; i++) {
    const idleImg = new Image();
    idleImg.src = `./sprites/s${i}.png`;
    idleFrames.push(idleImg);

    const walkImg = new Image();
    walkImg.src = `./sprites/w${i}.png`;
    walkFrames.push(walkImg);

    const punchImg = new Image();
    punchImg.src = `./sprites/p${i}.png`;
    punchFrames.push(punchImg);
}

// 🟥 Player 1 (con animazioni camminata + idle + pugno + salto + calcio)
const rettangolo1 = {
    x: 100,
    y: 250,
    width: 70,
    height: 50,
    color: 'red',
    speedX: 0,
    speedY: 0,
    gravity: 0.4,
    isJumping: false,
    isCrouching: false,
    health: 100,
    maxHealth: 100,
    isAttacking: false,
    attackType: null,
    attackCooldown: 0,
    attackDamage: {
        punch: 10,
        kick: 15
    },
    attackHitbox: {
        punch: { x: 0, y: 0, width: 0, height: 0 },
        kick: { x: 0, y: 0, width: 0, height: 0 }
    },
    destra: true,
    frameIndex: 0,
    frameTimer: 0,
    frameInterval: 25,

    update: function () {
        this.speedY += this.gravity;
        this.y += this.speedY;

        if (this.y + this.height > 300) {
            this.y = 300 - this.height;
            this.speedY = 0;
            this.isJumping = false;
        }

        this.x += this.speedX;

        const ctx = myGameArea.context;

        this.frameTimer++;
        if (this.frameTimer >= this.frameInterval) {
            this.frameTimer = 0;
            this.frameIndex++;
        }

        // Attacchi (come prima)
        if (this.isAttacking && this.attackType === 'punch') {
            if (this.frameIndex >= punchFrames.length) {
                this.isAttacking = false;
                this.attackCooldown = 30;
                this.frameIndex = 0;
            } else {
                ctx.drawImage(punchFrames[this.frameIndex], this.x, this.y, this.width, this.height);
                return;
            }
        } else if (this.isAttacking && this.attackType === 'kick') {
            ctx.drawImage(kickImg, this.x, this.y, this.width, this.height);
            this.frameIndex++;
            if (this.frameIndex > 15) {
                this.isAttacking = false;
                this.attackCooldown = 40;
                this.frameIndex = 0;
            }
            return;
        }

        // Mostra sprite accovacciato se isCrouching true
        if (this.isCrouching && this.speedY === 0) {
            ctx.drawImage(crouchImg, this.x, this.y, this.width, this.height);
            return;
        }

        // Camminata
        if (this.speedX !== 0 && this.speedY === 0) {
            if (this.frameIndex >= walkFrames.length) this.frameIndex = 0;
            ctx.drawImage(walkFrames[this.frameIndex], this.x, this.y, this.width, this.height);
        }
        // Salto
        else if (this.isJumping || this.speedY !== 0) {
            ctx.drawImage(jumpImg, this.x, this.y, this.width, this.height);
            this.frameIndex = 0;
            this.frameTimer = 0;
        }
        // Idle
        else {
            if (this.frameIndex >= idleFrames.length) this.frameIndex = 0;
            ctx.drawImage(idleFrames[this.frameIndex], this.x, this.y, this.width, this.height);
        }

        updateCombat(this);
    }

};

// 🟩 Player 2 (resta statico, usa idle frame)
const rettangolo2 = {
    x: 660,
    y: 250,
    width: 90,
    height: 300,
    color: 'green',
    speedX: 0,
    speedY: 0,
    gravity: 0.4,
    isJumping: false,
    health: 100,
    maxHealth: 100,
    isAttacking: false,
    attackType: null,
    attackCooldown: 0,
    attackDamage: {
        punch: 10,
        kick: 15
    },
    attackHitbox: {
        punch: { x: 0, y: 0, width: 0, height: 0 },
        kick: { x: 0, y: 0, width: 0, height: 0 }
    },
    destra: true,
    frameIndex: 0,
    frameTimer: 0,
    frameInterval: 20,

    update: function () {
        this.speedY += this.gravity;
        this.y += this.speedY;

        if (this.y + this.height > 300) {
            this.y = 300 - this.height;
            this.speedY = 0;
            this.isJumping = false;
        }

        this.x += this.speedX;

        const ctx = myGameArea.context;

        if (this.speedX === 0 && this.speedY === 0 && !this.isJumping) {
            this.frameTimer++;
            if (this.frameTimer >= this.frameInterval) {
                this.frameTimer = 0;
                this.frameIndex = (this.frameIndex + 1) % idleFrames.length;
            }
            ctx.drawImage(idleFrames[this.frameIndex], this.x, this.y, this.width, this.height);
        } else {
            ctx.drawImage(idleFrames[0], this.x, this.y, this.width, this.height);
        }

        updateCombat(this);
    }
};

// Sistema di combattimento
function updateCombat(player) {
    if (player.attackCooldown > 0) {
        player.attackCooldown--;
    }

    // Aggiorna le hitbox degli attacchi in base alla direzione
    if (player.destra) {
        player.attackHitbox.punch = {
            x: player.x + player.width,
            y: player.y + 20,
            width: 30,
            height: 20
        };
        player.attackHitbox.kick = {
            x: player.x + player.width,
            y: player.y + 40,
            width: 40,
            height: 20
        };
    } else {
        player.attackHitbox.punch = {
            x: player.x - 30,
            y: player.y + 20,
            width: 30,
            height: 20
        };
        player.attackHitbox.kick = {
            x: player.x - 40,
            y: player.y + 40,
            width: 40,
            height: 20
        };
    }
}

function disegna_attacco(player) {
    if (player.isAttacking) {
        const ctx = myGameArea.context;
        const hitbox = player.attackHitbox[player.attackType];
        ctx.fillRect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
    }
}

function attack(player, type) {
    if (!player.isAttacking && player.attackCooldown === 0) {
        player.isAttacking = true;
        player.attackType = type;
        player.frameIndex = 0;      // reset animazione attacco
        player.frameTimer = 0;
        checkHit(player);
    }
}

function checkHit(attacker) {
    const defender = (attacker === rettangolo1) ? rettangolo2 : rettangolo1;

    if (attacker.isAttacking) {
        const attackHitbox = attacker.attackHitbox[attacker.attackType];

        if (attackHitbox.x < defender.x + defender.width &&
            attackHitbox.x + attackHitbox.width > defender.x &&
            attackHitbox.y < defender.y + defender.height &&
            attackHitbox.y + attackHitbox.height > defender.y) {

            defender.health -= attacker.attackDamage[attacker.attackType];

            const knockback = (attacker === rettangolo1) ? 5 : -5;
            defender.x += knockback;

            if (defender.x < 0) defender.x = 0;
            if (defender.x + defender.width > myGameArea.canvas.width) {
                defender.x = myGameArea.canvas.width - defender.width;
            }

            if (defender.health <= 0) {
                defender.health = 0;
                clearInterval(interval);
                alert("Game over!");
            }
        }
    }
}

function vita() {
    const ctx = myGameArea.context;
    const barWidth = 200;
    const barHeight = 20;
    const padding = 20;

    // Barra del Player 1
    ctx.fillStyle = 'black';
    ctx.fillRect(padding, padding, barWidth, barHeight);
    ctx.fillStyle = 'red';
    const vitap1 = (rettangolo1.health / rettangolo1.maxHealth) * barWidth;
    ctx.fillRect(padding, padding, vitap1, barHeight);

    // Barra del Player 2
    ctx.fillStyle = 'black';
    ctx.fillRect(myGameArea.canvas.width - barWidth - padding, padding, barWidth, barHeight);
    ctx.fillStyle = 'green';
    const vitap2 = (rettangolo2.health / rettangolo2.maxHealth) * barWidth;
    ctx.fillRect(myGameArea.canvas.width - barWidth - padding + (barWidth - vitap2), padding, vitap2, barHeight);
}
