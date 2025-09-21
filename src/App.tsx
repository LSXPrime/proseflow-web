import { useLocation } from 'react-router-dom';
import { LazyMotion, domAnimation } from 'framer-motion';
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";
import HeroSection from "./components/HeroSection/HeroSection.tsx";
import TrustSection from "./components/TrustSection/TrustSection.tsx";
import CoreWorkflow from "./components/CoreWorkflow/CoreWorkflow.tsx";
import HybridCore from "./components/HybridCore/HybridCore.tsx";
import FeatureUniverse from "./components/FeatureUniverse/FeatureUniverse.tsx";
import UseCases from "./components/UseCases/UseCases.tsx";
import CommunitySection from "./components/CommunitySection/CommunitySection.tsx";
import DownloadSection from "./components/DownloadSection/DownloadSection.tsx";


function App() {
  useLocation();
  return (
      <LazyMotion features={domAnimation}>
        <div className="min-h-screen bg-black text-gray-100 overflow-x-hidden">
          {/* Aurora gradient background */}
          <div className="fixed inset-0 z-[-1]">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[150vw] h-[150vh] bg-[radial-gradient(ellipse_at_center,rgba(92,107,192,0.15)_0%,rgba(55,48,163,0.1)_20%,rgba(0,0,0,0)_60%)] animate-pulse-slow"></div>
            <div className="absolute top-0 left-1/4 w-[100vw] h-[100vh] bg-[radial-gradient(ellipse_at_center,rgba(101,96,204,0.1)_0%,rgba(0,0,0,0)_50%)] animate-pulse-slow delay-1000"></div>
            <div className="absolute top-0 right-1/4 w-[100vw] h-[100vh] bg-[radial-gradient(ellipse_at_center,rgba(73,94,171,0.1)_0%,rgba(0,0,0,0)_50%)] animate-pulse-slow delay-2000"></div>
          </div>
          
          <Header />
          <main>
            <HeroSection />
            <TrustSection />
            <CoreWorkflow />
            <HybridCore />
            <FeatureUniverse />
            <UseCases />
            <CommunitySection />
            <DownloadSection />
          </main>
          <Footer />
        </div>
      </LazyMotion>
  );
}

export default App;