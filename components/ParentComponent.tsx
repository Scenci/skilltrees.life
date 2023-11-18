import React, { useState } from 'react';
import Node from '../components/Node';
import Alert from '../components/Alert';
import styles from '../components/Alert.module.css';

const ParentComponent = () => {
  const [nodes, setNodes] = useState([{ id: 1, text: 'Parent Node', x: 100, y: 100 }]);
  const [connections, setConnections] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [AlertMessage, SetAlertMessage] = useState('');

  const addNode = (parentId) => {
    const newNode = {
      id: nodes.length + 1,
      text: `Node ${nodes.length + 1}`,
      x: 200, //these position values dont work for some reason?
      y: 200  
    };
    setNodes([...nodes, newNode]); // 
    //idk what to type these because im a noob
    setConnections([...connections, { from: parentId, to: newNode.id }]);
  };

  const removeNode = (nodeId: number) => {
    // Prevent deletion of the parent node
    if (nodeId === 1){
     
      SetAlertMessage("You cannot delete the parent node!");
      setShowAlert(true);

      setTimeout(() => { 
        setShowAlert(false)
      }, 2000);

      return;
    }; 
    // Remove the node and its connections from the state but how to type these?
    setNodes(nodes.filter(node => node.id !== nodeId));
    setConnections(connections.filter(conn => conn.from !== nodeId && conn.to !== nodeId));
  };

  const handleNodeClick = (nodeId:number, action:string) => {
    if (action === 'add') {
      addNode(nodeId);
    } else if (action === 'remove') {
      removeNode(nodeId);
    }
  };

  return (
    <div>
      {nodes.map(node => (
        <Node key={node.id} 
              nodeText={node.text} 
              onAdd={() => handleNodeClick(node.id, 'add')}
              onRemove={() => handleNodeClick(node.id, 'remove')}
              // Pass position props if you're using them for layout
        />
      ))}
      {/* i should render connections here */}
      {showAlert && <Alert message={AlertMessage} Severity={'danger'}/>}
    </div>
  );
};

export default ParentComponent;
