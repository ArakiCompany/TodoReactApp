function SkeletonItem({ width }: { width: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl">
      <div className="w-5 h-5 rounded-full bg-zinc-800 flex-shrink-0 animate-pulse" />
      <div className="flex-1">
        <div
          className="h-3 bg-zinc-800 rounded-full animate-pulse"
          style={{ width }}
        />
      </div>
      <div className="w-6 h-3 bg-zinc-800 rounded-full animate-pulse" />
    </div>
  );
}

export default function TodoSkeleton() {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col gap-2">
          <div className="h-5 w-36 bg-zinc-900 rounded-lg animate-pulse" />
          <div className="h-3 w-24 bg-zinc-900 rounded-full animate-pulse" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-zinc-900 rounded-full animate-pulse" />
          <div className="h-6 w-16 bg-zinc-900 rounded-full animate-pulse" />
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <div className="flex-1 h-10 bg-zinc-900 rounded-xl animate-pulse" />
        <div className="w-10 h-10 bg-zinc-900 rounded-xl animate-pulse" />
      </div>

      <div className="flex gap-1.5 mb-4">
        <div className="h-6 w-14 bg-zinc-900 rounded-md animate-pulse" />
        <div className="h-6 w-20 bg-zinc-900 rounded-md animate-pulse" />
        <div className="h-6 w-20 bg-zinc-900 rounded-md animate-pulse" />
      </div>

      <div className="flex flex-col gap-2">
        <SkeletonItem width="65%" />
        <SkeletonItem width="80%" />
        <SkeletonItem width="50%" />
      </div>

      <div className="flex items-center justify-center gap-1.5 mt-6">
        {[0, 150, 300].map((delay, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
