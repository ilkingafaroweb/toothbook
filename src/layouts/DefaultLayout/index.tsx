import { ReactNode } from 'react';
import { Footer, Navbar, OfferBanner, ScrolledHeader } from '../../components';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export const DefaultLayout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const activeRoutes = ['/', '/findyourdentist', '/about-us', 'faq', '/contact']; 

  const shouldShowScrolledHeader = activeRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <OfferBanner />

      {shouldShowScrolledHeader ? (
        <ScrolledHeader
          replacementComponent={<Navbar />}
        />
      ) : <Navbar/>}

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-6">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
