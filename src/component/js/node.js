class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.ctx = document.getElementById('canvas').getContext('2d');
    }

    draw(ctx, color) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        
        if(color) { ctx.fillStyle = color }
        
        ctx.fill();
        ctx.closePath();
    }
}

export default Node;