import { 
  Home, Zap, MonitorPlay, History, PlaySquare, Clock, ThumbsUp, 
  ShoppingBag, Music, Film, Radio, Gamepad2, Newspaper, Trophy, 
  Lightbulb, Shirt, Podcast, Settings, Flag, HelpCircle, MessageSquare, 
  UserCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MAIN_LINKS = [
  { icon: Home, label: 'Home', to: '/' },
  { icon: Zap, label: 'Shorts', to: '#' },
  { icon: MonitorPlay, label: 'Subscriptions', to: '#' }
];

const YOU_LINKS = [
  { icon: History, label: 'History', to: '#' },
  { icon: PlaySquare, label: 'Your videos', to: '#' },
  { icon: Clock, label: 'Watch later', to: '#' },
  { icon: ThumbsUp, label: 'Liked videos', to: '#' }
];

const EXPLORE_LINKS = [
  { icon: ShoppingBag, label: 'Shopping', to: '#' },
  { icon: Music, label: 'Music', to: '#' },
  { icon: Film, label: 'Movies', to: '#' },
  { icon: Radio, label: 'Live', to: '#' },
  { icon: Gamepad2, label: 'Gaming', to: '#' },
  { icon: Newspaper, label: 'News', to: '#' },
  { icon: Trophy, label: 'Sports', to: '#' },
  { icon: Lightbulb, label: 'Courses', to: '#' },
  { icon: Shirt, label: 'Fashion & Beauty', to: '#' },
  { icon: Podcast, label: 'Podcasts', to: '#' }
];

const MORE_YOUTUBE = [
  { icon: MonitorPlay, label: 'YouTube Premium', to: '#' },
  { icon: Music, label: 'YouTube Music', to: '#' },
  { icon: Gamepad2, label: 'YouTube Kids', to: '#' }
];

const SETTINGS_LINKS = [
  { icon: Settings, label: 'Settings', to: '#' },
  { icon: Flag, label: 'Report history', to: '#' },
  { icon: HelpCircle, label: 'Help', to: '#' },
  { icon: MessageSquare, label: 'Send feedback', to: '#' }
];

function SidebarItem({ icon: Icon, label, to, collapsed }) {
  return (
    <Link 
      to={to}
      className={`flex items-center rounded-lg transition-colors hover:bg-yt-hover ${
        collapsed 
          ? 'flex-col justify-center h-[74px] gap-1 px-1 py-4 text-[10px]' 
          : 'flex-row px-3 py-2 gap-4 text-sm'
      }`}
    >
      <Icon className={`flex-shrink-0 ${collapsed ? 'w-6 h-6 mb-1' : 'w-5 h-5'}`} />
      <span className={`${collapsed ? 'text-center truncate w-full' : 'truncate'}`}>
        {label}
      </span>
    </Link>
  );
}

function SectionDivider({ collapsed }) {
  if (collapsed) return null;
  return <div className="border-t border-yt-border my-3 mx-3" />;
}

export default function Sidebar({ collapsed }) {
  return (
    <aside 
      className={`fixed top-14 left-0 bottom-0 bg-yt-header overflow-y-auto hidden sm:flex flex-col z-40 transition-all duration-200
        ${collapsed ? 'w-[72px] px-1 py-1' : 'w-60 px-2 py-3'}
      `}
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#717171 transparent'
      }}
    >
      <div className="flex flex-col mb-2">
        {MAIN_LINKS.map(link => (
          <SidebarItem key={link.label} {...link} collapsed={collapsed} />
        ))}
      </div>
      
      <SectionDivider collapsed={collapsed} />
      
      {!collapsed && (
        <>
          <div className="px-3 py-2 font-bold text-[16px] text-yt-text flex items-center gap-2">
            You <span className="text-xl">›</span>
          </div>
          <div className="flex flex-col mb-2">
            {YOU_LINKS.map(link => (
              <SidebarItem key={link.label} {...link} collapsed={collapsed} />
            ))}
          </div>

          <SectionDivider collapsed={collapsed} />

          <div className="px-3 py-2 font-bold text-[16px] text-yt-text">
            Explore
          </div>
          <div className="flex flex-col mb-2">
            {EXPLORE_LINKS.map(link => (
              <SidebarItem key={link.label} {...link} collapsed={collapsed} />
            ))}
          </div>

          <SectionDivider collapsed={collapsed} />

          <div className="px-3 py-2 font-bold text-[16px] text-yt-text">
            More from YouTube
          </div>
          <div className="flex flex-col mb-2">
            {MORE_YOUTUBE.map(link => (
              <SidebarItem key={link.label} {...link} collapsed={collapsed} />
            ))}
          </div>

          <SectionDivider collapsed={collapsed} />
          
          <div className="flex flex-col mb-2">
            {SETTINGS_LINKS.map(link => (
              <SidebarItem key={link.label} {...link} collapsed={collapsed} />
            ))}
          </div>
          
          <SectionDivider collapsed={collapsed} />

          <div className="px-3 py-4 text-xs font-semibold text-[#AAAAAA] leading-5">
            <div className="flex flex-wrap gap-x-2 gap-y-0.5 mb-2">
              <a href="#" className="hover:text-yt-text transition-colors">About</a>
              <a href="#" className="hover:text-yt-text transition-colors">Press</a>
              <a href="#" className="hover:text-yt-text transition-colors">Copyright</a>
              <a href="#" className="hover:text-yt-text transition-colors">Contact us</a>
              <a href="#" className="hover:text-yt-text transition-colors">Creators</a>
              <a href="#" className="hover:text-yt-text transition-colors">Advertise</a>
              <a href="#" className="hover:text-yt-text transition-colors">Developers</a>
            </div>
            <div className="flex flex-wrap gap-x-2 gap-y-0.5 mb-4">
              <a href="#" className="hover:text-yt-text transition-colors">Terms</a>
              <a href="#" className="hover:text-yt-text transition-colors">Privacy</a>
              <a href="#" className="hover:text-yt-text transition-colors">Policy & Safety</a>
              <a href="#" className="hover:text-yt-text transition-colors">How YouTube works</a>
              <a href="#" className="hover:text-yt-text transition-colors">Test new features</a>
            </div>
            <div className="text-[11px] font-normal text-[#717171]">
              © 2026 Google LLC
            </div>
          </div>
        </>
      )}

      {collapsed && (
        <div className="flex flex-col mt-2">
          <SidebarItem icon={History} label="History" to="#" collapsed={collapsed} />
        </div>
      )}
    </aside>
  );
}
