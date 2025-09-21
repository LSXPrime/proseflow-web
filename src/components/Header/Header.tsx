import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Close mobile menu when resizing to desktop
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-3 bg-black/90 backdrop-blur-2xl border-b border-gray-800/30 shadow-xl' 
          : 'py-5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo with SVG from public folder */}
        <motion.div
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative">
            {/* Multi-layered fluid glow effect */}
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-indigo-600/20 blur-xl opacity-80 animate-pulse"></div>
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500/30 to-purple-500/30 blur-lg opacity-60 animate-pulse delay-1000"></div>

            <div className="relative flex items-center space-x-4 bg-black/50 backdrop-blur-3xl rounded-2xl px-5 py-3 border border-gray-800/50 shadow-2xl">
              {/* SVG Logo */}
              <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-900/90 to-purple-900/90 border border-indigo-500/40 shadow-lg">
                <img src="https://raw.githubusercontent.com/LSXPrime/proseflow-web/public/icons/logo.svg" alt="ProseFlow Logo" className="w-8 h-8" />
              </div>

              {/* Branding with refined typography */}
              <div className="flex flex-col">
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-black tracking-tight">
                    <span className="text-white">Prose</span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-200 to-indigo-300">Flow</span>
                  </span>
                </div>
                <span className="text-[0.6rem] tracking-widest text-gray-400 font-bold uppercase">Fluid Intelligence</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          {/* Desktop CTA Buttons */}
          <div className="flex items-center space-x-4">
            <motion.a
              href="https://github.com/LSXPrime/ProseFlow"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 glass rounded-xl px-5 py-3 text-sm hover:border-indigo-500/50 transition-all duration-300 group shadow-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 25px rgba(129, 140, 248, 0.4)'
              }}
              whileTap={{ scale: 0.97 }}
            >
              <Icon icon="lucide:github" className="text-gray-300 group-hover:text-white transition-colors text-lg" />
              <span className="font-bold">Star on GitHub</span>
            </motion.a>

            <motion.a
              href="#download"
              className="relative btn-primary flex items-center space-x-3 rounded-xl py-3 px-6 font-bold text-sm group shadow-xl"
              whileHover={{
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Animated gradient border effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur"></div>
              <div className="relative flex items-center space-x-2.5">
                <Icon icon="lucide:download" className="group-hover:animate-bounce" />
                <span>Download</span>
              </div>
            </motion.a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-3.5">
          <motion.a
            href="https://github.com/LSXPrime/ProseFlow"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl glass border border-gray-800 shadow-lg"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon icon="lucide:github" className="text-white text-xl" />
          </motion.a>

          <motion.a
            href="#download"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl glass border border-gray-800 shadow-lg"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon icon="lucide:download" className="text-white text-xl" />
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;