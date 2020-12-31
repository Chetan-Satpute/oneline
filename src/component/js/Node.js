class Node {
    constructor(position) {
        this.x = position.x;
        this.y = position.y;
        this.radius = 10;
        this.color = "#50A";
        this.outerRadius = this.radius + 10;
        this.active = true;
        this.selected = false;
        this.degree = 0;
    }

    moveTo(position) {
        this.x = position.x;
        this.y = position.y;
    }



    draw(ctx) {

        if (this.selected) {
            this.drawSelected(ctx);
        } else {

            if (this.active) {
                this.drawActive(ctx);
            }

            ctx.beginPath();

            ctx.fillStyle = this.color;

            // Inner Circle
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);

            // Fill solid color
            ctx.fill();

            ctx.closePath();
        }
    }

    drawSelected(ctx) {

        ctx.beginPath();

        ctx.fillStyle = 'gold';

        // Inner circle
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);

        // Fill Solid gold color
        ctx.fill();

        // Outer circle
        ctx.arc(this.x, this.y, this.outerRadius, 0, Math.PI * 2, true);

        // Fill with 0.2 opacity
        ctx.globalAlpha = 0.2;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Reset fill color to default
        ctx.fillStyle = this.color;

        ctx.closePath();
    }

    drawActive(ctx) {

        ctx.beginPath();

        ctx.fillStyle = this.color;

        // Outer circle
        ctx.arc(this.x, this.y, this.outerRadius, 0, Math.PI * 2, true);

        // Fill with 0.2 opacity
        ctx.globalAlpha = 0.2;
        ctx.fill();
        ctx.globalAlpha = 1;

        ctx.closePath();
    }
}

export default Node;
