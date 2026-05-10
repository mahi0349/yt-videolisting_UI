import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Share, Download, MoreHorizontal } from 'lucide-react';
import { formatViews, formatTimeAgo } from '../utils/format';

const API_URL = 'https://api.freeapi.app/api/v1/public/youtube/videos';

export default function Video() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Fetch individual video logic (using general list API to simulate finding the video)
    const fetchVideoData = async () => {
      setLoading(true);
      try {
        // Fetching page 1 as related videos, and assuming one matches the ID
        const res = await fetch(`${API_URL}?page=1&limit=20`);
        const json = await res.json();
        if (json.success) {
          const videos = json.data.data;
          const found = videos.find(v => v.items.id === id) || videos[0];
          setVideo(found);
          setRelated(videos.filter(v => v.items.id !== id).slice(0, 10));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [id]);

  if (loading) {
    return <div className="p-4 flex items-center justify-center h-full">Loading...</div>;
  }

  if (!video) return <div className="p-4">Video not found.</div>;

  const { snippet, statistics } = video.items;
  const initial = snippet.channelTitle ? snippet.channelTitle.charAt(0).toUpperCase() : 'U';

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-2 lg:p-6 max-w-[1800px] mx-auto">
      {/* Main Video Section */}
      <div className="flex-1 w-full max-w-[1280px]">
        {/* Video Player Placeholder */}
        <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg relative flex items-center justify-center">
          <iframe 
            className="w-full h-full absolute inset-0"
            src={`https://www.youtube.com/embed/${id}?autoplay=1`} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen>
          </iframe>
        </div>

        {/* Video Details */}
        <div className="mt-4">
          <h1 className="text-xl font-bold text-yt-text">{snippet.title}</h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 gap-4">
            
            {/* Channel Info */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-yt-border flex-shrink-0 flex items-center justify-center font-medium text-lg">
                {initial}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-yt-text text-[15px]">{snippet.channelTitle}</span>
                <span className="text-xs text-yt-textSec">1.2M subscribers</span>
              </div>
              <button className="ml-2 bg-white text-black px-4 py-2 rounded-full font-medium text-sm hover:bg-gray-200 transition-colors">
                Subscribe
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
              <div className="flex bg-yt-hover rounded-full">
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-[#3f3f3f] rounded-l-full border-r border-yt-border transition-colors">
                  <ThumbsUp className="w-5 h-5" />
                  <span className="text-sm font-medium">{formatViews(statistics?.likeCount || 0)}</span>
                </button>
                <button className="px-4 py-2 hover:bg-[#3f3f3f] rounded-r-full transition-colors">
                  <ThumbsDown className="w-5 h-5" />
                </button>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-yt-hover rounded-full hover:bg-[#3f3f3f] transition-colors whitespace-nowrap">
                <Share className="w-5 h-5" />
                <span className="text-sm font-medium">Share</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-yt-hover rounded-full hover:bg-[#3f3f3f] transition-colors whitespace-nowrap hidden md:flex">
                <Download className="w-5 h-5" />
                <span className="text-sm font-medium">Download</span>
              </button>
              <button className="p-2 bg-yt-hover rounded-full hover:bg-[#3f3f3f] transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Description Box */}
          <div className="mt-4 bg-yt-hover rounded-xl p-3 text-sm hover:bg-[#3f3f3f] transition-colors cursor-pointer">
            <div className="font-medium text-yt-text mb-1 flex gap-2">
              <span>{formatViews(statistics?.viewCount || 0)} views</span>
              <span>{formatTimeAgo(snippet.publishedAt)}</span>
            </div>
            <p className="text-yt-text whitespace-pre-wrap line-clamp-3">
              {snippet.description}
            </p>
          </div>
        </div>
      </div>

      {/* Related Videos Sidebar */}
      <div className="w-full lg:w-[400px] flex flex-col gap-3">
        <h3 className="text-yt-text font-bold text-lg mb-1 hidden lg:block">Up next</h3>
        {related.map((v, i) => {
          const relSnippet = v.items.snippet;
          const thumb = relSnippet.thumbnails?.medium?.url || relSnippet.thumbnails?.default?.url;
          return (
            <Link to={`/video/${v.items.id}`} key={i} className="flex gap-2 group cursor-pointer">
              <div className="w-[168px] aspect-video rounded-lg overflow-hidden bg-yt-border flex-shrink-0 relative">
                <img src={thumb} alt={relSnippet.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs font-medium px-1 rounded">
                  {formatViews(v.items.contentDetails?.duration || '10:00')}
                </div>
              </div>
              <div className="flex flex-col overflow-hidden py-1">
                <h4 className="text-sm font-medium text-yt-text line-clamp-2 leading-tight mb-1" title={relSnippet.title}>
                  {relSnippet.title}
                </h4>
                <span className="text-xs text-yt-textSec">{relSnippet.channelTitle}</span>
                <span className="text-xs text-yt-textSec">{formatViews(v.items.statistics?.viewCount || 0)} views • {formatTimeAgo(relSnippet.publishedAt)}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
