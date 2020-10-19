class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.outerRadius = this.radius + 10;
        this.active = false;
    }

    draw(ctx, color) {

        if(this.active) {
            
            ctx.beginPath();
            
            if(color) { ctx.fillStyle = color }
            
            ctx.arc(this.x, this.y, this.outerRadius, 0, Math.PI * 2, true);
            
            ctx.globalAlpha = 0.2;
            ctx.fill();
            ctx.globalAlpha = 1;
            
            ctx.closePath();
        }
        
        ctx.beginPath();
        
        if(color) { ctx.fillStyle = color }
        
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        
        ctx.fill();

        ctx.closePath();
    }
}

export default Node;
