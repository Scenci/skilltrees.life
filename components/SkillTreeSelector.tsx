import React from 'react';

interface SkillTreeSelectorProps {
  selectedTree: string;
}

const SkillTreeSelector: React.FC<SkillTreeSelectorProps> = ({ selectedTree }) => {
  return (
    <div className="skill-tree-content">
      <h2>{selectedTree}</h2>
      {/* Display skill tree content based on selectedTree */}
    </div>
  );
};

export default SkillTreeSelector;
