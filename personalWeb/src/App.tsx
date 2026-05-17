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
      </GameStateProvider>
    </SeasonProvider>
  );
}

export default App;
