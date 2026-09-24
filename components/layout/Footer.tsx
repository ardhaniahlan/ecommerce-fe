export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          
          <div className="flex items-center gap-1 text-center md:text-left">
            <span className="font-semibold text-gray-700">Tech-Commerce</span>
            <span>© {currentYear} Tech-Commerce Inc. Perangkat Keras Presisi Didesain Untuk Kreator.</span>
          </div>

        </div>
      </div>
    </footer>
  );
}