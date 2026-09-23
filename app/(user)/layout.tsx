import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { cookies } from 'next/headers';

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const userSession = cookieStore.get("user_session")?.value;
  
  let initialUser = null;
  if (userSession) {
    try {
      initialUser = JSON.parse(userSession);
    } catch (e) {}
  }

  return (
    <div className="min-h-screen flex flex-col">
        <Navbar initialUser={initialUser}/> 
        
        <main className="grow container mx-auto px-4 py-8">
          {children}
        </main>

        <Footer />
    </div >
  );
}