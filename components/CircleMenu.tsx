import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import styles from './CircleMenu.module.css';

//This is an optional interface:
interface Point {
    x: number;
    y: number;
}

// You could use 2 points below - but i find this easier to read/understand.
interface Line {
    lineStartX: number;
    lineStartY: number;
    lineEndX: number;
    lineEndY: number;
  }

  // Similar logic below
interface Node {
    x: number;       // X-coordinate of the node's center
    y: number;       // Y-coordinate of the node's center
    radius: number;  // Radius of the node
    label: string;   // Text label for the node
  }
  
const CircleMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const router = useRouter();
  const [nodes, setNodes] = useState<Node[]>([]); // states that are typed with the custom interfaces
  const [lineData, setLineData] = useState<Line[]>([]); 

  const nodeLabels = ["Learn", "Specialize", "Skill 2", "Skill 3", "Skill 4", "Node 6"];
  
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

  /* * * * *
  *
   - generateNodeData
  * Calculates key SVG Circle information when called
  * Assumptions: 
  * 
  * @param numNode              int number of nodes to create
  * @param center               Point center of the SVG
  * @param distanceFromCenter   int distance from the nodeCenter
  * 
   - generateLineData
  * Calculates key SVG Circle information when called
  * Assumptions: 
  * 
  * @param nodes               int number of nodes to create
  * @param center              Point center of the SVG
  * @param mainButtonRadius    int radius of the main button
  * @param nodeRadius          int radius of the node
  * @param marginStart         int margin of line start to trim in pixels
  * @param marginEnd           int margin of line end to trim in pixels
  * 
   * * * * */
  const generateNodeData = (numNodes:any, center:any, distanceFromCenter:number, nodeRadius:number) => {
    return Array.from({ length: numNodes }, (_, i) => {
      const angle = (Math.PI * 2 / numNodes) * i;
      return {
        x: center.x + distanceFromCenter * Math.cos(angle),
        y: center.y + distanceFromCenter * Math.sin(angle),
        radius: nodeRadius,
        label: `Node ${i + 1}`,
      };
    });
  };
  
  const generateLineData = (
    nodes: Node[], // Assuming you have a Node interface defined similarly
    center: Point, // Point interface as defined earlier
    mainButtonRadius: number,
    nodeRadius: number,
    marginStart: number,
    marginEnd: number
  ): Line[] => {
    return nodes.map((node: { y: number; x: number; }) => {
      // Calculate angle from the center to the node
      const angle = Math.atan2(node.y - center.y, node.x - center.x);

      const lineStartX = center.x + (mainButtonRadius + marginStart) * Math.cos(angle);
      const lineStartY = center.y + (mainButtonRadius + marginStart) * Math.sin(angle);

      // The line should end a bit before reaching the node's center (considering nodeRadius and marginEnd)
      const lineEndX = node.x - (nodeRadius + marginEnd) * Math.cos(angle);
      const lineEndY = node.y - (nodeRadius + marginEnd) * Math.sin(angle);

      // This was specifically done to have line "fragments" to get a more sci-fi look.
      return { lineStartX, lineStartY, lineEndX, lineEndY };
    });
  };
  
  useEffect(() => {
    if (!svgRef.current) return;

  // Define dimensions and layout parameters
  const mainButtonRadius = 100;
  const nodeRadius = 40;
  const numNodes = 2;
  const distanceFromCenter = 200;
  const marginStart = 19; // Margin for the start of the line
  const marginEnd = 10; // Margin for the end of the line

  // Calculate the SVG dimensions
  const fullExtent = mainButtonRadius + distanceFromCenter + nodeRadius;
  const svgWidth = fullExtent * 2;
  const svgHeight = fullExtent * 2;
  const center = { x: svgWidth / 2, y: svgHeight / 2 };
  setSvgDimensions({ width: svgWidth, height: svgHeight });

 

  const svg = d3.select(svgRef.current)
    .attr('width', svgWidth)
    .attr('height', svgHeight)
    .style('background-color', 'transparent');

  // Clear existing SVG content
  svg.selectAll('*').remove();

  // Create the main button
  const mainButton = svg.append('circle')
    .attr('r', mainButtonRadius)
    .attr('cx', center.x)
    .attr('cy', center.y)
    .style('fill', 'black')
    .style('stroke', 'white')
    .style('stroke-width', 3)
    .style('cursor', 'pointer')
    .on('click', () => { setIsOpen(!isOpen) });

  // Add text to the main button
  svg.append('text')
    .attr('x', center.x)
    .attr('y', center.y)
    .attr('dy', '.35em')
    .attr('text-anchor', 'middle')
    .style('fill', 'white')
    .style('font-size', '20px')
    .style('font-weight', 'bold')
    .text('Skilltrees')
    .on('click', () => { mainButton.dispatch('click'); });

  if (isOpen) {
    //compartimentalizing node and line data to functions
    const nodeData = generateNodeData(numNodes, center, distanceFromCenter, nodeRadius);
    const lineData = generateLineData(nodeData, center, mainButtonRadius, nodeRadius, marginStart, marginEnd);

    lineData.forEach(line => {
        svg.append('line')
          .attr('x1', line.lineStartX)
          .attr('y1', line.lineStartY)
          .attr('x2', line.lineEndX)
          .attr('y2', line.lineEndY)
          .style('opacity', 0)
          .style('stroke', 'white')
          .style('stroke-width', 2)
          .transition()
          .duration(3000)
          .style('opacity', 1)
          .ease(d3.easeLinear)
          .delay(100);
      });
  
      // Render nodes and their labels
      nodeData.forEach((node, i) => {
        const nodeElement = svg.append('circle')
          .attr('r', node.radius)
          .attr('cx', node.x)
          .attr('cy', node.y)
          .style('opacity', 0)
          .style('fill', 'black')
          .style('stroke', 'white')
          .style('stroke-width', 3)
          .style('cursor', 'pointer')
          .on('click', nodeClickHandlers[i]);
  
        const textElement = svg.append('text')
          .attr('x', node.x)
          .attr('y', node.y)
          .attr('dy', '.35em')
          .attr('text-anchor', 'middle')
          .style('fill', 'white')
          .style('font-size', '12px')
          .style('opacity', 0)
          .text(nodeLabels[i]);
  
        // Animate node and text appearance
        nodeElement.transition()
          .duration(3000)
          .delay(500)
          .style('opacity', 1)
          .ease(d3.easeLinear);
  
        textElement.transition()
          .duration(3000)
          .delay(500)
          .style('opacity', 1)
          .ease(d3.easeLinear);
        });
      
      
    }
  }, [isOpen, svgRef]);

  return (
    <div className={styles.circleMenuContainer}>
    {/* Apply the SVG dimensions from state, this was hard to get right at first */}
    <svg ref={svgRef} width={svgDimensions.width} height={svgDimensions.height}></svg>
  </div>
  );
};

export default CircleMenu;