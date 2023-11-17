import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './index.module.css';
import Node from '../components/Node';
import ParentComponent from '../components/ParentComponent';

const HomePage = () => {
  const router = useRouter();
  const delay = 700;
  const [isClicked, setIsClicked] = useState(false);

  const handleNodeClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      router.push('/skillchoice');
    }, delay);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>skilltrees.life</h1>
      <Link href="/about"></Link>
      <Link href="/contact"></Link>

      <div className={styles.NodeRender}>
        <Node 
          nodeText="Start" 
          onClick={handleNodeClick}
          
        />
      </div>
    </div>
  );
};

export default HomePage;
