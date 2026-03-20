import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import PlayerBar from './components/layout/PlayerBar';
import AppRoutes from './routes/AppRoutes';
import { PlayerProvider } from './context/PlayerContext';

function AppLayout() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthPage) {
    return <AppRoutes />;
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateAreas: '"sidebar main" "player player"',
        gridTemplateColumns: 'auto 1fr',
        gridTemplateRows: '1fr auto',
        height: '100vh',
        gap: '8px',
        padding: '8px',
        backgroundColor: '#000000',
        overflow: 'hidden',
      }}
    >
      {/* Sidebar Area */}
      <div 
        style={{ 
          gridArea: 'sidebar', 
          width: '280px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '8px',
          overflow: 'hidden'
        }}
      >
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <main
        style={{
          gridArea: 'main',
          overflow: 'hidden',
          backgroundColor: '#121212',
          borderRadius: '8px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(180deg, #222222 0%, #121212 100%)',
        }}
      >
        <Navbar />
        <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
          <AppRoutes />
        </div>
      </main>

      {/* Player Bar Area */}
      <div style={{ gridArea: 'player' }}>
        <PlayerBar />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <PlayerProvider>
        <AppLayout />
      </PlayerProvider>
    </BrowserRouter>
  );
}
