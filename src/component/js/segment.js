class Segment {
    constructor(a, b) {
        this.a = a;             // Node at which Segment start
        this.b = b;             // Node at which Segment end
        this.width = 10;
        this.cap = "round";
    }

    draw(ctx, color) {
        ctx.beginPath();
        ctx.lineWidth = this.width;
        ctx.lineCap = this.cap;

        if(color) { ctx.strokeStyle = color }

        ctx.moveTo(this.a.x, this.a.y);
        ctx.lineTo(this.b.x, this.b.y);
        ctx.stroke();
        ctx.closePath();
    }
}

export default Segment;
