import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";

interface TerminalProps {
  onCommand: (command: string) => void;
  output: string[];
}

const Terminal: React.FC<TerminalProps> = ({ onCommand, output }) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input);
      setHistory([...history, input]);
      setInput("");
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div className="terminal-window min-h-[300px] flex flex-col">
      <div className="flex items-center justify-between mb-2 border-b border-neon-cyan/30 pb-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-neon-cyan text-sm">Terminal v1.0</span>
      </div>
      
      <div ref={terminalRef} className="flex-1 overflow-y-auto mb-4">
        {output.map((line, i) => (
          <div key={i} className="text-green-400 mb-1">
            {line}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <span className="text-neon-cyan">{">"}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-neon-cyan"
          autoFocus
        />
        <Button 
          type="submit" 
          variant="outline"
          className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan/20"
        >
          Enter
        </Button>
      </form>
    </div>
  );
};

export default Terminal;