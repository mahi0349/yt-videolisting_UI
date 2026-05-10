import { Link } from 'react-router-dom';
import { formatDuration, formatViews, formatTimeAgo } from '../utils/format';

export default function VideoCard({ video }) {
  const { id, snippet, contentDetails, statistics } = video.items;
  const thumbnail = snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url;
  const initial = snippet.channelTitle ? snippet.channelTitle.charAt(0).toUpperCase() : 'U';

  return (
    <Link to={`/video/${id}`} className="flex flex-col gap-3 cursor-pointer group">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#1a1a1a]">
        <img 
          src={thumbnail} 
          alt={snippet.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
        <div className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">
          {formatDuration(contentDetails?.duration || 'PT0S')}
        </div>
      </div>
      <div className="flex gap-3 pr-6">
        <div className="w-9 h-9 rounded-full bg-yt-border flex-shrink-0 flex items-center justify-center font-medium overflow-hidden">
          {initial}
        </div>
        <div className="flex flex-col overflow-hidden">
          <h3 className="text-sm font-medium text-yt-text line-clamp-2 leading-tight mb-1" title={snippet.title}>
            {snippet.title}
          </h3>
          <div className="text-xs text-yt-textSec hover:text-yt-text transition-colors">
            {snippet.channelTitle}
          </div>
          <div className="text-xs text-yt-textSec flex items-center gap-1">
            <span>{formatViews(statistics?.viewCount || 0)} views</span>
            <span className="text-[10px]">•</span>
            <span>{formatTimeAgo(snippet.publishedAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
