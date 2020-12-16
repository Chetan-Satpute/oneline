class Node {
    constructor(position) {
        this.x = position.x;
        this.y = position.y;
        this.radius = 10;
        this.color = "#50A";
        this.outerRadius = this.radius + 10;
        this.active = false;
        this.startNode = false;
    }

    draw(ctx) {

        if (this.startNode) {
            
            ctx.beginPath();

            ctx.fillStyle = 'gold';

            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);

            ctx.fill();

            ctx.arc(this.x, this.y, this.outerRadius, 0, Math.PI * 2, true);
            
            ctx.globalAlpha = 0.2;
            ctx.fill();
            ctx.globalAlpha = 1;

            ctx.fillStyle = this.color;

            ctx.closePath();
        } else {

            ctx.fillStyle = this.color;

            if (this.active) {

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

    moveTo(position) {
        this.x = position.x;
        this.y = position.y;
    }
}

export default Node;
