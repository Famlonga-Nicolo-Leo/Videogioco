// 🖼️ Caricamento immagini
const idleFrames = [];
const walkFrames = [];

for (let i = 1; i <= 4; i++) {
    const idleImg = new Image();
    idleImg.src = `./sprites/s${i}.png`;
    idleFrames.push(idleImg);

    const walkImg = new Image();
    walkImg.src = `./sprites/w${i}.png`;
    walkFrames.push(walkImg);
}

// 🟥 Player 1 (con animazioni camminata + idle)
const rettangolo1 = {
    x: 100,
    y: 250,
    width: 40,
    height: 80,
    color: 'red',
    speedX: 0,
    speedY: 0,
    gravity: 0.4,
    isJumping: false,
    isCrouching: false,
    originalHeight: 80,
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
    frameInterval: 10,

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

        // Animazione CAMMINATA
        if (this.speedX !== 0 && this.speedY === 0) {
            if (this.frameIndex >= walkFrames.length) this.frameIndex = 0;
            ctx.drawImage(walkFrames[this.frameIndex], this.x, this.y, this.width, this.height);
        }
        // Animazione IDLE
        else if (this.speedX === 0 && this.speedY === 0 && !this.isJumping) {
            if (this.frameIndex >= idleFrames.length) this.frameIndex = 0;
            ctx.drawImage(idleFrames[this.frameIndex], this.x, this.y, this.width, this.height);
        }
        // Salto → frame fisso
        else {
            ctx.drawImage(idleFrames[0], this.x, this.y, this.width, this.height);
            this.frameIndex = 0;
            this.frameTimer = 0;
        }

        updateCombat(this);
        disegna_attacco(this);
    }
};

// 🟩 Player 2 (resta statico, usa idle frame)
const rettangolo2 = {
    x: 660,
    y: 250,
    width: 40,
    height: 80,
    color: 'green',
    speedX: 0,
    speedY: 0,
    gravity: 0.4,
    isJumping: false,
    isCrouching: false,
    originalHeight: 80,
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
    frameInterval: 10,

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
        disegna_attacco(this);
    }
};
