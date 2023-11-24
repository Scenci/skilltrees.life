import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import styles from './CircleMenu.module.css';

const OriginalCircleMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const router = useRouter(); // Get the router object
  
  const svgRef = useRef(null);
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  const nodeClickHandlers = [

    () => {
            console.log("node 1 clicked")

          },

    () => {
            console.log("node 2 clicked")

          },

    /*
    () => console.log("node 3 clicked"),
    () => console.log("node 4 clicked"),
    () => console.log("node 5 clicked"),
    () => console.log("node 6 clicked"),
    */
  ];

  useEffect(() => {
    if (!svgRef.current) return;
    const mainButtonRadius = 100;
    const nodeRadius = 40;
    const numNodes = 2;
    const distanceFromCenter = 200;

    const fullExtent = mainButtonRadius + distanceFromCenter + nodeRadius;

    // Update the SVG size to accommodate the full extent of the nodes
    const svgWidth = fullExtent * 2;
    const svgHeight = fullExtent * 2;
    const center = { x: svgWidth / 2, y: svgHeight / 2 };

    setSvgDimensions({ width: svgWidth, height: svgHeight });

    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current)
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .style('background-color', 'transparent');

    // Clear existing SVG content
    svg.selectAll('*').remove();
    

    // Create main button
    const mainButton = svg.append('circle')
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .attr('r', mainButtonRadius)
      .attr('cx', center.x)
      .attr('cy', center.y)
      .style('fill', 'black')
      .style('stroke', 'white') // note for me border color of the circle
      .style('stroke-width', 3) // note for me border thickness
      .style('cursor', 'pointer')
      .on('click', () => { setIsOpen(!isOpen) } );

      const mainButtonClickHandler = () => mainButton.dispatch('click');
    svg.append('text') //reference to mainbutton
        .attr('x', center.x)
        .attr('y', center.y)
        .attr('dy', '.35em')
        .attr('text-anchor', 'middle') 
        .style('fill', 'white') 
        .style('font-size', '20px') 
        .style('font-weight', 'bold')
        .text('Skilltrees')
        .on('click', () => { mainButtonClickHandler(); } );

    if (isOpen) {

      const nodeLabels = ["Learn", "Specialize", "Skill 2", "Skill 3", "Skill 4", "Node 6"];

      for (let i = 0; i < numNodes; i++) {
        const angle = (Math.PI * 2 / numNodes) * i;

        // Calculate the position for each node
        const x = center.x + distanceFromCenter * Math.cos(angle);
        const y = center.y + distanceFromCenter * Math.sin(angle);

        const marginStart = 19; // Pixels that we shorten the start of the line by
        const marginEnd = 10; // Pixels that we shorten the end of the line by

        
        // Calculate the start and end position for the lines on the edge of the main button.
        // The line should end at a distance of the node's radius from the node's center.
        const lineStartX = center.x + (mainButtonRadius + nodeRadius - marginStart) * Math.cos(angle);
        const lineStartY = center.y + (mainButtonRadius + nodeRadius - marginStart) * Math.sin(angle);
        
        const lineEndX = center.x + (distanceFromCenter - nodeRadius - marginEnd) * Math.cos(angle);
        const lineEndY = center.y + (distanceFromCenter - nodeRadius - marginEnd) * Math.sin(angle);
        //This was specifically done to have line "fragments" to get a more sci-fi look.

    // Create connecting line
    const line = svg.append('line')
      .attr('x1', lineStartX)
      .attr('y1', lineStartY)
      .attr('x2', lineEndX)
      .attr('y2', lineEndY)
      .style('opacity', 0)
      .style('stroke', 'white')
      .style('stroke-width', 2);

    // Create node
    const node = svg.append('circle')
      .attr('r', nodeRadius)
      .attr('cx', x)
      .attr('cy', y)
      .style('opacity','0')
      .style('fill', 'black')
      .style('stroke', 'white')
      .style('stroke-width', 3)
      .style('cursor', 'pointer')
      .on('click', nodeClickHandlers[i]);

      // Add text label for each node
      const text = svg.append('text')
      .attr('x', x)
      .attr('y', y)
      .attr('dy', '.35em') 
      .attr('text-anchor', 'middle') 
      .style('fill', 'white') 
      .style('font-size', '12px') 
      .style('opacity','0')
      .text(nodeLabels[i]); // Use the label from the array
      
      // Handle the line delayed fade in
      line.transition()
      .duration(3000)
      .style('opacity', 1)
      .ease(d3.easeLinear)
      .delay(100);

      // Handle the node delayed fade in
      node.transition()
      .duration(3000)
      .delay(500)
      .style('opacity', 1)
      .ease(d3.easeLinear);

      // Handle the text delayed fade in to match node
      text.transition()
      .duration(3000)
      .delay(500)
      .style('opacity', 1)
      .ease(d3.easeLinear);
      
      }
    }

  }, [isOpen, svgRef]);

  return (
    <div className={styles.circleMenuContainer}>
    {/* Apply the SVG dimensions from state, this was hard to get right at first */}
    <svg ref={svgRef} width={svgDimensions.width} height={svgDimensions.height}></svg>
  </div>
  );
};

export default OriginalCircleMenu;