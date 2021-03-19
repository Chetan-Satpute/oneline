class Node {

  constructor(position) {
    this.x = position.x;
    this.y = position.y;
    this.radius = 10;
    this.color = "#50A";
    this.selectedColor = "gold";
    this.outerRadius = this.radius + 10;
    this.active = true;
    this.selected = false;
    this.degree = 0;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    if (this.selected) {
      ctx.fillStyle = this.selectedColor;
    }

    // Inner Circle
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.fill();

    if (this.active || this.selected) {

      ctx.beginPath();

      // Outer circle
      ctx.arc(this.x, this.y, this.outerRadius, 0, Math.PI * 2, true);

      // Fill with 0.2 opacity
      ctx.globalAlpha = 0.2;
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.closePath();
    }

    ctx.closePath();
  }
}

export default Node;
