import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar /> 
        
        <main className="grow container mx-auto px-4 py-8">
          {children}
        </main>

        <Footer />
    </div >
  );
}