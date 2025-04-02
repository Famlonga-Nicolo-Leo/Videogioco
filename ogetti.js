 const pg1={
    width : 100,
    height : 100,
    x: 100,
    y: 100,
    color: "#3498db",  
    speed : 30,
    disegna_pg: function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    tasti: function() {
    if (keys.ArrowRight) {
        this.x += this.speed;
    }
    if (keys.ArrowLeft) {
        this.x -= this.speed;
    }
    if (keys.ArrowUp) {
    
    }
    if (keys.ArrowDown) {
    
}
    }
}
