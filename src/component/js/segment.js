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

        /*
         *  Flow represents grwth of segment from a node to another
         *  value of flow can be
         *      { ab: true } or { ab: false }
         *  { ab: true } represents segment will start at a and grow upto b    
         */
        this.flow = false;  

    }

    draw(ctx) {
        ctx.beginPath();
        
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.lineCap = this.cap;
        
        utils.drawLine(ctx, this.a, this.b);
        
        ctx.closePath();

        if(this.flow)
        {
            ctx.beginPath();

            var percent = 0;

            if(this.flow.ab) {
                var interval = setInterval(() => {
                    
                    ctx.moveTo(this.a.x, this.a.y);
                    ctx.lineTo(
                        this.a.x + ((this.b.x - this.a.x) * (percent / 100)),
                        this.a.y + ((this.b.y - this.a.y) * (percent / 100))
                    );

                    percent += 1;

                    if(percent > 100) { clearInterval(interval) }

                }, 1000);
            } else {
                var interval = setInterval(() => {
                    
                    ctx.moveTo(this.a.x, this.a.y);
                    ctx.lineTo(
                        this.a.x + ((this.b.x - this.a.x) * (percent / 100)),
                        this.a.y + ((this.b.y - this.a.y) * (percent / 100))
                    );

                    percent += 1;

                    if(percent > 100) { clearInterval(interval) }

                }, 1000);
            }
        }
        
        // if(this.active) {
        //     ctx.beginPath();
        
        //     ctx.lineWidth = this.outerWidth;
        //     ctx.lineCap = this.cap;
        
        //     utils.drawLine(ctx, this.a, this.b)
        
        //     ctx.closePath();
        // }
    }
}

export default Segment;
