const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


function Avvia(){
    pg1.disegna_pg();
    function movimento(){
        window.addEventListener('keydown', (e) => {
            if(e.key === 'ArrowRight') {
                keysPressed.ArrowRight = true;
            }
        });
    }
    
}
