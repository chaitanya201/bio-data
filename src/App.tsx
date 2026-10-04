import { useState } from "react";
import "./index.css";
import { useLenis } from "./hooks/useLenis";
import { LanguageProvider } from "./context/LanguageContext";
import LanguageToggle from "./components/ui/LanguageToggle";

// Layout
import Navigation from "./components/layout/Navigation";
import ScrollProgress from "./components/layout/ScrollProgress";
import WelcomeSplash from "./components/layout/WelcomeSplash";
import Footer from "./components/layout/Footer";

// UI
import ParticleBackground from "./components/ui/ParticleBackground";
import MouseGlow from "./components/ui/MouseGlow";

// Sections
import PersonalInfo from "./components/sections/PersonalInfo";
import EducationJourney from "./components/sections/EducationJourney";
import CareerJourney from "./components/sections/CareerJourney";
import Personality from "./components/sections/Personality";
import Achievements from "./components/sections/Achievements";
import LifeTimeline from "./components/sections/LifeTimeline";
import MaharashtraMap from "./components/sections/MaharashtraMap";
import DayInLife from "./components/sections/DayInLife";
import FamilyTree from "./components/sections/FamilyTree";
import RelativeInfo from "./components/sections/RelativeInfo";
import GroomGallery from "./components/sections/GroomGallery";
import HoroscopeCard from "./components/sections/HoroscopeCard";
import LifePartner from "./components/sections/LifePartner";
import Contact from "./components/sections/Contact";
import QRCodeSection from "./components/sections/QRCodeSection";
import PDFDownload from "./components/sections/PDFDownload";

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}

function AppInner() {
  const [splashDone, setSplashDone] = useState(false);
  useLenis();

  return (
    <div className="min-h-screen bg-[#0B1120] text-white relative overflow-x-clip w-full">
      {/* Splash */}
      <WelcomeSplash onDone={() => setSplashDone(true)} />

      {splashDone && (
        <>
          {/* Global overlays */}
          <ParticleBackground />
          <MouseGlow />
          <ScrollProgress />
          <Navigation />
          <LanguageToggle />

          {/* Main content */}
          <main>
            {/* <Hero /> */}
            {/* <GroomGallery /> */}
            {/* <ThreeDIntro /> */}
            <PersonalInfo />
            {/* <FamilyBackground /> */}
            <FamilyTree />
            <RelativeInfo />
            <EducationJourney />
            <CareerJourney />
            {/* <Skills /> */}
            <Personality />
            <Achievements />
            <LifeTimeline />
            <MaharashtraMap />
            <DayInLife />
            <HoroscopeCard />
            <LifePartner />
            <Contact />
            <QRCodeSection />
            <PDFDownload />
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}
