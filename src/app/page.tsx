import { Hero } from '@/app/home/hero';
import {
  CTA,
  Customers,
  FAQ,
  Maintenance,
  SelfHosted,
  What,
} from '@/app/home/sections';
import { Footer } from '@/components/ui/footer';
import { Navbar } from '@/components/ui/navbar';
import { ScrollBlobEffect } from '@/app/home/scroll-blob-effect';

export default function HomePage() {
  return (
    <div className="site-shell">
      <ScrollBlobEffect />
      <Navbar />
      <main>
        <Hero />
        <Customers />
        <What />
        <Maintenance />
        <SelfHosted />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
