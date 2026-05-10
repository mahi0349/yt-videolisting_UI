import { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';
import SkeletonCard from '../components/SkeletonCard';

const API_URL = 'https://api.freeapi.app/api/v1/public/youtube/videos';

const CATEGORIES = [
  'All', 'Music', 'Gaming', 'Live', 'Coding', 'Mixes', 
  'Python', 'Flutter', 'Podcasts', 'News', 'JavaScript', 
  'Web Development', 'Next.js', 'Recently uploaded'
];

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const fetchVideos = async (pageNum, isNew = false) => {
    if (loading) return;
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`${API_URL}?page=${pageNum}&limit=12`);
      const json = await res.json();
      
      if (json.success) {
        if (isNew) {
          setVideos(json.data.data);
        } else {
          setVideos(prev => [...prev, ...json.data.data]);
        }
        setTotalPages(json.data.totalPages);
        setPage(json.data.page);
      } else {
        setError('Failed to fetch videos');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(1, true);
  }, []);

  return (
    <div className="flex flex-col h-full w-full">
      {/* Categories Bar */}
      <div className="flex gap-3 overflow-x-auto pb-4 pt-2 sticky top-0 bg-yt-bg z-10 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
              activeCategory === cat 
                ? 'bg-yt-text text-yt-bg font-medium' 
                : 'bg-yt-hover text-yt-text hover:bg-yt-border'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {error && (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-yt-textSec mb-4">{error}</p>
          <button onClick={() => fetchVideos(1, true)} className="px-4 py-2 bg-blue-600 rounded-full hover:bg-blue-700">
            Retry
          </button>
        </div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-10 pb-8 mt-2">
        {videos.map((video, idx) => (
          <VideoCard key={video.items.id + idx} video={video} />
        ))}
        {loading && Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>

      {/* Load More */}
      {!loading && page < totalPages && !error && (
        <div className="flex justify-center pb-8">
          <button 
            onClick={() => fetchVideos(page + 1)}
            className="px-6 py-2 border border-yt-border rounded-full hover:bg-yt-hover transition-colors font-medium text-sm"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
