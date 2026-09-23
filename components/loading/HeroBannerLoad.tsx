
export function HeroBannerLoad() {
  return (
    <div className="relative w-full rounded-2xl bg-gray-200 overflow-hidden shadow-sm animate-pulse h-75 md:h-87.5">
      <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 lg:p-16 h-full w-full">
        
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="h-5 bg-gray-300 rounded w-24"></div> 
          <div className="h-10 bg-gray-300 rounded w-3/4"></div> 
          <div className="h-4 bg-gray-300 rounded w-full"></div> 
          <div className="h-4 bg-gray-300 rounded w-2/3"></div> 
          <div className="h-10 bg-gray-300 rounded w-32 mt-2"></div> 
        </div>

        <div className="hidden md:block w-full max-w-md aspect-video bg-gray-300 rounded-xl"></div>
      </div>
    </div>
  );
}