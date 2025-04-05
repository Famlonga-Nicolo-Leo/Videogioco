const altezzasalto = 20;
const graivita = 5;

function movimentopg() {
    window.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowRight":
                if (pg1.x + pg1.width + pg1.speed <= canvas.width) { // Controlla il bordo destro
                    pg1.x += pg1.speed;
                }
                break;
            case "ArrowLeft":
                if (pg1.x - pg1.speed >= 0) { // Controlla il bordo sinistro
                    pg1.x -= pg1.speed;
                }
                break;
            case "ArrowUp":
                if (pg1.y - altezzasalto >= 0) { // Controlla il bordo superiore
                    console.log("salto");
                }
                break;
            case "ArrowDown":
                if (pg1.y + pg1.height + pg1.speed <= canvas.height) { // Controlla il bordo inferiore
                    pg1.y += pg1.speed;
                }
                break;
        }
        pg1.disegna_pg(); // Pulisce e ridisegna il canvas
    });
}