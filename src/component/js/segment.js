class Segment {
    constructor(a, b) {
        this.a = a;             // Node at which Segment start
        this.b = b;             // Node at which Segment end
        this.width = 10;
        this.outerWidth = this.width + 10;
        this.color = "green";
        this.cap = "round";
        this.active = false;

        /* Flow 
         * value of flow can be
         * { startNode: node, percent: value }
         * 
         * flow determines incomplete render of segment node
         * 
         * startNode is the node to start rendering from 
         *
         * percent value will determine size of segment to be rendered
         * 
         */
        this.flow = false;
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
        if(this.flow) {

            ctx.beginPath();

            // Position at which to end segment
            var pos;

            if(this.flow.toNode !== this.a) {
                pos = {
                    x: this.a.x + (this.b.x-this.a.x) * (this.flow.percent / 100),
                    y: this.a.y + (this.b.y-this.a.y) * (this.flow.percent / 100)
                }

                ctx.moveTo(this.a.x, this.a.y);
            } else {
                pos = {
                    x: this.b.x + (this.a.x-this.b.x) * (this.flow.percent / 100),
                    y: this.b.y + (this.a.y-this.b.y) * (this.flow.percent / 100)
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
}

export default Segment;
