import React, { useEffect, useRef, useState } from "react";
import { checkSegment, get_coordinates } from "./js/Helper";
import "./Canvas.css";
import Node from "./js/Node";
import { node_overlap } from "../component/js/utils";
import Segment from "./js/Segment";
import Solver from "../SolutionPannel/Solver";

function Canvas({ solve, clear, setSolve, setClear, setSolutionData }) {
  const canvasRef = useRef(null);

  const [nodes, setNodes] = useState([]);
  const [segments, setSegments] = useState([]);

  const [hoverSegment, setHoverSegment] = useState();

  // Might not be needed
  const [renderTrigger, setRenderTrigger] = useState(false);

  // Drag
  const [dragging, setDragging] = useState();
  const [dragged, setDragged] = useState();

  const [solution, setSolution] = useState();

  useEffect(() => {
    // Get canvas and context
    let canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");

    // Set display size (css pixels)
    canvas.style.width = canvas.offsetWidth + "px";
    canvas.style.height = canvas.offsetHeight + "px";

    // Set actual size in memory (scaled to account for extra pixel density)
    var scale = window.devicePixelRatio;
    canvas.width = Math.floor(canvas.offsetWidth * scale);
    canvas.height = Math.floor(canvas.offsetHeight * scale);

    // Normalise coordinate system to use css pixels
    ctx.scale(scale, scale);
  }, []);

  // Solve Puzzle
  useEffect(() => {
    // Solve
    if (solve) {
      const done = () => {
        setSolve(false);
      };

      const setSolution = (data) => {
        setSolutionData(data);
      };

      Solver(nodes, segments, render, done, canvasRef, setSolution);
    }
  }, [solve, setSolve]);

  // Reset Board
  useEffect(() => {
    if (clear) {
      setNodes([]);
      setSegments([]);
      setHoverSegment();
      setClear(false);
    }

    render();
  }, [clear, setClear]);

  // Might not be needed
  const render = () => {
    // Get canvas and context
    let canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (hoverSegment) hoverSegment.draw(ctx);
    segments.forEach((segment) => segment.draw(ctx));
    nodes.forEach((node) => node.draw(ctx));
  };

  const handleClick = (event) => {
    // Work around to prevent additional click event after drag
    if (dragged) {
      setDragged(false);
    } else {
      // Get canvas and context
      let canvas = canvasRef.current;

      let pos = get_coordinates(canvas, event);
      let node = node_overlap(nodes, pos);

      // Overlapping node is not created
      if (node) {
        if (hoverSegment && hoverSegment.a === node) {
          nodes.splice(nodes.indexOf(node), 1);
          setHoverSegment();

          // Remove all segments connected to removed nodes
          let newSegmentList = [];
          segments.forEach((seg) => {
            if (seg.a === node || seg.b === node) {
              seg.a.degree -= 1;
              seg.b.degree -= 1;
            } else {
              newSegmentList.push(seg);
            }
          });
          setSegments(newSegmentList);
        }
      } else {
        node = new Node(pos);
        nodes.push(node);
        render();
        setHoverSegment(new Segment(node, node));
      }

      // Segment creation is in process
      if (hoverSegment) {
        if (hoverSegment.a !== node) {
          let seg = new Segment(hoverSegment.a, node);

          if (!checkSegment(segments, seg)) {
            hoverSegment.a.degree += 1;
            node.degree += 1;
            segments.push(new Segment(hoverSegment.a, node));
          }
        }
        setHoverSegment();
      } else {
        setHoverSegment(new Segment(node, node));
      }
    }
  };

  const handleMove = (event) => {
    // Get canvas and context
    let canvas = canvasRef.current;

    let pos = get_coordinates(canvas, event);
    let node = node_overlap(nodes, pos);

    if (node && dragging) {
      setDragged(true);
      dragging.x = pos.x;
      dragging.y = pos.y;
    }

    if (!node) {
      node = new Node(pos);
    }

    if (hoverSegment) {
      setHoverSegment(new Segment(hoverSegment.a, node));
    }

    render();
  };

  const handleMouseDown = (event) => {
    let canvas = canvasRef.current;

    let pos = get_coordinates(canvas, event);
    let node = node_overlap(nodes, pos);

    if (node) {
      setDragging(node);
    }
  };

  const handleMouseUp = (event) => {
    setDragging();
  };

  useEffect(render, [hoverSegment]);

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      className="rounded"
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMove}
      onTouchEnd={handleMouseUp}
    >
      Canvas not Supported.
    </canvas>
  );
}

export default Canvas;
