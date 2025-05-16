function controlliRettangolo1() {
    // --- Movimento orizzontale per il Player 1 (tasti A e D) ---
    if (myGameArea.keys[65] && rettangolo1.x >= 0) { // Tasto 'A' premuto e non oltre il bordo sinistro
        rettangolo1.speedX = -5; // Muovi a sinistra
    } else if (myGameArea.keys[68] && rettangolo1.x + rettangolo1.width < 800) { // Tasto 'D' premuto e non oltre bordo destro
        rettangolo1.speedX = 5; // Muovi a destra
    } else {
        rettangolo1.speedX = 0; // Nessun tasto premuto → fermo
    }

    // --- Salto (tasto W) ---
    if (myGameArea.keys[87] && !rettangolo1.isJumping) { // Se premo 'W' e non sto già saltando
        rettangolo1.speedY = -12; // Spinta verso l’alto
        rettangolo1.isJumping = true; // Segna che ora sta saltando
    }

    // --- Abbassarsi (tasto S) ---
    if (myGameArea.keys[83] && !rettangolo1.isJumping) { // Se premo 'S' e non sto saltando
        rettangolo1.height = 40; // Riduci altezza per accovacciarsi
        rettangolo1.y = 300 - 40; // Correggi posizione per stare sul terreno
    } else if (!rettangolo1.isJumping) {
        rettangolo1.height = 80; // Torna alla forma normale
        rettangolo1.y = 300 - 80; // Riporta altezza a livello terreno
    }

    if (rettangolo1.speedX > 0) rettangolo1.destra = true;
    if (rettangolo1.speedX < 0) rettangolo1.destra = false;
    
    // Attacchi Player 1
    if (myGameArea.keys[81]) { // Q per pugno
        attack(rettangolo1, 'punch');
    }
    if (myGameArea.keys[69]) { // E per calcio
        attack(rettangolo1, 'kick');
    }
}

function controlliRettangolo2() {
    // --- Movimento orizzontale per Player 2 ---
    if (rettangolo2.isCrouching) {
        // Movimento quando accovacciato (più lento)
        if (myGameArea.keys[37] && rettangolo2.x > 0) {
            rettangolo2.speedX = -2.5; // Sinistra lento
        } else if (myGameArea.keys[39] && rettangolo2.x + rettangolo2.width < 800) {
            rettangolo2.speedX = 2; // Destra lento
        } else {
            rettangolo2.speedX = 0;
        }
    } else {
        // Movimento normale (non accovacciato)
        if (myGameArea.keys[37] && rettangolo2.x > 0) {
            rettangolo2.speedX = -5; // Sinistra normale
        } else if (myGameArea.keys[39] && rettangolo2.x + rettangolo2.width < 800) {
            rettangolo2.speedX = 5; // Destra normale
        } else {
            rettangolo2.speedX = 0;
        }
    }

    // --- Salto (freccia su) ---
    if (myGameArea.keys[38] && !rettangolo2.isJumping) {
        rettangolo2.speedY = -12;
        rettangolo2.isJumping = true;
    }

    // --- Abbassarsi (freccia giù) ---
    if (myGameArea.keys[40] && !rettangolo2.isJumping) {
        rettangolo2.height = 40;
        rettangolo2.y = 300 - 40;
        rettangolo2.isCrouching = true;
    } else if (!rettangolo2.isJumping) {
        rettangolo2.height = 80;
        rettangolo2.y = 300 - 80;
        rettangolo2.isCrouching = false;
    }

    if (rettangolo2.speedX > 0) rettangolo2.destra = true;
    if (rettangolo2.speedX < 0) rettangolo2.destra = false;//pugno sistemato
    
    // Attacchi Player 2
    if (myGameArea.keys[79]) { // O per pugno
        attack(rettangolo2, 'punch');
    }
    if (myGameArea.keys[80]) { // P per calcio
        attack(rettangolo2, 'kick');
    }
}

function aggiornaMovimento() {
    controlliRettangolo1(); // Esegui i controlli per il primo giocatore
    controlliRettangolo2(); // Esegui i controlli per il secondo giocatore
}