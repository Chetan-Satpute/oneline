class Segment {
    constructor(a, b) {
        this.a = a;             // Node at which Segment start
        this.b = b;             // Node at which Segment end
        this.width = 10;
        this.outerWidth = this.width + 10;
        this.color = "green";
        this.cap = "round";
        this.active = false;

        /* grow 
         * value of grow can be
         * { endNode: node, percent: value }
         * 
         * grow determines incomplete render of segment node
         * 
         * startNode is the node to start rendering from 
         *
         * percent value will determine size of segment to be rendered
         * 
         */
        this.grow = false;
    }

    draw(ctx) {
        
        ctx.beginPath();
        
        // Draw gray line from node a to b
        ctx.strokeStyle = "black";
        ctx.lineWidth = this.width;
        ctx.lineCap = this.cap;

        ctx.globalAlpha = 0.2;
        ctx.moveTo(this.a.x, this.a.y);
        ctx.lineTo(this.b.x, this.b.y);
        ctx.stroke();
        ctx.globalAlpha = 1;

        // When active render wide segment
        if(this.active) {
            ctx.beginPath();
            
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.outerWidth;
            ctx.lineCap = this.cap;

            ctx.globalAlpha = 0.2;
            ctx.moveTo(this.a.x, this.a.y);
            ctx.lineTo(this.b.x, this.b.y);
            ctx.stroke();
            ctx.globalAlpha = 1;

            ctx.closePath();
        }

        // Render partial segment above base segment
        if(this.grow) {

            ctx.beginPath();

            // Position at which to end segment
            var pos;

            if(this.grow.endNode !== this.a) {
                pos = {
                    x: this.a.x + (this.b.x-this.a.x) * (this.grow.percent / 100),
                    y: this.a.y + (this.b.y-this.a.y) * (this.grow.percent / 100)
                }

                ctx.moveTo(this.a.x, this.a.y);
            } else {
                pos = {
                    x: this.b.x + (this.a.x-this.b.x) * (this.grow.percent / 100),
                    y: this.b.y + (this.a.y-this.b.y) * (this.grow.percent / 100)
                }

                ctx.moveTo(this.b.x, this.b.y);
            }


            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.width;
            ctx.lineCap = this.cap;

            ctx.globalAlpha = 0.9;
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
        
            ctx.closePath();
        }
        
        ctx.closePath();
    }

    oppNode(node) {
        if (this.a === node) { return this.b }
        else { return this.a }
    }
}

export default Segment;
