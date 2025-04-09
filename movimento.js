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
}

function controlliRettangolo2() {
    // --- Movimento orizzontale per Player 2 (freccia sinistra e destra) ---
    if (myGameArea.keys[37] && rettangolo2.x > 0) { // Freccia sinistra premuta
        rettangolo2.speedX = -5;
    } else if (myGameArea.keys[39] && rettangolo2.x + rettangolo2.width < 800) { // Freccia destra
        rettangolo2.speedX = 5;
    } else {
        rettangolo2.speedX = 0;
    }

    // !!! Questo blocco è RIDONDANTE e sovrascrive quello sopra !!!
    // Se si è accovacciati, cambia solo la velocità in modo che sia più lenta
    if (myGameArea.keys[37] && rettangolo2.x > 0 && rettangolo2.isCrouching == true) {
        rettangolo2.speedX = -2.5; // Muovi a sinistra lentamente se accovacciato
    } else if (myGameArea.keys[39] && rettangolo2.x + rettangolo2.width < 800 && rettangolo2.isCrouching == true) {
        rettangolo2.speedX = 2; // Muovi a destra lentamente se accovacciato
    } else {
        rettangolo2.speedX = 0; // Nessun movimento
    }

    // --- Salto (freccia su) ---
    if (myGameArea.keys[38] && !rettangolo2.isJumping) {
        rettangolo2.speedY = -12;
        rettangolo2.isJumping = true;
    }

    // --- Abbassarsi (freccia giù) ---
    if (myGameArea.keys[40] && !rettangolo2.isJumping) {
        rettangolo2.height = 40; // Accovacciato → metà altezza
        rettangolo2.y = 300 - 40; // Adatta la posizione per stare a terra
        rettangolo2.isCrouching = true; // Segna che è accovacciato
    } else if (!rettangolo2.isJumping) {
        rettangolo2.height = 80; // Torna alla forma normale
        rettangolo2.y = 300 - 80;
        rettangolo2.isCrouching = false; // Non è più accovacciato
    }
}

function aggiornaMovimento() {
    controlliRettangolo1(); // Esegui i controlli per il primo giocatore
    controlliRettangolo2(); // Esegui i controlli per il secondo giocatore
}
