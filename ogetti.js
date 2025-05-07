// Rettangolo 1 (Player 1 - Rosso)
const rettangolo1 = {
    // Posizione iniziale (x, y) e dimensioni del rettangolo
    x: 100,
    y: 250,
    width: 40,
    height: 80,
    color: 'red', // Colore del rettangolo
    speedX: 0,    // Velocità orizzontale (dx/sx)
    speedY: 0,    // Velocità verticale (su/giù)
    gravity: 0.4, // Gravità (quanto influenzerà la velocità in Y ogni frame)
    isJumping: false, // Se il rettangolo sta saltando
    isCrouching: false, // Se il rettangolo è accovacciato
    originalHeight: 80, // Altezza originale del rettangolo (usato per ripristinare altezza)
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

    // Funzione che aggiorna la posizione e disegna il rettangolo
    update: function() {
        // Applica la gravità aumentando la velocità verticale (speedY)
        this.speedY += this.gravity;
        // Aggiunge la velocità verticale alla posizione Y
        this.y += this.speedY;

        // Ferma il rettangolo quando tocca il terreno (y = 300 è la base della canvas)
        if (this.y + this.height > 300) {
            this.y = 300 - this.height; // Posiziona il rettangolo sopra il terreno
            this.speedY = 0; // Ferma la velocità verticale
            this.isJumping = false; // Il rettangolo non sta più saltando
        }

        // Aggiorna la posizione orizzontale in base alla velocità orizzontale (speedX)
        this.x += this.speedX;

        // Disegna il rettangolo sulla canvas
        const ctx = myGameArea.context;
        ctx.fillStyle = this.color; // Imposta il colore
        ctx.fillRect(this.x, this.y, this.width, this.height); // Disegna il rettangolo

        updateCombat(this);
        disegna_attacco(this);
    }
};

// Rettangolo 2 (Player 2 - Verde)
const rettangolo2 = {
    // Posizione iniziale (x, y) e dimensioni del rettangolo
    x: 660,
    y: 250,
    width: 40,
    height: 80,
    color: 'green', // Colore del rettangolo
    speedX: 0,    // Velocità orizzontale (dx/sx)
    speedY: 0,    // Velocità verticale (su/giù)
    gravity: 0.4, // Gravità (quanto influenzerà la velocità in Y ogni frame)
    isJumping: false, // Se il rettangolo sta saltando
    isCrouching: false, // Se il rettangolo è accovacciato
    originalHeight: 80, // Altezza originale del rettangolo (usato per ripristinare altezza)
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


    // Funzione che aggiorna la posizione e disegna il rettangolo
    update: function() {
        // Applica la gravità aumentando la velocità verticale (speedY)
        this.speedY += this.gravity;
        // Aggiunge la velocità verticale alla posizione Y
        this.y += this.speedY;

        // Ferma il rettangolo quando tocca il terreno (y = 300 è la base della canvas)
        if (this.y + this.height > 300) {
            this.y = 300 - this.height; // Posiziona il rettangolo sopra il terreno
            this.speedY = 0; // Ferma la velocità verticale
            this.isJumping = false; // Il rettangolo non sta più saltando
        }

        // Aggiorna la posizione orizzontale in base alla velocità orizzontale (speedX)
        this.x += this.speedX;

        // Disegna il rettangolo sulla canvas
        const ctx = myGameArea.context;
        ctx.fillStyle = this.color; // Imposta il colore
        ctx.fillRect(this.x, this.y, this.width, this.height); // Disegna il rettangolo

        updateCombat(this);
        disegna_attacco(this);
    }
};
