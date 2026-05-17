import { createContext, useContext, useState, ReactNode } from 'react';

interface GameState {
  gold: number;
  day: number;
  addGold: (amount: number) => void;
}

const GameStateContext = createContext<GameState>({
  gold: 0,
  day: 1,
  addGold: () => {},
});

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [gold, setGold] = useState(1337);
  const [day, _setDay] = useState(() => {
    const start = new Date('2024-01-01').getTime();
    const now = Date.now();
    return Math.floor((now - start) / (1000 * 60 * 60 * 24)) + 1;
  });

  const addGold = (amount: number) => {
    setGold((prev) => prev + amount);
  };

  return (
    <GameStateContext.Provider value={{ gold, day, addGold }}>
      {children}
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  return useContext(GameStateContext);
}
