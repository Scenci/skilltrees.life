import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './index.module.css';
import * as d3 from 'd3';




const HomePage = () => {
  const router = useRouter();

useEffect(() => {
  const width = 2560, height = 1248;

  const svg = d3.select(`.${styles.NodeRender}`).append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "black"); // assuming you want a black background

  const generateParticles = () => {
    // Create a new particle with random position and velocity
    const particle = svg.append("circle")
      .attr("cx", Math.random() * width)
      .attr("cy", Math.random() * height)
      .attr("r", 4) // radius of particle
      .style("fill", "white");

  const particleDeath = (particle : any) => {
    console.log("particle death");
      particle.transition()
      .duration(9000)
      .ease(d3.easeLinear)
      .style("fill", "blue") // end color
      .attr("cx", Math.random() * width)
      .attr("cy", Math.random() * height)
      .remove();
  }

    // Animate the particle
    particle.transition()
      .duration(9000)
      .ease(d3.easeLinear)
      .style("fill", "white") // end color
      .attr("cx", Math.random() * width)
      .attr("cy", Math.random() * height)
      .remove(particleDeath(particle)); // remove the particle once the transition is complete

    // Generate a new particle every 100ms
    setTimeout(generateParticles, 500);
  };

  // Start generating particles
  generateParticles();

  // Cleanup function to stop generating particles when the component unmounts
  return () => {
    svg.selectAll("*").interrupt().remove(); // This removes all SVG elements
    clearTimeout(generateParticles); // This clears the timeout
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
