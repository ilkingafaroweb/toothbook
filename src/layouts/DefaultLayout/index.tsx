import { ReactNode } from 'react';
import { Footer, Navbar, OfferBanner, ScrolledHeader } from '../../components';

interface LayoutProps {
  children: ReactNode;
}

export const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <OfferBanner/>
      <ScrolledHeader 
        replacementComponent={<Navbar/>} 
      />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-6">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
