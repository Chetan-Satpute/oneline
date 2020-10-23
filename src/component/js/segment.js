import * as utils from './utils';

class Segment {
    constructor(a, b) {
        this.a = a;             // Node at which Segment start
        this.b = b;             // Node at which Segment end
        this.width = 10;
        this.outerWidth = this.width + 10;
        this.color = "rgba(0, 0, 0, 0.2)";
        this.active = false;
        this.cap = "round";
    }

    draw(ctx) {
        ctx.beginPath();

        ctx.strokeStyle = this.color;

        ctx.lineWidth = this.width;
        ctx.lineCap = this.cap;

        utils.drawLine(ctx, this.a, this.b);

        ctx.closePath();

        if (this.active) {
            ctx.beginPath();

            ctx.lineWidth = this.outerWidth;
            ctx.lineCap = this.cap;

            utils.drawLine(ctx, this.a, this.b)

            ctx.closePath();
        }
    }
}

export default Segment;
