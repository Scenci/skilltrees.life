import React, { useState } from 'react';
import styles from './Node.module.css';

interface NodeProps {
  nodeText: string;
  onAdd: () => void;
  onRemove: () => void;
}

const Node: React.FC<NodeProps> = ({ nodeText, onAdd, onRemove }) => {
    const [showOptions, setShowOptions] = useState(false); // State to toggle options

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    return (
        <div className={styles.nodeContainer} onClick={toggleOptions}>
            <div className={styles.node}>
                {nodeText}
            </div>
            {showOptions && (
                <div className={styles.optionsContainer}>
                    <div className={styles.plus} onClick={onAdd}>➕</div>
                    <div className={styles.ex} onClick={onRemove}>❌</div>
                </div>
            )}
        </div>
    );
};

export default Node;
