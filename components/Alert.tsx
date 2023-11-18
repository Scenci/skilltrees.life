import React from 'react';
import styles from './Alert.module.css';

interface AlertProps {
    message: string;
    Severity: string;
}

const severities = {
    success: {
        color: "#0f5132",
        background: "#d1e7dd",
    },
    info: {
        color: "#055160",
        background: "#cff4fc",
    },
    warning: {
        color: "#664d03",
        background: "#fff3cd",
    },
    danger: {
        color: "#842029",
        background: "#f8d7da",
    },
};

const Alert: React.FC<AlertProps> = ({ message, Severity }) => {
    const severityStyle = (severities as any)[Severity] || {};

    return (
      <div className={styles.alert} style={severityStyle}>
        {message}
      </div>
    );
};

export default Alert;
