import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import styles from './CircleMenu.module.css';

const CircleMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const mainButtonRadius = 50;
    const nodeRadius = 20;
    const numNodes = 6;
    const distanceFromCenter = 100;

    // Clear existing SVG content
    svg.selectAll('*').remove();

    // Create main button
    const mainButton = svg.append('circle')
      .attr('r', mainButtonRadius)
      .attr('cx', mainButtonRadius * 2)
      .attr('cy', mainButtonRadius * 2)
      .style('fill', 'blue')
      .on('click', () => setIsOpen(!isOpen));

    if (isOpen) {
      for (let i = 0; i < numNodes; i++) {
        const angle = (Math.PI * 2 / numNodes) * i;
        const x = mainButtonRadius * 2 + distanceFromCenter * Math.cos(angle);
        const y = mainButtonRadius * 2 + distanceFromCenter * Math.sin(angle);

        // Create connecting line
        svg.append('line')
          .attr('x1', mainButtonRadius * 2)
          .attr('y1', mainButtonRadius * 2)
          .attr('x2', x)
          .attr('y2', y)
          .style('stroke', 'black')
          .style('stroke-width', 2);

        // Create node
        svg.append('circle')
          .attr('r', nodeRadius)
          .attr('cx', x)
          .attr('cy', y)
          .style('fill', 'green');
      }
    }
  }, [isOpen, svgRef]);

  return (
    <div className={styles.circleMenuContainer}>
      <svg ref={svgRef} width="300" height="300"></svg>
    </div>
  );
};

export default CircleMenu;
