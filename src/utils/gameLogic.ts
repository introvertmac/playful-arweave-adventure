export type PuzzleType = {
  id: number;
  code: string;
  solution: string;
  hint: string;
  points: number;
};

export const puzzles: PuzzleType[] = [
  {
    id: 1,
    code: "01001010",
    solution: "4A",
    hint: "Convert binary to hex",
    points: 100
  },
  {
    id: 2,
    code: "REVERSE_ME",
    solution: "EM_ESREVER",
    hint: "Mirror the string",
    points: 150
  },
  {
    id: 3,
    code: "13-15-4-5",
    solution: "MODE",
    hint: "Convert numbers to letters",
    points: 200
  }
];

export const checkSolution = (puzzle: PuzzleType, answer: string): boolean => {
  return puzzle.solution.toLowerCase() === answer.toLowerCase();
};

export const calculateScore = (timeSpent: number, puzzlePoints: number): number => {
  const timeBonus = Math.max(0, 1000 - timeSpent);
  return puzzlePoints + Math.floor(timeBonus / 10);
};