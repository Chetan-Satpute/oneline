import React from "react";

function nextFrame() {
  return new Promise(requestAnimationFrame)
}

function sleep(duration) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

async function Solver(nodes, segments, render, done, cavnasRef, setSolution) {

  // Reset Pattern
  for (let i = 0; i < segments.length; i++) {
    segments[i].flow = {
      endNode: segments[i].a,
      percent: 0,
    };
  }

  let startNode = undefined;
  let oddDegreeNodeCount = 0;

  for (let i = 0; i < nodes.length; i++) {
    await nextFrame();
    nodes[i].selected = true;
    render();

    await sleep(500);

    if (nodes[i].degree % 2) {
      oddDegreeNodeCount += 1;
      startNode = nodes[i];
    }

    await nextFrame();
    nodes[i].selected = false;
    render();
  }

  // If odd degree nodes count is 2 or 0
  // Then solution is possible
  if (oddDegreeNodeCount === 2 || oddDegreeNodeCount === 0) {

    if (oddDegreeNodeCount === 0)
      startNode = nodes[0];

    // Stack of moves (for Depth First Search)
    let stack = [];

    // Set of explored segments
    let explored = new Set();

    // Moves made to solve the pattern
    let moves = [];

    // Solution of pattern
    let solution = [];

    let availableMoves = (node) => {
      let avm = [];
      let move;

      segments.forEach(seg => {
        if (!explored.has(seg)) {

          if (seg.a === node) {
            move = {
              segment: seg,
              endNode: seg.b,
              grow: true,
              cost: 0
            }

            avm.push(move);
          } else if (seg.b === node) {

            move = {
              segment: seg,
              endNode: seg.a,
              grow: true,
              cost: 0
            }

            avm.push(move);
          }
        }
      });

      return avm;
    }

    stack = availableMoves(startNode);
    while (stack.length) {

      let move = stack.pop();

      // Make Move
      moves.push(move);
      explored.add(move.segment);

      move.segment.color = "green";
      await nextFrame();
      move.segment.active = true;
      render();
      for (let i = 0; i <= 100; i += 5) {
        await nextFrame();
        move.segment.flow = {
          endNode: move.endNode,
          percent: i,
        }
        render();
      }
      await nextFrame();
      move.segment.active = false;
      render();
      solution.push(
        cavnasRef.current.toDataURL()
      );

      // Available moves
      let avm = availableMoves(move.endNode);

      if (avm.length) {
        avm.forEach(m => {
          m.cost = move.cost + 1;
          stack.push(m)
        });
      } else {

        // If Won
        if (explored.size === segments.length) {
          setSolution(solution);
          done();
          break;
        } else {

          // Retrieve
          let nextMove = stack[stack.length - 1];

          while (explored.size !== nextMove.cost) {

            var currMove = moves.pop();
            explored.delete(currMove.segment);
            solution.pop();

            currMove.segment.color = "red";
            await nextFrame();
            currMove.segment.active = true;
            render();
            for (let i = 100; i >= 0; i -= 2) {
              await nextFrame();
              currMove.segment.flow = {
                endNode: currMove.endNode,
                percent: i,
              }
              render();
            }
            await nextFrame();
            currMove.segment.active = false;
            render();
          }
        }
      }
    }

  } else {

    setSolution();

    // No solution possible
    await nextFrame();
    for (let i = 0; i < segments.length; i++) {
      segments[i].color = "red";
      segments[i].flow = {
        endNode: segments[i].a,
        percent: 100,
      };
    }
    render();
  }

  done();
}

export default Solver;
