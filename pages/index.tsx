// Import the Link component at the top of your index.tsx file
import Link from 'next/link';
import styles from './index.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>skilltrees.life</h1>
       
            <Link href="/about"></Link>
            <Link href="/contact"></Link>

    </div>
  );
};

export default HomePage;
