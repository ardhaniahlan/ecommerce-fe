export default function ProfileLoad() {
  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 animate-pulse">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-100 p-6 bg-gray-50 flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-gray-200" />
          <div className="h-5 w-56 bg-gray-200 rounded-md" />
        </div>

        <div className="p-6 space-y-8">
          <div>
            <div className="h-4 w-40 bg-gray-200 rounded mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="h-3.5 w-24 bg-gray-200 rounded" />
                  <div className="h-10 w-full bg-gray-100 rounded-xl" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="h-4 w-36 bg-gray-200 rounded mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="h-3.5 w-28 bg-gray-200 rounded" />
                  <div className="h-10 w-full bg-gray-100 rounded-xl" />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-1.5 mt-4">
              <div className="h-3.5 w-52 bg-gray-200 rounded" />
              <div className="h-20 w-full bg-gray-100 rounded-xl" />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <div className="h-11 w-40 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}