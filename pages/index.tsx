// Import the Link component at the top of your index.tsx file
import Link from 'next/link';
import styles from './index.module.css';
import Node from '../components/Node';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>skilltrees.life</h1>
      <Link href="/about"></Link>
      <Link href="/contact"></Link>

      <div className={styles.NodeRender}>
        <Node/>
      </div>
    </div>
  );
};

export default HomePage;
