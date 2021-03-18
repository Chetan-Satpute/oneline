import React, { useEffect, useRef } from 'react';
import './Canvas.css';

function Canvas() {

  const canvasRef = useRef(null);

  useEffect(() => {
    // Get canvas and context
    let canvas = canvasRef.current;
    let ctx = canvas.getContext('2d');

    // Set display size (css pixels)
    canvas.style.width = canvas.offsetWidth + "px";
    canvas.style.height = canvas.offsetHeight + "px";

    // // Set actual size in memory (scaled to account for extra pixel density)
    var scale = window.devicePixelRatio;
    canvas.width = Math.floor(canvas.offsetWidth * scale);
    canvas.height = Math.floor(canvas.offsetHeight * scale);

    // Normalise coordinate system to use css pixels
    ctx.scale(scale, scale);
  }, []);
  return (
    <canvas ref={canvasRef} className="rounded">
      Canvas not Supported.
    </canvas>
  );
}

export default Canvas;
