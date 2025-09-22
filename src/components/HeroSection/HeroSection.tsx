import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [os, setOs] = useState('macOS');
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const platform = navigator.platform;
    if (platform.includes('Win')) {
      setOs('Windows');
    } else if (platform.includes('Mac')) {
      setOs('macOS');
    } else if (platform.includes('Linux')) {
      setOs('Linux');
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-16 pb-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold max-w-4xl leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block mb-2">Fluid Intelligence</span>
            <span className="block gradient-text">Instantly.</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            The Universal Text Co-pilot that melts into your workflow, on any app, on your terms.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a 
              href="#download" 
              className="btn-primary flex items-center justify-center space-x-2"
            >
              <Icon icon="lucide:download" />
              <span>Download for {os}</span>
            </a>
            <a 
              href="https://github.com/LSXPrime/ProseFlow"
              className="btn-secondary flex items-center justify-center space-x-2"
            >
              <Icon icon="lucide:github" />
              <span>Star on GitHub</span>
            </a>
          </motion.div>

            {/* Video element */}
            <motion.div
                // The height is now responsive
                className="relative w-full max-w-4xl h-[250px] md:h-[450px] rounded-2xl overflow-hidden border border-gray-800"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
            >
                {!videoError ? (
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls={false}
                        className="w-full h-full object-fill"
                        preload="metadata"
                        onError={() => setVideoError(true)}
                    >
                        <source src="https://github.com/LSXPrime/_resources/raw/refs/heads/main/ProseFlow/video-hero_section-software.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-900/20 to-purple-900/20 flex items-center justify-center">
                        <p className="text-gray-400">Video failed to load</p>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;