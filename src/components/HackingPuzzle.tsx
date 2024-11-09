import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PuzzleType, checkSolution } from '../utils/gameLogic';

interface HackingPuzzleProps {
  puzzle: PuzzleType;
  onSolved: (points: number) => void;
}

const HackingPuzzle: React.FC<HackingPuzzleProps> = ({ puzzle, onSolved }) => {
  const [answer, setAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [startTime] = useState(Date.now());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkSolution(puzzle, answer)) {
      const timeSpent = Date.now() - startTime;
      onSolved(Math.max(puzzle.points - Math.floor(timeSpent / 1000), 0));
    }
  };

  return (
    <div className="terminal-window">
      <h3 className="text-xl text-neon-cyan mb-4 glitch-text" data-text={`Hack Challenge #${puzzle.id}`}>
        Hack Challenge #{puzzle.id}
      </h3>
      
      <div className="mb-6 p-4 bg-black/50 rounded border border-neon-cyan/30">
        <pre className="text-neon-cyan font-mono">{puzzle.code}</pre>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="bg-black/50 border-neon-cyan text-neon-cyan"
          placeholder="Enter solution..."
        />
        
        <div className="flex gap-4">
          <Button 
            type="submit"
            className="flex-1 bg-neon-cyan text-black hover:bg-neon-cyan/80"
          >
            Submit Solution
          </Button>
          
          <Button 
            type="button"
            variant="outline"
            onClick={() => setShowHint(!showHint)}
            className="border-neon-pink text-neon-pink hover:bg-neon-pink/20"
          >
            {showHint ? "Hide Hint" : "Show Hint"}
          </Button>
        </div>
      </form>

      {showHint && (
        <div className="mt-4 p-2 border border-neon-pink/30 rounded bg-black/50">
          <p className="text-neon-pink text-sm">{puzzle.hint}</p>
        </div>
      )}
    </div>
  );
};

export default HackingPuzzle;