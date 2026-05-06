import { useState } from 'react';
import TrippyBackground from './components/TrippyBackground';
import TrippyText from './components/TrippyText';
import SocialLinks from './components/SocialLinks';
import FloatingGifs from './components/FloatingGifs';
import './index.css';

function App() {
  const [showGifs, setShowGifs] = useState(true);

  return (
    <div className="app-container">
      <div className="gif-toggle-container">
        <label className="switch">
          <input 
            type="checkbox" 
            checked={showGifs} 
            onChange={() => setShowGifs(!showGifs)} 
          />
          <span className="slider"></span>
        </label>
      </div>

      <TrippyBackground />
      {showGifs && <FloatingGifs />}
      
      <main className="app-main-content">
        <TrippyText text="Patje420" />
        <SocialLinks />
      </main>

      {/* Subtle overlay for better readability if needed */}
      <div className="app-readability-overlay" />
    </div>
  );
}

export default App;
