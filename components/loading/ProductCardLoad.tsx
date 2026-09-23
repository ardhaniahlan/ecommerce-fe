export function ProductCardLoad() {
  return (
    <div className="flex flex-col p-4 border border-gray-100 rounded-2xl bg-white shadow-sm animate-pulse">
      <div className="w-full aspect-square bg-gray-200 rounded-xl mb-4"></div>

      <div className="h-5 bg-gray-200 rounded w-5/6 mb-2"></div>
      <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>

      <div className="mt-auto flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-7 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-200" />
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
}