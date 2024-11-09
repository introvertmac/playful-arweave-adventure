import React from 'react';
import GameBoard from '../components/GameBoard';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neon-purple to-black p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 glitch-text" data-text="CyberHack">
            CyberHack
          </h1>
          <p className="text-neon-cyan text-lg">
            Hack the system. Solve the puzzles. Earn your reputation.
          </p>
        </header>

        <GameBoard />
      </div>
    </div>
  );
};

export default Index;