import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import SkillTreeSelector from '../../components/SkillTreeSelector';
import RootLayout from './layout';

const HomePage: React.FC = () => {
  const [selectedTree, setSelectedTree] = useState<string>('Game Developer');

  return (
    <RootLayout>
      <div className="container">
        <Navbar onSelect={setSelectedTree} />
        <SkillTreeSelector selectedTree={selectedTree} />
      </div>
    </RootLayout>
  );
};

export default HomePage;
