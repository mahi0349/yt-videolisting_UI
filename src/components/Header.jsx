import { Menu, Search, Mic, Video as VideoIcon, Bell, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header({ toggleSidebar }) {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-yt-header flex items-center justify-between px-4 z-50 border-b border-white/5">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-yt-hover rounded-full transition-colors hidden sm:block"
        >
          <Menu className="w-6 h-6 text-yt-icon" />
        </button>
        <Link to="/" className="flex items-center gap-1">
          <div className="relative flex items-center">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#FF0000] fill-current">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
              <path fill="white" d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z" />
            </svg>
            <span className="text-[20px] font-semibold tracking-tighter text-white ml-1 font-sans">
              YouTube
            </span>
            <span className="absolute -top-0.5 -right-3.5 text-[10px] text-yt-textSec font-normal">IN</span>
          </div>
        </Link>
      </div>

      <div className="flex-1 max-w-[720px] flex items-center mx-4 gap-4 hidden sm:flex">
        <div className="flex flex-1 items-center border border-yt-border rounded-full bg-[#121212] focus-within:border-blue-500 overflow-hidden h-10">
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full bg-transparent outline-none px-4 text-yt-text placeholder-yt-textSec"
          />
          <button className="px-5 bg-[#222222] border-l border-yt-border h-full hover:bg-yt-border transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>
        <button className="p-2.5 bg-yt-hover rounded-full hover:bg-yt-border transition-colors flex-shrink-0">
          <Mic className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-yt-hover rounded-full transition-colors hidden sm:block">
          <VideoIcon className="w-6 h-6" />
        </button>
        <button className="p-2 hover:bg-yt-hover rounded-full transition-colors hidden sm:block">
          <Bell className="w-6 h-6" />
        </button>
        <button className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center font-medium text-sm ml-2">
          A
        </button>
      </div>
    </header>
  );
}
