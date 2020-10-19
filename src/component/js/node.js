class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.color = "#50A";
        this.outerRadius = this.radius + 10;
        this.active = false;
    }

    draw(ctx) {

        ctx.fillStyle = this.color;

        if(this.active) {
            
            ctx.beginPath();
            
            ctx.arc(this.x, this.y, this.outerRadius, 0, Math.PI * 2, true);
            
            ctx.globalAlpha = 0.2;
            ctx.fill();
            ctx.globalAlpha = 1;
            
            ctx.closePath();
        }
        
        ctx.beginPath();
                
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        
        ctx.fill();

        ctx.closePath();
    }
}

export default Node;
