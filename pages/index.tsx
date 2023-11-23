import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './index.module.css';
import * as d3 from 'd3';




const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const nodeRender:any = document.querySelector(`.${styles.NodeRender}`);
    let width = nodeRender.clientWidth;
    let height = nodeRender.clientHeight;

    const svg = d3.select(nodeRender).append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "black");

    // Function to resize SVG
    const resizeSVG = () => {
      width = nodeRender.clientWidth;
      height = nodeRender.clientHeight;
      svg.attr("width", width).attr("height", height);
    };

    // Add resize event listener
    window.addEventListener("resize", resizeSVG);

    let timeoutId:any; // Variable to store the timeout ID
  
    const generateParticles = () => {
      // Initial position of the particle
      const startX = Math.random() * width;
      const startY = Math.random() * height;
    
      // End position of the particle
      const endX = Math.random() * width;
      const endY = Math.random() * height;
    
      // Create a group for each particle
      const particleGroup = svg.append("g")
        .attr("transform", `translate(${startX}, ${startY})`);
    
      // Append a circle to the group
      const particle = particleGroup.append("circle")
        .attr("r", 4) // Maximum size of the particle
        .style("fill", "white")
        .style("opacity", 0); // Start fully transparent
    
      // First transition: Fade in and start moving
      particle.transition()
        .duration(10000) // 10 seconds to reach full opacity and move halfway
        .ease(d3.easeLinear)
        .style("opacity", 1)
        .attr("transform", `translate(${(endX) / 2}, ${(endY) / 2})`);
    
      // Second transition: Move and fade out
      particle.transition()
        .delay(10000) // Start after the first transition ends
        .duration(10000) // 2 seconds to fade out and move to the end position
        .ease(d3.easeLinear)
        .style("opacity", 0)
        .attr("transform", `translate(${endX}, ${endY})`)
        .remove(); // Remove the particle once the transition is complete
    
      // Generate a new particle every 500ms
      setTimeout(generateParticles, 10);
    };
    
    
    
  
    generateParticles();
  
    // Cleanup function
    return () => {
      svg.selectAll("*").interrupt().remove();
      window.removeEventListener("resize", resizeSVG);
      clearTimeout(timeoutId); // Clear the stored timeout ID
    };
  }, []);
  


return (
  <div className={styles.container}>
    <div className={styles.NodeRender}>
      {/* SVG is appended to this div */}
    </div>

    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 2, opacity: 1, transition: { delay: 0.4 } },
      }}
      className={styles.title}
    >
      <h1>skilltrees.life</h1>
    </motion.div>

  </div>
);
};

export default HomePage;
