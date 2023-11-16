import React, { useState } from 'react';
import styles from './Node.module.css';

const Node = () => {

    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
    };

    return (
        <button className={`${styles.circle} ${isClicked ? styles.expand : ''}`} onClick={handleClick}>
      Start
    </button>

    );
}; export default Node;