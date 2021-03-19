class Segment {
  constructor(a, b) {
      this.a = a;     // Start Node of segment
      this.b = b;     // End Node of segment
      this.width = 10;
      this.outerWidth = this.width + 10;
      this.color = "green";
      this.cap = "round";
      this.active = false;
  
      /*
       * this.flow = {
       *  endNode: node
       *  percent: percent
       * }
       */
      this.flow = undefined;
  }

  draw(ctx) {

      ctx.beginPath();
      
      ctx.strokeStyle = "black";
      ctx.lineWidth = this.width;
      ctx.lineCap = this.cap;

      // Baseline
      ctx.globalAlpha = 0.2;
      ctx.moveTo(this.a.x, this.a.y);
      ctx.lineTo(this.b.x, this.b.y);
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Active
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

      if (this.flow) {
          this.drawFlow(ctx);
      }

      ctx.closePath();
  }

  drawFlow(ctx) {

      ctx.beginPath();

      // Position at which to end segment
      var pos;

      if(this.flow.endNode !== this.a) {
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
}

export default Segment;
