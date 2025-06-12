import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/chat/ChatWidget';
import {
  HeroSection,
  AboutSection,
  ServicesSection,
  PortfolioSection,
  ContactSection,
} from '@/features';

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen" tabIndex={-1}>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <Footer theme="light" />
      <ChatWidget />
    </>
  );
}
