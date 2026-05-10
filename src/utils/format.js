export function formatDuration(pt) {
  const match = pt.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '0:00';
  
  const h = match[1] ? parseInt(match[1], 10) : 0;
  const m = match[2] ? parseInt(match[2], 10) : 0;
  const s = match[3] ? parseInt(match[3], 10) : 0;
  
  let formatted = '';
  if (h > 0) formatted += h + ':';
  formatted += (h > 0 && m < 10 ? '0' : '') + m + ':';
  formatted += (s < 10 ? '0' : '') + s;
  
  return formatted || '0:00';
}

export function formatViews(views) {
  const num = parseInt(views, 10);
  if (isNaN(num)) return views;
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

export function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  let interval = seconds / 31536000;
  if (interval >= 1) return Math.floor(interval) + ' years ago';
  
  interval = seconds / 2592000;
  if (interval >= 1) return Math.floor(interval) + ' months ago';
  
  interval = seconds / 86400;
  if (interval >= 1) return Math.floor(interval) + ' days ago';
  
  interval = seconds / 3600;
  if (interval >= 1) return Math.floor(interval) + ' hours ago';
  
  interval = seconds / 60;
  if (interval >= 1) return Math.floor(interval) + ' minutes ago';
  
  return Math.floor(seconds) + ' seconds ago';
}
