import React from 'react';
import styles from './Node.module.css';

interface NodeProps {
  nodeText: string;
  onClick: () => void;
}

const Node: React.FC<NodeProps> = ({ nodeText, onClick }) => {
    return (
        <button className={styles.circle} onClick={onClick}>
            {nodeText}
        </button>
    );
};

export default Node;
