import React from 'react';

interface NavbarProps {
  onSelect: (treeName: string) => void;
}

const skillTrees = ['Game Developer', 'Web Developer', 'Data Scientist'];

const Navbar: React.FC<NavbarProps> = ({ onSelect }) => {
  return (
    <div className="navbar">
      <h3>Skill Trees</h3>
      <ul>
        {skillTrees.map((tree) => (
          <li key={tree} onClick={() => onSelect(tree)}>
            {tree}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
