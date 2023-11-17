import React, { useState } from 'react';
import Node from '../components/Node';


const ParentComponent = () => {
  const [nodes, setNodes] = useState([{ id: 1, text: 'Parent Node' }]);

  const handleNodeClick = (nodeId: number) => {
    
    const newNodeId1 = nodes.length + 1;
    const newNodeId2 = nodes.length + 2;
    setNodes([...nodes, 
              { id: newNodeId1, text: `Node ${newNodeId1}` },
              { id: newNodeId2, text: `Node ${newNodeId2}` }]);
  };

  return (
    <div>
      {nodes.map(node => (
        <Node key={node.id} nodeText={node.text} onClick={() => handleNodeClick(node.id)}
         />
      ))}
    </div>
  );
};

export default ParentComponent;
