export default function SkeletonCard() {
  return (
    <div className="flex flex-col gap-3">
      <div className="w-full aspect-video rounded-xl bg-yt-border animate-pulse" />
      <div className="flex gap-3 pr-6">
        <div className="w-9 h-9 rounded-full bg-yt-border animate-pulse flex-shrink-0" />
        <div className="flex flex-col gap-2 w-full mt-1">
          <div className="h-4 bg-yt-border rounded w-11/12 animate-pulse" />
          <div className="h-4 bg-yt-border rounded w-3/4 animate-pulse" />
          <div className="h-3 bg-yt-border rounded w-1/2 animate-pulse mt-1" />
        </div>
      </div>
    </div>
  );
}
