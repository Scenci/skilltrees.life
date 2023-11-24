import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './NavHeader.module.css'; // We will create this CSS module

const NavHeader = () => {
    const router = useRouter();

    const handleAboutClick = () => { router.push('/about'); };
    const handleContactClick = () => { router.push('/contact'); };

  return (
    <div className={styles.navHeader}>
      <Link href="/about" className={styles.navLink} onClick={handleAboutClick}>About</Link>
      <Link href="/contact" className={styles.navLink} onClick={handleContactClick}>Contact</Link>
    </div>
  );
};

export default NavHeader;
