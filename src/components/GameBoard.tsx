import React, { useState } from 'react';
import Terminal from './Terminal';
import HackingPuzzle from './HackingPuzzle';
import { puzzles } from '../utils/gameLogic';
import { saveScore } from '../utils/arweave';
import { useToast } from "@/components/ui/use-toast";

const GameBoard = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [score, setScore] = useState(0);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "Welcome to CyberHack v1.0",
    "Type 'help' for available commands",
  ]);
  const { toast } = useToast();

  const handleCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    let response: string[] = [];

    switch (cmd) {
      case 'help':
        response = [
          "Available commands:",
          "- help: Show this help message",
          "- score: Show current score",
          "- clear: Clear terminal",
          "- next: Skip to next puzzle",
        ];
        break;
      case 'score':
        response = [`Current score: ${score} points`];
        break;
      case 'clear':
        setTerminalOutput([]);
        return;
      case 'next':
        if (currentPuzzle < puzzles.length - 1) {
          setCurrentPuzzle(prev => prev + 1);
          response = ["Loading next puzzle..."];
        } else {
          response = ["No more puzzles available."];
        }
        break;
      default:
        response = [`Unknown command: ${command}`];
    }

    setTerminalOutput(prev => [...prev, `> ${command}`, ...response]);
  };

  const handlePuzzleSolved = async (points: number) => {
    const newScore = score + points;
    setScore(newScore);
    
    try {
      // In a real app, you'd get the wallet from user connection
      const mockWallet = {};
      await saveScore(newScore, mockWallet);
      
      toast({
        title: "Puzzle Solved!",
        description: `You earned ${points} points!`,
        duration: 3000,
      });

      if (currentPuzzle < puzzles.length - 1) {
        setCurrentPuzzle(prev => prev + 1);
      } else {
        setTerminalOutput(prev => [
          ...prev,
          "Congratulations! You've completed all puzzles!",
          `Final score: ${newScore}`,
        ]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save score to blockchain",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <div className="space-y-6">
        <h2 className="text-2xl text-neon-cyan glitch-text" data-text="Terminal Access">
          Terminal Access
        </h2>
        <Terminal onCommand={handleCommand} output={terminalOutput} />
      </div>
      
      <div className="space-y-6">
        <h2 className="text-2xl text-neon-cyan glitch-text" data-text="Active Mission">
          Active Mission
        </h2>
        {currentPuzzle < puzzles.length ? (
          <HackingPuzzle
            puzzle={puzzles[currentPuzzle]}
            onSolved={handlePuzzleSolved}
          />
        ) : (
          <div className="terminal-window">
            <h3 className="text-xl text-neon-pink mb-4">Mission Complete</h3>
            <p className="text-neon-cyan">Final Score: {score}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameBoard;