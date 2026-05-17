import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Season = 'spring' | 'summer' | 'fall' | 'winter';

function getSeasonFromMonth(month: number): Season {
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'fall';
  return 'winter';
}

interface SeasonContextType {
  season: Season;
  setSeason: (season: Season) => void;
}

const SeasonContext = createContext<SeasonContextType>({
  season: 'spring',
  setSeason: () => {},
});

export function SeasonProvider({ children }: { children: ReactNode }) {
  const [season, setSeason] = useState<Season>(() => {
    return getSeasonFromMonth(new Date().getMonth() + 1);
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-season', season);
  }, [season]);

  return (
    <SeasonContext.Provider value={{ season, setSeason }}>
      {children}
    </SeasonContext.Provider>
  );
}

export function useSeason() {
  return useContext(SeasonContext);
}

export { getSeasonFromMonth };
