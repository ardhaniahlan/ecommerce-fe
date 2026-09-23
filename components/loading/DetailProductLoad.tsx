export function DetailProductLoad() {
  return (
    <div className="w-full bg-white min-h-screen py-8 animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="h-5 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-64"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-4">
          <div className="w-full aspect-4/3 bg-gray-200 rounded-2xl"></div>
          
          <div className="flex gap-2">
            <div className="w-16 h-12 bg-gray-200 rounded-lg"></div>
            <div className="w-16 h-12 bg-gray-200 rounded-lg"></div>
            <div className="w-16 h-12 bg-gray-200 rounded-lg"></div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 rounded w-28"></div>
            <div className="h-6 bg-gray-200 rounded-full w-32"></div>
          </div>

          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded w-full"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </div>

          <div className="space-y-1.5 mt-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 mt-4 space-y-3">
            <div className="h-8 bg-gray-200 rounded w-1/2"></div> 
            <div className="h-4 bg-gray-200 rounded w-2/3"></div> 
          </div>

          <div className="flex gap-4 items-center mt-4">
            <div className="h-11 bg-gray-200 rounded-lg w-20"></div> 
            <div className="h-11 bg-gray-200 rounded-xl grow"></div> 
          </div>

          <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-gray-100">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>

      </div>
    </div>
  );
}
