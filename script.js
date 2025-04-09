const myGameArea = {
    canvas: document.getElementById("gameCanvas"), // Seleziona il canvas dalla pagina tramite l'ID
    keys: {}, // Oggetto per tenere traccia dei tasti premuti

    start: function() {
        this.canvas.width = 800; // Imposta larghezza del canvas
        this.canvas.height = 400; // Imposta altezza del canvas
        this.context = this.canvas.getContext("2d"); // Ottiene il contesto grafico per disegnare

        // Inserisce il canvas in cima alla pagina (prima di tutto il resto nel body)
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        
        // Quando premi un tasto, lo segna come "true" in this.keys
        window.addEventListener('keydown', (e) => {
            this.keys[e.keyCode] = true;
        });

        // Quando rilasci un tasto, lo segna come "false"
        window.addEventListener('keyup', (e) => {
            this.keys[e.keyCode] = false;
        });

        // Chiama la funzione updateGameArea ogni 20 millisecondi (cioè 50 volte al secondo)
        this.interval = setInterval(updateGameArea, 20);
    },

    clear: function() {
        this.context.fillStyle = '#222'; // Imposta il colore di sfondo (grigio scuro)
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height); // Pulisce il canvas disegnando sopra lo sfondo

        this.context.fillStyle = '#555'; // Colore del "terreno"
        this.context.fillRect(0, 300, this.canvas.width, 2); // Disegna una linea orizzontale che rappresenta il terreno
    }
};

function updateGameArea() {
    myGameArea.clear(); // Pulisce e ridisegna lo sfondo e il terreno
    aggiornaMovimento(); // Gestisce il movimento dei rettangoli in base ai tasti premuti
    rettangolo1.update(); // Aggiorna posizione e disegno del giocatore 1
    rettangolo2.update(); // Aggiorna posizione e disegno del giocatore 2
}

function avvia() {
    myGameArea.start(); // Fa partire tutto: canvas, eventi tastiera, animazione
}

window.onload = avvia; // Quando la pagina ha finito di caricarsi, chiama avvia()
