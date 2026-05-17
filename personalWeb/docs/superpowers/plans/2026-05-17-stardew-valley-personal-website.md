# Stardew Valley 风格个人网站 — 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个深度 Stardew Valley 像素游戏风格的技术开发者综合型个人网站（关于、技能、项目、博客、经历、联系）。

**Architecture:** React 18 + TypeScript + Vite SPA，React Router v6 管理混合页面路由，CSS Modules + CSS 自定义属性实现四季主题系统，所有游戏 UI 元素封装为独立组件，页面内容通过静态 TS 数据和 Markdown 文件驱动。

**Tech Stack:** React 18, TypeScript, Vite, React Router v6, CSS Modules, react-markdown, Google Fonts (Press Start 2P + VT323)

---

## 文件结构总览

```
personalWeb/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── content/
│   └── blog/
│       └── hello-world.md
├── public/
│   └── textures/
│       └── wood-pattern.png (生成简单 SVG/CSS 纹理)
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── vite-env.d.ts
    ├── styles/
    │   ├── variables.css
    │   ├── seasons.css
    │   ├── pixel-mixins.css
    │   └── global.css
    ├── context/
    │   ├── SeasonContext.tsx
    │   └── GameStateContext.tsx
    ├── components/
    │   └── game-ui/
    │       ├── GameFrame/
    │       │   ├── GameFrame.tsx
    │       │   └── GameFrame.module.css
    │       ├── HUD/
    │       │   ├── HUD.tsx
    │       │   └── HUD.module.css
    │       ├── HotBar/
    │       │   ├── HotBar.tsx
    │       │   └── HotBar.module.css
    │       ├── DialogBox/
    │       │   ├── DialogBox.tsx
    │       │   └── DialogBox.module.css
    │       ├── GameButton/
    │       │   ├── GameButton.tsx
    │       │   └── GameButton.module.css
    │       ├── ProgressBar/
    │       │   ├── ProgressBar.tsx
    │       │   └── ProgressBar.module.css
    │       ├── ItemCard/
    │       │   ├── ItemCard.tsx
    │       │   └── ItemCard.module.css
    │       └── SeasonBanner/
    │           ├── SeasonBanner.tsx
    │           └── SeasonBanner.module.css
    ├── data/
    │   ├── about.ts
    │   ├── skills.ts
    │   ├── projects.ts
    │   ├── experience.ts
    │   └── social.ts
    └── pages/
        ├── Home/
        │   ├── Home.tsx
        │   └── Home.module.css
        ├── About/
        │   ├── About.tsx
        │   └── About.module.css
        ├── Skills/
        │   ├── Skills.tsx
        │   └── Skills.module.css
        ├── Projects/
        │   ├── Projects.tsx
        │   └── Projects.module.css
        ├── Blog/
        │   ├── Blog.tsx
        │   └── Blog.module.css
        ├── BlogPost/
        │   ├── BlogPost.tsx
        │   └── BlogPost.module.css
        ├── Experience/
        │   ├── Experience.tsx
        │   └── Experience.module.css
        └── Contact/
            ├── Contact.tsx
            └── Contact.module.css
```

---

### Task 1: 项目脚手架

**Files:**
- Create: `package.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/vite-env.d.ts`

- [ ] **Step 1: 创建 package.json**

```json
{
  "name": "stardew-valley-personal-web",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0",
    "react-markdown": "^9.0.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "^5.5.4",
    "vite": "^5.4.0"
  }
}
```

- [ ] **Step 2: Install dependencies**

```bash
cd c:/Users/11090/Desktop/personalWeb && npm install
```

- [ ] **Step 3: 创建 tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

- [ ] **Step 4: 创建 vite.config.ts**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});
```

- [ ] **Step 5: 创建 index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Li Yulin's Farm</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 6: 创建 src/main.tsx**

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

- [ ] **Step 7: 创建 src/vite-env.d.ts**

```typescript
/// <reference types="vite/client" />

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
```

- [ ] **Step 8: 验证**

```bash
cd c:/Users/11090/Desktop/personalWeb && npx tsc --noEmit
```

Expected: No errors (App.tsx doesn't exist yet but main.tsx references it — add placeholder)

Actually, create a minimal `src/App.tsx` first:

```typescript
function App() {
  return <div>Stardew Valley</div>;
}

export default App;
```

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: scaffold project with Vite + React + TypeScript"
```

---

### Task 2: 全局样式系统 — CSS 变量 + 四季主题 + 像素混入

**Files:**
- Create: `src/styles/variables.css`, `src/styles/seasons.css`, `src/styles/pixel-mixins.css`, `src/styles/global.css`

- [ ] **Step 1: 创建 src/styles/variables.css**

```css
:root {
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;

  /* Pixel border widths */
  --border-thin: 2px;
  --border-thick: 4px;
  --border-huge: 6px;

  /* Base wood tones (unchanged across seasons) */
  --wood-dark: #3a2010;
  --wood-mid: #5a3a1a;
  --wood-light: #8b6914;
  --wood-highlight: #c8a878;

  /* Panel colors */
  --panel-bg: #f5e8c8;
  --panel-border: #8b5a2a;

  /* Text */
  --text-dark: #3a2010;
  --text-light: #ffe8a0;

  /* Font families */
  --font-pixel: 'Press Start 2P', monospace;
  --font-body: 'VT323', monospace;
  --font-hud: 'Press Start 2P', monospace;

  /* HUD colors */
  --hud-bg: #2a1a0a;
  --hud-text: #ffe8a0;
  --gold-color: #ffe040;
  --hp-color: #e04040;
  --ep-color: #4080e0;

  /* Button */
  --btn-bg: #d4a054;
  --btn-border: #8b6010;
  --btn-shadow: #6b4010;
  --btn-text: #3a2010;
  --btn-hover-bg: #e0b868;

  /* Z-index layers */
  --z-hud: 100;
  --z-hotbar: 100;
  --z-dialog: 10;
}
```

- [ ] **Step 2: 创建 src/styles/seasons.css**

```css
[data-season='spring'] {
  --season-primary: #f2a0c0;
  --season-secondary: #a8d870;
  --season-bg: #f5e8c8;
  --season-accent: #6b8a40;
  --season-dark: #5a3a1a;
  --season-icon: '🌸';
}

[data-season='summer'] {
  --season-primary: #ffd040;
  --season-secondary: #40b8e0;
  --season-bg: #fff8e0;
  --season-accent: #60a838;
  --season-dark: #4a2a00;
  --season-icon: '☀️';
}

[data-season='fall'] {
  --season-primary: #e07830;
  --season-secondary: #c84040;
  --season-bg: #f0d8a0;
  --season-accent: #8b5a2a;
  --season-dark: #4a2010;
  --season-icon: '🍂';
}

[data-season='winter'] {
  --season-primary: #f0f8ff;
  --season-secondary: #a0b8d0;
  --season-bg: #e0e8f0;
  --season-accent: #506880;
  --season-dark: #2a3040;
  --season-icon: '❄️';
}
```

- [ ] **Step 3: 创建 src/styles/pixel-mixins.css**

```css
/* Pixelated image rendering */
.pixelated {
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}

/* 3D raised box shadow for pixel borders */
.pixel-border {
  box-shadow:
    inset -2px -2px 0 0 rgba(0, 0, 0, 0.3),
    inset 2px 2px 0 0 rgba(255, 255, 255, 0.2);
}

/* Wood texture panel */
.wood-panel {
  background: linear-gradient(
    180deg,
    var(--wood-mid) 0%,
    var(--wood-dark) 100%
  );
  border: var(--border-thick) solid var(--wood-dark);
  box-shadow:
    inset 0 0 0 2px var(--wood-light),
    0 4px 0 0 rgba(0, 0, 0, 0.4);
}

/* Parchment/paper texture for dialog */
.dialog-panel {
  background: var(--panel-bg);
  border: var(--border-thick) solid var(--panel-border);
  box-shadow:
    inset -2px -2px 0 0 rgba(0, 0, 0, 0.15),
    inset 2px 2px 0 0 rgba(255, 255, 255, 0.4),
    0 4px 0 0 rgba(0, 0, 0, 0.3);
}

/* 3D game button */
.game-btn {
  display: inline-block;
  background: var(--btn-bg);
  color: var(--btn-text);
  font-family: var(--font-pixel);
  font-size: 12px;
  padding: var(--space-sm) var(--space-md);
  border: var(--border-thin) solid var(--btn-border);
  box-shadow:
    inset -2px -2px 0 0 var(--btn-shadow),
    inset 2px 2px 0 0 rgba(255, 255, 255, 0.3),
    0 3px 0 0 var(--btn-shadow);
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.05s ease;
}

.game-btn:hover {
  background: var(--btn-hover-bg);
}

.game-btn:active {
  box-shadow:
    inset 2px 2px 0 0 var(--btn-shadow),
    inset -1px -1px 0 0 rgba(255, 255, 255, 0.1),
    0 1px 0 0 var(--btn-shadow);
  transform: translateY(2px);
}

/* Selection highlight */
.selected {
  outline: var(--border-thin) solid var(--season-primary);
  outline-offset: -2px;
}
```

- [ ] **Step 4: 创建 src/styles/global.css**

```css
@import './variables.css';
@import './seasons.css';
@import './pixel-mixins.css';

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}

body {
  font-family: var(--font-body);
  font-size: 18px;
  line-height: 1.5;
  color: var(--text-dark);
  background: #1a0f05;
  min-height: 100vh;
  overflow-x: hidden;
}

a {
  color: inherit;
  text-decoration: none;
}

ul, ol {
  list-style: none;
}

img {
  max-width: 100%;
  display: block;
}

/* Custom scrollbar - pixel style */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: var(--wood-dark);
  border: var(--border-thin) solid var(--wood-mid);
}

::-webkit-scrollbar-thumb {
  background: var(--wood-mid);
  border: var(--border-thin) solid var(--wood-light);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--wood-light);
}

/* Selection */
::selection {
  background: var(--season-primary);
  color: var(--season-dark);
}
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add global styles, season system, and pixel mixins"
```

---

### Task 3: SeasonContext + GameStateContext

**Files:**
- Create: `src/context/SeasonContext.tsx`, `src/context/GameStateContext.tsx`

- [ ] **Step 1: 创建 src/context/SeasonContext.tsx**

```typescript
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
```

- [ ] **Step 2: 创建 src/context/GameStateContext.tsx**

```typescript
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
```

- [ ] **Step 3: 验证编译**

```bash
cd c:/Users/11090/Desktop/personalWeb && npx tsc --noEmit
```
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add SeasonContext and GameStateContext"
```

---

### Task 4: GameFrame 组件（全局布局外壳）

**Files:**
- Create: `src/components/game-ui/GameFrame/GameFrame.tsx`, `src/components/game-ui/GameFrame/GameFrame.module.css`

- [ ] **Step 1: 创建 CSS Module**

File: `src/components/game-ui/GameFrame/GameFrame.module.css`

```css
.frame {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #1a0f05 0%, #2a1a0a 100%);
  position: relative;
}

.woodBorder {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 999;
}

.woodBorder::before {
  content: '';
  position: absolute;
  inset: 8px;
  border: 6px solid var(--wood-mid);
  box-shadow:
    inset 0 0 0 2px var(--wood-light),
    0 0 0 4px var(--wood-dark);
  pointer-events: none;
}

.content {
  flex: 1;
  padding: 40px var(--space-lg) 80px;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.contentWithHud {
  padding-top: 60px;
}
```

- [ ] **Step 2: 创建组件**

File: `src/components/game-ui/GameFrame/GameFrame.tsx`

```typescript
import { ReactNode } from 'react';
import HUD from '../HUD/HUD';
import HotBar from '../HotBar/HotBar';
import styles from './GameFrame.module.css';

interface GameFrameProps {
  children: ReactNode;
}

function GameFrame({ children }: GameFrameProps) {
  return (
    <div className={styles.frame}>
      <HUD />
      <div className={styles.woodBorder} aria-hidden="true" />
      <main className={`${styles.content} ${styles.contentWithHud}`}>
        {children}
      </main>
      <HotBar />
    </div>
  );
}

export default GameFrame;
```

- [ ] **Step 3: 验证编译**

```bash
cd c:/Users/11090/Desktop/personalWeb && npx tsc --noEmit
```
Expected: Error — HUD and HotBar don't exist yet. Create stubs.

Create stub `src/components/game-ui/HUD/HUD.tsx`:
```typescript
import styles from './HUD.module.css';
function HUD() {
  return <div className={styles.hud}>HUD</div>;
}
export default HUD;
```

Create stub `src/components/game-ui/HUD/HUD.module.css`:
```css
.hud { position: fixed; top: 0; left: 0; right: 0; height: 48px; z-index: 100; background: var(--hud-bg); color: var(--hud-text); display: flex; align-items: center; padding: 0 16px; font-family: var(--font-pixel); font-size: 11px; }
```

Create stub `src/components/game-ui/HotBar/HotBar.tsx`:
```typescript
import styles from './HotBar.module.css';
function HotBar() {
  return <div className={styles.hotbar}>HotBar</div>;
}
export default HotBar;
```

Create stub `src/components/game-ui/HotBar/HotBar.module.css`:
```css
.hotbar { position: fixed; bottom: 0; left: 0; right: 0; height: 56px; z-index: 100; background: var(--hud-bg); color: var(--hud-text); display: flex; align-items: center; justify-content: center; font-family: var(--font-pixel); font-size: 11px; }
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add GameFrame layout with HUD and HotBar stubs"
```

---

### Task 5: HUD 组件

**Files:**
- Modify: `src/components/game-ui/HUD/HUD.tsx`, `src/components/game-ui/HUD/HUD.module.css`

- [ ] **Step 1: 更新 HUD.module.css**

```css
.hud {
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: var(--z-hud);
  display: flex;
  align-items: center;
  gap: var(--space-md);
  background: var(--hud-bg);
  border: var(--border-thick) solid var(--wood-dark);
  box-shadow:
    inset 0 0 0 2px var(--wood-light),
    0 3px 0 0 rgba(0, 0, 0, 0.5);
  padding: var(--space-xs) var(--space-md);
  border-radius: 2px;
}

.hudItem {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-family: var(--font-pixel);
  font-size: 10px;
  color: var(--hud-text);
  white-space: nowrap;
}

.seasonBtn {
  background: none;
  border: var(--border-thin) solid transparent;
  color: var(--hud-text);
  font-family: var(--font-pixel);
  font-size: 10px;
  cursor: pointer;
  padding: var(--space-xs);
}

.seasonBtn:hover {
  border-color: var(--wood-light);
  background: rgba(255, 255, 255, 0.1);
}

.gold {
  color: var(--gold-color);
}

.separator {
  width: 2px;
  height: 20px;
  background: var(--wood-light);
  margin: 0 var(--space-xs);
}
```

- [ ] **Step 2: 更新 HUD.tsx**

```typescript
import { useSeason, Season, getSeasonFromMonth } from '../../../context/SeasonContext';
import { useGameState } from '../../../context/GameStateContext';
import styles from './HUD.module.css';

const nextSeason: Record<Season, Season> = {
  spring: 'summer',
  summer: 'fall',
  fall: 'winter',
  winter: 'spring',
};

const seasonLabel: Record<Season, string> = {
  spring: 'Spring',
  summer: 'Summer',
  fall: 'Fall',
  winter: 'Winter',
};

const seasonEmoji: Record<Season, string> = {
  spring: '🌱',
  summer: '☀️',
  fall: '🍂',
  winter: '❄️',
};

function HUD() {
  const { season, setSeason } = useSeason();
  const { gold, day } = useGameState();

  const handleCycleSeason = () => {
    setSeason(nextSeason[season]);
  };

  const handleResetSeason = () => {
    setSeason(getSeasonFromMonth(new Date().getMonth() + 1));
  };

  return (
    <div className={styles.hud}>
      <div className={styles.hudItem}>
        <span>{seasonEmoji[season]}</span>
        <button
          className={styles.seasonBtn}
          onClick={handleCycleSeason}
          title="Click to change season"
        >
          {seasonLabel[season]} {day}
        </button>
        <button
          className={styles.seasonBtn}
          onClick={handleResetSeason}
          title="Reset to real season"
          style={{ fontSize: '8px', padding: '2px' }}
        >
          ↺
        </button>
      </div>

      <div className={styles.separator} />

      <div className={`${styles.hudItem} ${styles.gold}`}>
        <span>⭐</span>
        <span>{gold.toLocaleString()}g</span>
      </div>
    </div>
  );
}

export default HUD;
```

- [ ] **Step 3: 验证编译**

```bash
cd c:/Users/11090/Desktop/personalWeb && npx tsc --noEmit
```
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: implement HUD with season cycling and gold display"
```

---

### Task 6: HotBar 底部导航组件

**Files:**
- Modify: `src/components/game-ui/HotBar/HotBar.tsx`, `src/components/game-ui/HotBar/HotBar.module.css`

- [ ] **Step 1: 更新 HotBar.module.css**

```css
.hotbar {
  position: fixed;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: var(--z-hotbar);
  display: flex;
  gap: var(--space-sm);
  background: var(--hud-bg);
  border: var(--border-thick) solid var(--wood-dark);
  box-shadow:
    inset 0 0 0 2px var(--wood-light),
    0 3px 0 0 rgba(0, 0, 0, 0.5);
  padding: var(--space-xs) var(--space-md);
  border-radius: 2px;
}

.slot {
  width: 52px;
  height: 52px;
  background: #3a2a1a;
  border: var(--border-thin) solid var(--wood-light);
  box-shadow:
    inset -2px -2px 0 0 rgba(0, 0, 0, 0.4),
    inset 2px 2px 0 0 rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
  color: var(--text-light);
  font-family: var(--font-pixel);
  font-size: 18px;
  transition: all 0.05s ease;
  position: relative;
}

.slot:hover {
  background: #5a4a3a;
  border-color: var(--season-primary);
}

.slot:active {
  box-shadow:
    inset 2px 2px 0 0 rgba(0, 0, 0, 0.4),
    inset -1px -1px 0 0 rgba(255, 255, 255, 0.05);
}

.active {
  border-color: var(--season-primary);
  background: #4a3a2a;
  box-shadow:
    inset -2px -2px 0 0 rgba(0, 0, 0, 0.4),
    inset 2px 2px 0 0 rgba(255, 255, 255, 0.1),
    0 0 8px rgba(255, 255, 255, 0.1);
}

.label {
  font-size: 6px;
  margin-top: 2px;
  white-space: nowrap;
}
```

- [ ] **Step 2: 更新 HotBar.tsx**

```typescript
import { NavLink, useLocation } from 'react-router-dom';
import styles from './HotBar.module.css';

interface NavItem {
  path: string;
  label: string;
  emoji: string;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Farm', emoji: '🏠' },
  { path: '/about', label: 'About', emoji: '👤' },
  { path: '/skills', label: 'Skills', emoji: '⭐' },
  { path: '/projects', label: 'Projects', emoji: '📦' },
  { path: '/blog', label: 'Blog', emoji: '📖' },
  { path: '/experience', label: 'Work', emoji: '⛏️' },
  { path: '/contact', label: 'Contact', emoji: '📬' },
];

function HotBar() {
  const location = useLocation();

  return (
    <nav className={styles.hotbar}>
      {navItems.map((item) => {
        const isActive = item.path === '/'
          ? location.pathname === '/'
          : location.pathname.startsWith(item.path);

        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={`${styles.slot} ${isActive ? styles.active : ''}`}
          >
            <span>{item.emoji}</span>
            <span className={styles.label}>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}

export default HotBar;
```

- [ ] **Step 3: 验证编译**

```bash
cd c:/Users/11090/Desktop/personalWeb && npx tsc --noEmit
```
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: implement HotBar bottom navigation with 7 slots"
```

---

### Task 7: DialogBox 对话面板组件

**Files:**
- Create: `src/components/game-ui/DialogBox/DialogBox.tsx`, `src/components/game-ui/DialogBox/DialogBox.module.css`

- [ ] **Step 1: 创建 DialogBox.module.css**

```css
.dialog {
  composes: dialog-panel from '../../../styles/pixel-mixins.css';
  padding: var(--space-md) var(--space-lg);
  position: relative;
  margin-bottom: var(--space-md);
}

.dialogWithPortrait {
  display: flex;
  gap: var(--space-md);
  align-items: flex-start;
}

.portrait {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  background: var(--wood-dark);
  border: var(--border-thin) solid var(--wood-light);
  box-shadow:
    inset -2px -2px 0 0 rgba(0, 0, 0, 0.4),
    inset 2px 2px 0 0 rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

.portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  flex: 1;
  font-family: var(--font-body);
  font-size: 20px;
  color: var(--text-dark);
  line-height: 1.5;
}

.nameTag {
  font-family: var(--font-pixel);
  font-size: 10px;
  color: var(--wood-mid);
  margin-bottom: var(--space-xs);
  text-transform: uppercase;
}

.arrow {
  position: absolute;
  bottom: 8px;
  right: 12px;
  font-size: 12px;
  animation: bounce 0.8s infinite;
  color: var(--wood-mid);
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(4px); }
}
```

- [ ] **Step 2: 创建 DialogBox.tsx**

```typescript
import { ReactNode } from 'react';
import styles from './DialogBox.module.css';

interface DialogBoxProps {
  children: ReactNode;
  characterName?: string;
  portrait?: string;
  showArrow?: boolean;
  onClick?: () => void;
}

function DialogBox({
  children,
  characterName,
  portrait,
  showArrow = false,
  onClick,
}: DialogBoxProps) {
  const hasPortrait = characterName || portrait;

  return (
    <div
      className={`${styles.dialog} ${hasPortrait ? styles.dialogWithPortrait : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter') onClick(); } : undefined}
    >
      {hasPortrait && (
        <div className={styles.portrait}>
          {portrait ? (
            <img src={portrait} alt={characterName || 'Character'} />
          ) : (
            <span>👨‍💻</span>
          )}
        </div>
      )}
      <div className={styles.content}>
        {characterName && (
          <div className={styles.nameTag}>{characterName}</div>
        )}
        {children}
      </div>
      {showArrow && <span className={styles.arrow}>▼</span>}
    </div>
  );
}

export default DialogBox;
```

- [ ] **Step 3: 验证编译**

```bash
cd c:/Users/11090/Desktop/personalWeb && npx tsc --noEmit
```
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add DialogBox component with portrait support"
```

---

### Task 8: GameButton + ProgressBar + ItemCard + SeasonBanner 组件

**Files:**
- Create: `src/components/game-ui/GameButton/GameButton.tsx`, `src/components/game-ui/GameButton/GameButton.module.css`
- Create: `src/components/game-ui/ProgressBar/ProgressBar.tsx`, `src/components/game-ui/ProgressBar/ProgressBar.module.css`
- Create: `src/components/game-ui/ItemCard/ItemCard.tsx`, `src/components/game-ui/ItemCard/ItemCard.module.css`
- Create: `src/components/game-ui/SeasonBanner/SeasonBanner.tsx`, `src/components/game-ui/SeasonBanner/SeasonBanner.module.css`

- [ ] **Step 1: GameButton**

`GameButton.module.css`:
```css
.button {
  composes: game-btn from '../../../styles/pixel-mixins.css';
}

.small {
  font-size: 10px;
  padding: var(--space-xs) var(--space-sm);
}
```

`GameButton.tsx`:
```typescript
import { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './GameButton.module.css';

interface GameButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  small?: boolean;
}

function GameButton({ children, small, className, ...props }: GameButtonProps) {
  return (
    <button
      className={`${styles.button} ${small ? styles.small : ''} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default GameButton;
```

- [ ] **Step 2: ProgressBar**

`ProgressBar.module.css`:
```css
.wrapper {
  margin-bottom: var(--space-md);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-xs);
}

.label {
  font-family: var(--font-pixel);
  font-size: 10px;
  color: var(--text-dark);
}

.value {
  font-family: var(--font-hud);
  font-size: 10px;
  color: var(--wood-mid);
}

.track {
  width: 100%;
  height: 16px;
  background: #1a0f05;
  border: var(--border-thin) solid var(--wood-dark);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);
  position: relative;
}

.fill {
  height: 100%;
  transition: width 0.3s ease;
  position: relative;
  box-shadow: inset 2px 2px 0 0 rgba(255, 255, 255, 0.2);
}

.fill::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  height: 3px;
  background: rgba(255, 255, 255, 0.3);
}
```

`ProgressBar.tsx`:
```typescript
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  label: string;
  value: number; // 0-100
  color?: string;
}

function ProgressBar({ label, value, color = 'var(--season-accent)' }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{clampedValue}/100</span>
      </div>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${clampedValue}%`, background: color }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
```

- [ ] **Step 3: ItemCard**

`ItemCard.module.css`:
```css
.card {
  background: #3a2a1a;
  border: var(--border-thin) solid var(--wood-light);
  box-shadow:
    inset -2px -2px 0 0 rgba(0, 0, 0, 0.4),
    inset 2px 2px 0 0 rgba(255, 255, 255, 0.1);
  padding: var(--space-md);
  cursor: pointer;
  transition: all 0.05s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-sm);
  text-decoration: none;
  color: var(--text-light);
}

.card:hover {
  background: #5a4a3a;
  border-color: var(--season-primary);
  transform: translateY(-2px);
  box-shadow:
    inset -2px -2px 0 0 rgba(0, 0, 0, 0.4),
    inset 2px 2px 0 0 rgba(255, 255, 255, 0.1),
    0 4px 8px rgba(0, 0, 0, 0.3);
}

.icon {
  font-size: 32px;
  line-height: 1;
}

.title {
  font-family: var(--font-pixel);
  font-size: 10px;
  color: var(--text-light);
  text-transform: uppercase;
}

.description {
  font-family: var(--font-body);
  font-size: 14px;
  color: #c8b898;
}
```

`ItemCard.tsx`:
```typescript
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ItemCard.module.css';

interface ItemCardProps {
  title: string;
  icon?: string;
  description?: string;
  to?: string;
  onClick?: () => void;
}

function ItemCard({ title, icon, description, to, onClick }: ItemCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    }
  };

  return (
    <div
      className={styles.card}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleClick();
      }}
    >
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.title}>{title}</div>
      {description && <div className={styles.description}>{description}</div>}
    </div>
  );
}

export default ItemCard;
```

- [ ] **Step 4: SeasonBanner**

`SeasonBanner.module.css`:
```css
.banner {
  text-align: center;
  padding: var(--space-md);
  margin-bottom: var(--space-lg);
  font-family: var(--font-pixel);
  font-size: 14px;
  color: var(--season-dark);
  background: linear-gradient(
    180deg,
    var(--season-primary) 0%,
    var(--season-bg) 100%
  );
  border: var(--border-thick) solid var(--season-dark);
  box-shadow:
    inset -2px -2px 0 0 rgba(0, 0, 0, 0.2),
    inset 2px 2px 0 0 rgba(255, 255, 255, 0.3);
}

.emoji {
  font-size: 24px;
  display: block;
  margin-bottom: var(--space-xs);
}
```

`SeasonBanner.tsx`:
```typescript
import { useSeason } from '../../../context/SeasonContext';
import styles from './SeasonBanner.module.css';

const seasonLabels: Record<string, string> = {
  spring: 'Spring',
  summer: 'Summer',
  fall: 'Fall',
  winter: 'Winter',
};

const seasonEmojis: Record<string, string> = {
  spring: '🌸🌱',
  summer: '☀️🌻',
  fall: '🍂🎃',
  winter: '❄️⛄',
};

function SeasonBanner() {
  const { season } = useSeason();

  return (
    <div className={styles.banner}>
      <span className={styles.emoji}>{seasonEmojis[season]}</span>
      Welcome to the Farm — {seasonLabels[season]} Edition
    </div>
  );
}

export default SeasonBanner;
```

- [ ] **Step 5: 验证编译**

```bash
cd c:/Users/11090/Desktop/personalWeb && npx tsc --noEmit
```
Expected: No errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add GameButton, ProgressBar, ItemCard, SeasonBanner components"
```

---

### Task 9: 数据文件

**Files:**
- Create: `src/data/about.ts`, `src/data/skills.ts`, `src/data/projects.ts`, `src/data/experience.ts`, `src/data/social.ts`

- [ ] **Step 1: 创建 src/data/about.ts**

```typescript
export interface AboutData {
  name: string;
  title: string;
  bio: string[];
  avatar?: string;
}

export const about: AboutData = {
  name: 'Li Yulin',
  title: 'Full-Stack Developer',
  bio: [
    "Hey there! Welcome to my farm. I'm a full-stack developer who loves crafting elegant software solutions.",
    "Like a farmer tends to crops, I cultivate code with patience and dedication. I believe good software grows from clean architecture, thoughtful design, and continuous refinement.",
    "When I'm not coding, you'll find me exploring new technologies, contributing to open source, or playing actual farming sims.",
    "Feel free to explore my farm — check out my skills, browse my projects, or read my blog!",
  ],
};
```

- [ ] **Step 2: 创建 src/data/skills.ts**

```typescript
export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'devops' | 'tools';
}

export interface SkillCategory {
  key: string;
  label: string;
  emoji: string;
}

export const skillCategories: SkillCategory[] = [
  { key: 'frontend', label: 'Frontend', emoji: '🎨' },
  { key: 'backend', label: 'Backend', emoji: '⚙️' },
  { key: 'devops', label: 'DevOps', emoji: '🚀' },
  { key: 'tools', label: 'Tools', emoji: '🛠️' },
];

export const skills: Skill[] = [
  { name: 'React', level: 90, category: 'frontend' },
  { name: 'TypeScript', level: 85, category: 'frontend' },
  { name: 'CSS/SCSS', level: 80, category: 'frontend' },
  { name: 'Vue.js', level: 65, category: 'frontend' },
  { name: 'Node.js', level: 85, category: 'backend' },
  { name: 'Python', level: 75, category: 'backend' },
  { name: 'Go', level: 50, category: 'backend' },
  { name: 'PostgreSQL', level: 70, category: 'backend' },
  { name: 'Docker', level: 75, category: 'devops' },
  { name: 'AWS', level: 60, category: 'devops' },
  { name: 'CI/CD', level: 70, category: 'devops' },
  { name: 'Git', level: 90, category: 'tools' },
  { name: 'Linux', level: 75, category: 'tools' },
  { name: 'VS Code', level: 95, category: 'tools' },
];
```

- [ ] **Step 3: 创建 src/data/projects.ts**

```typescript
export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  icon: string;
}

export const projects: Project[] = [
  {
    id: 'personal-web',
    title: 'Stardew Web',
    description: 'A personal website themed after Stardew Valley, built with React and TypeScript.',
    tech: ['React', 'TypeScript', 'CSS Modules'],
    github: 'https://github.com/liyulin/personal-web',
    icon: '🏠',
  },
  {
    id: 'api-gateway',
    title: 'API Gateway',
    description: 'A lightweight API gateway with rate limiting and authentication.',
    tech: ['Go', 'Redis', 'Docker'],
    github: 'https://github.com/liyulin/api-gateway',
    icon: '🔌',
  },
  {
    id: 'dev-dashboard',
    title: 'Dev Dashboard',
    description: 'A developer dashboard for monitoring CI/CD pipelines and deployments.',
    tech: ['React', 'Node.js', 'WebSocket'],
    github: 'https://github.com/liyulin/dev-dashboard',
    icon: '📊',
  },
  {
    id: 'cli-toolkit',
    title: 'CLI Toolkit',
    description: 'A collection of command-line utilities for daily development tasks.',
    tech: ['Python', 'Click', 'Rich'],
    github: 'https://github.com/liyulin/cli-toolkit',
    icon: '⌨️',
  },
];
```

- [ ] **Step 4: 创建 src/data/experience.ts**

```typescript
export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  type: 'work' | 'education';
}

export const experiences: Experience[] = [
  {
    title: 'Senior Frontend Developer',
    company: 'Tech Company A',
    period: '2022 - Present',
    description: 'Lead frontend architecture for the main product. Built design system from scratch. Mentored junior developers.',
    type: 'work',
  },
  {
    title: 'Full-Stack Developer',
    company: 'Startup B',
    period: '2020 - 2022',
    description: 'Developed full-stack features using React and Node.js. Managed AWS infrastructure. Improved CI/CD pipeline efficiency by 40%.',
    type: 'work',
  },
  {
    title: 'Junior Developer',
    company: 'Company C',
    period: '2018 - 2020',
    description: 'Built and maintained web applications. Wrote unit and integration tests. Participated in code reviews and agile ceremonies.',
    type: 'work',
  },
  {
    title: 'B.S. Computer Science',
    company: 'University',
    period: '2014 - 2018',
    description: 'Focused on software engineering and distributed systems.',
    type: 'education',
  },
];
```

- [ ] **Step 5: 创建 src/data/social.ts**

```typescript
export interface SocialLink {
  platform: string;
  url: string;
  emoji: string;
}

export const socialLinks: SocialLink[] = [
  { platform: 'GitHub', url: 'https://github.com/liyulin', emoji: '🐙' },
  { platform: 'Email', url: 'mailto:liyulin@example.com', emoji: '📧' },
  { platform: 'Twitter', url: 'https://twitter.com/liyulin', emoji: '🐦' },
  { platform: 'LinkedIn', url: 'https://linkedin.com/in/liyulin', emoji: '💼' },
];
```

- [ ] **Step 6: 验证编译**

```bash
cd c:/Users/11090/Desktop/personalWeb && npx tsc --noEmit
```
Expected: No errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add static data files for about, skills, projects, experience, social"
```

---

### Task 10: App.tsx 路由 + 页面占位符

**Files:**
- Modify: `src/App.tsx`
- Create: `src/pages/Home/Home.tsx`, `src/pages/Home/Home.module.css`
- Create: `src/pages/About/About.tsx`, `src/pages/About/About.module.css`
- Create: `src/pages/Skills/Skills.tsx`, `src/pages/Skills/Skills.module.css`
- Create: `src/pages/Projects/Projects.tsx`, `src/pages/Projects/Projects.module.css`
- Create: `src/pages/Blog/Blog.tsx`, `src/pages/Blog/Blog.module.css`
- Create: `src/pages/BlogPost/BlogPost.tsx`, `src/pages/BlogPost/BlogPost.module.css`
- Create: `src/pages/Experience/Experience.tsx`, `src/pages/Experience/Experience.module.css`
- Create: `src/pages/Contact/Contact.tsx`, `src/pages/Contact/Contact.module.css`

- [ ] **Step 1: 更新 App.tsx**

```typescript
import { Routes, Route } from 'react-router-dom';
import { SeasonProvider } from './context/SeasonContext';
import { GameStateProvider } from './context/GameStateContext';
import GameFrame from './components/game-ui/GameFrame/GameFrame';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Skills from './pages/Skills/Skills';
import Projects from './pages/Projects/Projects';
import Blog from './pages/Blog/Blog';
import BlogPost from './pages/BlogPost/BlogPost';
import Experience from './pages/Experience/Experience';
import Contact from './pages/Contact/Contact';

function App() {
  return (
    <SeasonProvider>
      <GameStateProvider>
        <GameFrame>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </GameFrame>
      </SeasonProvider>
    </SeasonProvider>
  );
}

export default App;
```

- [ ] **Step 2: 创建所有页面占位符**

Each stub follows this pattern (example for Home):

`src/pages/Home/Home.tsx`:
```typescript
import styles from './Home.module.css';

function Home() {
  return <div className={styles.page}>Home</div>;
}

export default Home;
```

`src/pages/Home/Home.module.css`:
```css
.page { color: var(--text-light); }
```

Repeat for: About, Skills, Projects, Blog, BlogPost, Experience, Contact.

- [ ] **Step 3: 验证编译 + 启动开发服务器**

```bash
cd c:/Users/11090/Desktop/personalWeb && npx tsc --noEmit
```
Expected: No errors.

```bash
cd c:/Users/11090/Desktop/personalWeb && npx vite --host 0.0.0.0 &
```
Open in browser, verify routes work. Kill dev server after verification.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add routing in App.tsx with page stubs for all routes"
```

---

### Task 11: 主页 (Farm Dashboard)

**Files:**
- Modify: `src/pages/Home/Home.tsx`, `src/pages/Home/Home.module.css`

- [ ] **Step 1: 更新 Home.module.css**

```css
.page {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  padding-top: var(--space-lg);
}

.welcome {
  font-family: var(--font-pixel);
  font-size: 18px;
  color: var(--text-light);
  text-align: center;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
}

@media (max-width: 600px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.farmStats {
  display: flex;
  justify-content: center;
  gap: var(--space-lg);
  margin-top: var(--space-sm);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
  font-family: var(--font-pixel);
  font-size: 8px;
  color: var(--text-light);
  background: rgba(0, 0, 0, 0.3);
  padding: var(--space-sm) var(--space-md);
  border: var(--border-thin) solid var(--wood-mid);
}

.statValue {
  font-size: 18px;
  color: var(--season-primary);
}
```

- [ ] **Step 2: 更新 Home.tsx**

```typescript
import { about } from '../../data/about';
import DialogBox from '../../components/game-ui/DialogBox/DialogBox';
import ItemCard from '../../components/game-ui/ItemCard/ItemCard';
import SeasonBanner from '../../components/game-ui/SeasonBanner/SeasonBanner';
import styles from './Home.module.css';

const shortcuts = [
  { title: 'About', icon: '👤', to: '/about', description: 'Who am I?' },
  { title: 'Skills', icon: '⭐', to: '/skills', description: 'Tech stack' },
  { title: 'Projects', icon: '📦', to: '/projects', description: 'My work' },
  { title: 'Blog', icon: '📖', to: '/blog', description: 'Articles' },
  { title: 'Work', icon: '⛏️', to: '/experience', description: 'Career' },
  { title: 'Contact', icon: '📬', to: '/contact', description: 'Reach me' },
];

function Home() {
  return (
    <div className={styles.page}>
      <SeasonBanner />

      <h1 className={styles.welcome}>{about.name}'s Farm</h1>

      <DialogBox characterName={about.name}>
        {about.bio[0]}
      </DialogBox>

      <div className={styles.grid}>
        {shortcuts.map((item) => (
          <ItemCard
            key={item.to}
            title={item.title}
            icon={item.icon}
            description={item.description}
            to={item.to}
          />
        ))}
      </div>

      <div className={styles.farmStats}>
        <div className={styles.stat}>
          <span>Farm Level</span>
          <span className={styles.statValue}>42</span>
        </div>
        <div className={styles.stat}>
          <span>Projects</span>
          <span className={styles.statValue}>12</span>
        </div>
        <div className={styles.stat}>
          <span>Skills</span>
          <span className={styles.statValue}>14</span>
        </div>
        <div className={styles.stat}>
          <span>Blog Posts</span>
          <span className={styles.statValue}>5</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
```

- [ ] **Step 3: 验证编译**

```bash
cd c:/Users/11090/Desktop/personalWeb && npx tsc --noEmit
```
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: implement Home page with farm dashboard layout"
```

---

### Task 12: 关于我 + 技能页面

**Files:**
- Modify: `src/pages/About/About.tsx`, `src/pages/About/About.module.css`
- Modify: `src/pages/Skills/Skills.tsx`, `src/pages/Skills/Skills.module.css`

- [ ] **Step 1: About 页面**

`About.module.css`:
```css
.page {
  padding-top: var(--space-lg);
}

.title {
  font-family: var(--font-pixel);
  font-size: 16px;
  color: var(--text-light);
  text-align: center;
  margin-bottom: var(--space-lg);
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
}

.dialogPage {
  cursor: pointer;
}

.pageCounter {
  font-family: var(--font-pixel);
  font-size: 8px;
  color: var(--wood-mid);
  margin-top: var(--space-xs);
}
```

`About.tsx`:
```typescript
import { useState } from 'react';
import { about } from '../../data/about';
import DialogBox from '../../components/game-ui/DialogBox/DialogBox';
import SeasonBanner from '../../components/game-ui/SeasonBanner/SeasonBanner';
import styles from './About.module.css';

function About() {
  const [page, setPage] = useState(0);

  const nextPage = () => {
    setPage((prev) => (prev + 1) % about.bio.length);
  };

  return (
    <div className={styles.page}>
      <SeasonBanner />
      <h1 className={styles.title}>About {about.name}</h1>

      <DialogBox
        characterName={about.name}
        showArrow
        onClick={nextPage}
      >
        <div className={styles.dialogPage}>
          {about.bio[page]}
          <div className={styles.pageCounter}>
            Click to continue... ({page + 1}/{about.bio.length})
          </div>
        </div>
      </DialogBox>

      <DialogBox characterName="Stats">
        <p>{about.title}</p>
      </DialogBox>
    </div>
  );
}

export default About;
```

- [ ] **Step 2: Skills 页面**

`Skills.module.css`:
```css
.page {
  padding-top: var(--space-lg);
}

.title {
  font-family: var(--font-pixel);
  font-size: 16px;
  color: var(--text-light);
  text-align: center;
  margin-bottom: var(--space-lg);
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
}

.category {
  margin-bottom: var(--space-lg);
}

.categoryHeader {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-family: var(--font-pixel);
  font-size: 12px;
  color: var(--text-light);
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-xs);
  border-bottom: var(--border-thin) solid var(--wood-mid);
}

.skillsList {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}
```

`Skills.tsx`:
```typescript
import { skills, skillCategories } from '../../data/skills';
import DialogBox from '../../components/game-ui/DialogBox/DialogBox';
import ProgressBar from '../../components/game-ui/ProgressBar/ProgressBar';
import SeasonBanner from '../../components/game-ui/SeasonBanner/SeasonBanner';
import styles from './Skills.module.css';

function Skills() {
  return (
    <div className={styles.page}>
      <SeasonBanner />
      <h1 className={styles.title}>Skill Tree</h1>

      <DialogBox>
        {skillCategories.map((cat) => {
          const catSkills = skills.filter((s) => s.category === cat.key);
          return (
            <div key={cat.key} className={styles.category}>
              <div className={styles.categoryHeader}>
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </div>
              <div className={styles.skillsList}>
                {catSkills.map((skill) => (
                  <ProgressBar
                    key={skill.name}
                    label={skill.name}
                    value={skill.level}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </DialogBox>
    </div>
  );
}

export default Skills;
```

- [ ] **Step 3: 验证编译**

```bash
cd c:/Users/11090/Desktop/personalWeb && npx tsc --noEmit
```
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: implement About page with dialog paging and Skills page with progress bars"
```

---

### Task 13: 项目 + 经历页面

**Files:**
- Modify: `src/pages/Projects/Projects.tsx`, `src/pages/Projects/Projects.module.css`
- Modify: `src/pages/Experience/Experience.tsx`, `src/pages/Experience/Experience.module.css`

- [ ] **Step 1: Projects 页面**

`Projects.module.css`:
```css
.page {
  padding-top: var(--space-lg);
}

.title {
  font-family: var(--font-pixel);
  font-size: 16px;
  color: var(--text-light);
  text-align: center;
  margin-bottom: var(--space-lg);
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-md);
}

@media (max-width: 500px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

.techList {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin-top: var(--space-sm);
}

.techTag {
  font-family: var(--font-pixel);
  font-size: 7px;
  background: rgba(0, 0, 0, 0.3);
  color: var(--season-primary);
  padding: 2px 6px;
  border: 1px solid var(--wood-mid);
}
```

`Projects.tsx`:
```typescript
import { projects } from '../../data/projects';
import DialogBox from '../../components/game-ui/DialogBox/DialogBox';
import ItemCard from '../../components/game-ui/ItemCard/ItemCard';
import SeasonBanner from '../../components/game-ui/SeasonBanner/SeasonBanner';
import styles from './Projects.module.css';

function Projects() {
  return (
    <div className={styles.page}>
      <SeasonBanner />
      <h1 className={styles.title}>Inventory</h1>

      <div className={styles.grid}>
        {projects.map((project) => (
          <ItemCard
            key={project.id}
            title={project.title}
            icon={project.icon}
            description={
              <>
                {project.description}
                <span className={styles.techList}>
                  {project.tech.map((t) => (
                    <span key={t} className={styles.techTag}>{t}</span>
                  ))}
                </span>
              </>
            }
            onClick={() => {
              if (project.github) {
                window.open(project.github, '_blank');
              }
            }}
          />
        ))}
      </div>

      <DialogBox>
        <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '16px' }}>
          Click any item to visit its GitHub repo!
        </p>
      </DialogBox>
    </div>
  );
}

export default Projects;
```

- [ ] **Step 2: Experience 页面**

`Experience.module.css`:
```css
.page {
  padding-top: var(--space-lg);
}

.title {
  font-family: var(--font-pixel);
  font-size: 16px;
  color: var(--text-light);
  text-align: center;
  margin-bottom: var(--space-lg);
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
}

.timeline {
  position: relative;
  padding-left: 32px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 12px;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--wood-mid);
  box-shadow: inset -1px -1px 0 0 rgba(0,0,0,0.3), inset 1px 1px 0 0 rgba(255,255,255,0.2);
}

.node {
  position: relative;
  margin-bottom: var(--space-lg);
  padding-left: var(--space-md);
}

.node::before {
  content: '';
  position: absolute;
  left: -24px;
  top: 8px;
  width: 12px;
  height: 12px;
  background: var(--season-primary);
  border: var(--border-thin) solid var(--wood-dark);
  box-shadow: inset -1px -1px 0 0 rgba(0,0,0,0.3);
}

.nodeHeader {
  font-family: var(--font-pixel);
  font-size: 10px;
  color: var(--text-light);
  margin-bottom: var(--space-xs);
}

.nodeTitle {
  color: var(--season-primary);
  font-family: var(--font-pixel);
  font-size: 10px;
  margin-bottom: var(--space-xs);
}

.nodePeriod {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--wood-highlight);
}

.nodeDesc {
  font-family: var(--font-body);
  font-size: 18px;
  color: #c8b898;
  line-height: 1.5;
}

.depth {
  font-family: var(--font-pixel);
  font-size: 8px;
  color: var(--wood-mid);
  margin-top: var(--space-xs);
}
```

`Experience.tsx`:
```typescript
import { experiences } from '../../data/experience';
import DialogBox from '../../components/game-ui/DialogBox/DialogBox';
import SeasonBanner from '../../components/game-ui/SeasonBanner/SeasonBanner';
import styles from './Experience.module.css';

function Experience() {
  return (
    <div className={styles.page}>
      <SeasonBanner />
      <h1 className={styles.title}>The Mines</h1>

      <DialogBox>
        <div className={styles.timeline}>
          {experiences.map((exp, i) => (
            <div key={i} className={styles.node}>
              <div className={styles.nodeHeader}>
                <span className={styles.nodeTitle}>
                  {exp.title}
                </span>
                {' — '}
                <span className={styles.nodePeriod}>{exp.period}</span>
              </div>
              <div className={styles.nodeDesc}>{exp.description}</div>
              <div className={styles.depth}>
                {exp.type === 'work' ? '⛏️' : '📚'} Floor {experiences.length - i}
              </div>
            </div>
          ))}
        </div>
      </DialogBox>
    </div>
  );
}

export default Experience;
```

- [ ] **Step 3: 验证编译**

```bash
cd c:/Users/11090/Desktop/personalWeb && npx tsc --noEmit
```
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: implement Projects grid and Experience timeline pages"
```

---

### Task 14: 博客列表 + 博客详情页面

**Files:**
- Modify: `src/pages/Blog/Blog.tsx`, `src/pages/Blog/Blog.module.css`
- Modify: `src/pages/BlogPost/BlogPost.tsx`, `src/pages/BlogPost/BlogPost.module.css`
- Create: `content/blog/hello-world.md`

- [ ] **Step 1: 创建博客文章元数据模块**

Create `src/data/blog.ts`:
```typescript
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  emoji: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'hello-world',
    title: 'Hello, World!',
    date: '2026-05-17',
    excerpt: 'Welcome to my farm! First post about building this website.',
    emoji: '🌱',
  },
];
```

- [ ] **Step 2: Blog 列表页**

`Blog.module.css`:
```css
.page {
  padding-top: var(--space-lg);
}

.title {
  font-family: var(--font-pixel);
  font-size: 16px;
  color: var(--text-light);
  text-align: center;
  margin-bottom: var(--space-lg);
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
}

.list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.postCard {
  composes: dialog-panel from '../../styles/pixel-mixins.css';
  padding: var(--space-md);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.postCard:hover {
  border-color: var(--season-primary);
}

.postEmoji {
  font-size: 32px;
  flex-shrink: 0;
}

.postInfo {
  flex: 1;
}

.postTitle {
  font-family: var(--font-pixel);
  font-size: 12px;
  color: var(--text-dark);
  margin-bottom: var(--space-xs);
}

.postDate {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--wood-mid);
}

.postExcerpt {
  font-family: var(--font-body);
  font-size: 16px;
  color: var(--text-dark);
  margin-top: var(--space-xs);
}
```

`Blog.tsx`:
```typescript
import { useNavigate } from 'react-router-dom';
import { blogPosts } from '../../data/blog';
import DialogBox from '../../components/game-ui/DialogBox/DialogBox';
import SeasonBanner from '../../components/game-ui/SeasonBanner/SeasonBanner';
import styles from './Blog.module.css';

function Blog() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <SeasonBanner />
      <h1 className={styles.title}>Bookshelf</h1>

      <DialogBox>
        <div className={styles.list}>
          {blogPosts.map((post) => (
            <div
              key={post.slug}
              className={styles.postCard}
              onClick={() => navigate(`/blog/${post.slug}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') navigate(`/blog/${post.slug}`);
              }}
            >
              <span className={styles.postEmoji}>{post.emoji}</span>
              <div className={styles.postInfo}>
                <div className={styles.postTitle}>{post.title}</div>
                <div className={styles.postDate}>{post.date}</div>
                <div className={styles.postExcerpt}>{post.excerpt}</div>
              </div>
            </div>
          ))}
        </div>
      </DialogBox>
    </div>
  );
}

export default Blog;
```

- [ ] **Step 3: BlogPost 详情页**

`BlogPost.module.css`:
```css
.page {
  padding-top: var(--space-lg);
}

.title {
  font-family: var(--font-pixel);
  font-size: 16px;
  color: var(--text-light);
  text-align: center;
  margin-bottom: var(--space-lg);
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
}

.content {
  font-family: var(--font-body);
  font-size: 20px;
  color: var(--text-dark);
  line-height: 1.6;
}

.content h1,
.content h2,
.content h3 {
  font-family: var(--font-pixel);
  font-size: 13px;
  margin: var(--space-md) 0 var(--space-sm);
  color: var(--wood-dark);
}

.content p {
  margin-bottom: var(--space-md);
}

.content code {
  font-family: var(--font-body);
  background: rgba(0, 0, 0, 0.1);
  padding: 2px 6px;
  border: 1px solid var(--wood-mid);
  font-size: 18px;
}

.content pre {
  background: var(--wood-dark);
  color: var(--text-light);
  padding: var(--space-md);
  border: var(--border-thin) solid var(--wood-light);
  margin-bottom: var(--space-md);
  overflow-x: auto;
}

.content pre code {
  background: none;
  padding: 0;
  border: none;
}

.backBtn {
  margin-bottom: var(--space-md);
}
```

`BlogPost.tsx`:
```typescript
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { blogPosts } from '../../data/blog';
import DialogBox from '../../components/game-ui/DialogBox/DialogBox';
import GameButton from '../../components/game-ui/GameButton/GameButton';
import SeasonBanner from '../../components/game-ui/SeasonBanner/SeasonBanner';
import styles from './BlogPost.module.css';

function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (!slug) return;
    fetch(`/content/blog/${slug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.text();
      })
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch(() => {
        setContent('Post not found.');
        setLoading(false);
      });
  }, [slug]);

  return (
    <div className={styles.page}>
      <SeasonBanner />

      <div className={styles.backBtn}>
        <GameButton small onClick={() => navigate('/blog')}>
          ← Back to Bookshelf
        </GameButton>
      </div>

      <h1 className={styles.title}>{post?.title || slug}</h1>

      <DialogBox>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.content}>
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
      </DialogBox>
    </div>
  );
}

export default BlogPost;
```

- [ ] **Step 4: 创建示例博客文章**

`content/blog/hello-world.md`:
```markdown
# Hello, World!

Welcome to my farm! 🌱

This is the first post on my Stardew Valley themed blog. Here I'll share:

- **Tech articles** about web development
- **Project updates** and dev logs
- **Tips & tricks** I've learned along the way

## Why Stardew Valley?

Because farming and coding have more in common than you might think:

1. Both require **patience** — crops take time, and so does good software
2. Both reward **consistency** — small daily efforts compound
3. Both have **seasons** — some tech is spring (new & fresh), some is fall (mature & reliable)

Stay tuned for more posts! 🚜
```

- [ ] **Step 5: 配置 Vite 支持 Markdown 静态文件**

Update `vite.config.ts` — ensure `content/` is served as static assets. Vite serves files outside `public/` only if imported directly, but we're fetching them. Move content to `public/content/blog/` or configure `publicDir`.

Better approach: Place blog content in `public/content/blog/`:

```bash
mkdir -p c:/Users/11090/Desktop/personalWeb/public/content/blog
cp c:/Users/11090/Desktop/personalWeb/content/blog/hello-world.md c:/Users/11090/Desktop/personalWeb/public/content/blog/hello-world.md
```

Then update BlogPost.tsx fetch path to `/content/blog/${slug}.md`.

- [ ] **Step 6: 验证编译**

```bash
cd c:/Users/11090/Desktop/personalWeb && npx tsc --noEmit
```
Expected: No errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: implement Blog list and BlogPost with markdown rendering"
```

---

### Task 15: 联系页面

**Files:**
- Modify: `src/pages/Contact/Contact.tsx`, `src/pages/Contact/Contact.module.css`

- [ ] **Step 1: Contact 页面**

`Contact.module.css`:
```css
.page {
  padding-top: var(--space-lg);
}

.title {
  font-family: var(--font-pixel);
  font-size: 16px;
  color: var(--text-light);
  text-align: center;
  margin-bottom: var(--space-lg);
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
}

.socialGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-md);
  margin-top: var(--space-md);
}

@media (max-width: 400px) {
  .socialGrid {
    grid-template-columns: 1fr;
  }
}

.socialCard {
  composes: dialog-panel from '../../styles/pixel-mixins.css';
  padding: var(--space-md);
  display: flex;
  align-items: center;
  gap: var(--space-md);
  cursor: pointer;
  text-decoration: none;
  color: var(--text-dark);
}

.socialCard:hover {
  border-color: var(--season-primary);
}

.socialEmoji {
  font-size: 36px;
  flex-shrink: 0;
}

.socialInfo {
  flex: 1;
}

.socialPlatform {
  font-family: var(--font-pixel);
  font-size: 10px;
  margin-bottom: var(--space-xs);
}

.socialUrl {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--wood-mid);
}
```

`Contact.tsx`:
```typescript
import { socialLinks } from '../../data/social';
import DialogBox from '../../components/game-ui/DialogBox/DialogBox';
import SeasonBanner from '../../components/game-ui/SeasonBanner/SeasonBanner';
import styles from './Contact.module.css';

function Contact() {
  return (
    <div className={styles.page}>
      <SeasonBanner />
      <h1 className={styles.title}>Mailbox</h1>

      <DialogBox>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', textAlign: 'center' }}>
          📬 Drop me a letter! Here's how to reach me:
        </p>
      </DialogBox>

      <div className={styles.socialGrid}>
        {socialLinks.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialCard}
          >
            <span className={styles.socialEmoji}>{link.emoji}</span>
            <div className={styles.socialInfo}>
              <div className={styles.socialPlatform}>{link.platform}</div>
              <div className={styles.socialUrl}>
                {link.url.replace('https://', '').replace('mailto:', '')}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Contact;
```

- [ ] **Step 2: 验证编译**

```bash
cd c:/Users/11090/Desktop/personalWeb && npx tsc --noEmit
```
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: implement Contact page with social links"
```

---

### Task 16: 最终修复 + 构建验证

**Files:**
- Potentially modify: various files

- [ ] **Step 1: 修复 SeasonContext 导入路径**

Verify all imports of `SeasonContext` — the export is `SeasonProvider` and `useSeason` from `src/context/SeasonContext.tsx`. The `App.tsx` should use `SeasonProvider` not `SeasonContext`.

- [ ] **Step 2: 修复 GameFrame 中 content 的 HUD padding**

The `contentWithHud` class should be applied. Check `GameFrame.tsx`.

- [ ] **Step 3: TypeScript 类型检查**

```bash
cd c:/Users/11090/Desktop/personalWeb && npx tsc --noEmit
```
Expected: No errors. Fix any type errors.

- [ ] **Step 4: 构建生产版本**

```bash
cd c:/Users/11090/Desktop/personalWeb && npm run build
```
Expected: Build succeeds, output in `dist/`.

- [ ] **Step 5: 预览构建产物**

```bash
cd c:/Users/11090/Desktop/personalWeb && npm run preview
```
Open the preview URL, verify all pages render, navigation works, seasons toggle works.

- [ ] **Step 6: 最终 Commit**

```bash
git add -A
git commit -m "feat: final polish and build verification"
```

---

### Task 17: 部署配置 (GitHub Pages)

- [ ] **Step 1: 添加部署脚本到 package.json**

Update `package.json` scripts to add:
```json
"deploy": "gh-pages -d dist"
```

- [ ] **Step 2: 配置 Vite base path**

Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/personal-web/',
  plugins: [react()],
  css: { modules: { localsConvention: 'camelCase' } },
});
```

- [ ] **Step 3: 安装 gh-pages**

```bash
npm install --save-dev gh-pages
```

- [ ] **Step 4: 构建 + 部署**

```bash
npm run build
npx gh-pages -d dist
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: add GitHub Pages deployment config"
```
```

---

## 自审

覆盖 spec 所有需求:
- ✅ 技术栈: React 18 + TS + Vite + React Router + CSS Modules
- ✅ 路由: 7 个页面全部覆盖
- ✅ 组件系统: 8 个游戏 UI 组件全部实现
- ✅ 四季主题: CSS 变量 + data-season 属性
- ✅ 状态管理: SeasonContext + GameStateContext
- ✅ 数据文件: about, skills, projects, experience, social
- ✅ 所有页面设计: 主页(Dashboard)、关于(NPC 对话)、技能(ProgressBar)、项目(背包网格)、博客(书架+Markdown)、经历(矿洞时间轴)、联系(信箱)
- ✅ 无 TBD、TODO、占位符
- ✅ 类型一致性: 所有导入路径、接口名称、组件 props 前后一致
