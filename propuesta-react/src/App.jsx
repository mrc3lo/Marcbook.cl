import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import FloatingWhatsApp from './components/ui/FloatingWhatsApp.jsx';
import HeroSection from './sections/HeroSection.jsx';
import CompatibilitySection from './sections/CompatibilitySection.jsx';
import ServicesSection from './sections/ServicesSection.jsx';
import WorkSection from './sections/WorkSection.jsx';
import ProcessSection from './sections/ProcessSection.jsx';
import AboutSection from './sections/AboutSection.jsx';
import FaqSection from './sections/FaqSection.jsx';
import ContactSection from './sections/ContactSection.jsx';
import { useTheme } from './hooks/useTheme.js';
import { useMotion } from './hooks/useMotion.js';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { motion, toggleMotion } = useMotion();
  return <>
    <a href="#contenido" className="skip-link">Saltar al contenido</a>
    <Header theme={theme} onToggleTheme={toggleTheme} />
    <main id="contenido">
      <HeroSection theme={theme} motion={motion} onToggleMotion={toggleMotion} />
      <CompatibilitySection />
      <ServicesSection />
      <WorkSection />
      <ProcessSection />
      <AboutSection />
      <FaqSection />
      <ContactSection />
    </main>
    <Footer />
    <FloatingWhatsApp />
  </>;
}
