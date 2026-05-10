import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Video from './pages/Video';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden pt-14">
        <Sidebar collapsed={isSidebarCollapsed} />
        <main className={`flex-1 overflow-y-auto bg-yt-bg p-4 transition-all duration-200 ${isSidebarCollapsed ? 'ml-0 sm:ml-[72px]' : 'ml-0 sm:ml-60'}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/video/:id" element={<Video />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
