import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

interface TrustCardProps {
  icon: string;
  title: string;
  text: string;
  delay?: number;
}

const TrustCard: React.FC<TrustCardProps> = ({ icon, title, text, delay = 0 }) => {
  return (
    <motion.div
      className="glass-glow rounded-xl p-6 backdrop-blur-lg border border-indigo-500/20 transition-all duration-500"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        y: -5,
        boxShadow: '0 0 30px rgba(129, 140, 248, 0.4)'
      }}
    >
      <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center mb-4 icon-glow">
        <Icon icon={icon} className="w-8 h-8 text-indigo-400" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{text}</p>
    </motion.div>
  );
};

const TrustSection: React.FC = () => {
  const trustCards = [
    {
      icon: 'lucide:shield-check',
      title: 'Transparent & Verifiable',
      text: 'The full source code is on GitHub for you to inspect, audit, and trust.'
    },
    {
      icon: 'lucide:lock',
      title: 'Your Data Stays With You',
      text: 'No telemetry. No cloud sync. With local models, your data never leaves your machine.'
    },
    {
      icon: 'lucide:users',
      title: 'Built by the Community',
      text: 'Contributions are welcome and encouraged. Help us build the future of text processing.'
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Proudly Free and Open Source. Forever.
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustCards.map((card, index) => (
            <TrustCard 
              key={index}
              icon={card.icon}
              title={card.title}
              text={card.text}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;