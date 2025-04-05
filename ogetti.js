 const pg1={
    width : 50,
    height : 50,
    x: 100,
    y: 100,
    color: "#3498db",  
    speed : 3,
}
pg1.disegna_pg = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Pulisce il canvas
    ctx.fillStyle = 'blue'; // Colore del personaggio
    ctx.fillRect(this.x, this.y, this.width, this.height); // Disegna il personaggio
};