import { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const UseCases = () => {
  const [activePersona, setActivePersona] = useState('developer');

  const personas = [
    {
      id: 'developer',
      title: 'THE DEVELOPER',
      icon: 'lucide:code',
      headline: 'Your Unfair Advantage in the IDE',
      capabilities: [
        'Explain selected code',
        'Write docstrings and comments',
        'Convert to another language',
        'Optimize for performance',
        'Create unit tests',
        'Format JSON/SQL'
      ],
      video: 'https://github.com/LSXPrime/_resources/raw/refs/heads/main/ProseFlow/video-use_case-code.mp4'
    },
    {
      id: 'writer',
      title: 'THE WRITER',
      icon: 'lucide:pen-tool',
      headline: 'Craft Words That Captivate',
      capabilities: [
        'Fix grammar and spelling',
        'Rephrase in a different tone (formal, casual)',
        'Summarize long passages',
        'Expand on a simple idea',
        'Brainstorm headlines',
        'Check for clarity and conciseness'
      ],
      video: 'https://github.com/LSXPrime/_resources/raw/refs/heads/main/ProseFlow/video-use_case-writer.mp4'
    },
    {
      id: 'student',
      title: 'THE STUDENT',
      icon: 'lucide:graduation-cap',
      headline: 'Learn Faster, Achieve More',
      capabilities: [
        'Create outlines from notes',
        'Check for clarity and conciseness',
        'Explain complex concepts',
        'Translate research papers',
        'Format citations',
        'Summarize academic articles'
      ],
      video: 'https://github.com/LSXPrime/_resources/raw/refs/heads/main/ProseFlow/video-use_case-researcher.mp4'
    }
  ];

  const activePersonaData = personas.find(persona => persona.id === activePersona) || personas[0];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          For the Thinkers, the Builders, the Achievers.
        </motion.h2>
        
        <motion.p 
          className="text-xl text-gray-400 text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Whether you're writing code, content, or essays, ProseFlow adapts to your needs.
        </motion.p>
        
        {/* Persona Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {personas.map((persona) => (
            <motion.button
              key={persona.id}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activePersona === persona.id
                  ? 'bg-indigo-600 text-white'
                  : 'glass border border-gray-800 text-gray-300 hover:border-indigo-500/30'
              }`}
              onClick={() => setActivePersona(persona.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon icon={persona.icon} className="inline mr-2" />
              {persona.title}
            </motion.button>
          ))}
        </div>
        
        {/* Content Panel */}
        <motion.div 
          className="glass-glow rounded-2xl p-8 backdrop-blur-lg border border-indigo-500/20"
          key={activePersona}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{
            boxShadow: '0 0 40px rgba(129, 140, 248, 0.4)'
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Visual */}
            <div className="flex items-center justify-center">
              <div className="w-full h-64 rounded-xl bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-gray-800 overflow-hidden">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  controls={false}
                  className="w-full h-full object-cover"
                  preload="metadata"
                >
                  <source src={activePersonaData.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            
            {/* Content */}
            <div>
              <h3 className="text-2xl font-bold mb-6">{activePersonaData.headline}</h3>
              
              <ul className="space-y-3 mb-8">
                {activePersonaData.capabilities.map((capability, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Icon icon="lucide:check" className="text-green-400 mt-1 mr-3 flex-shrink-0" />
                    <span>{capability}</span>
                  </motion.li>
                ))}
              </ul>
              
              <motion.a
                href="#download"
                className="btn-primary inline-flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Start Your Workflow</span>
                <Icon icon="lucide:arrow-right" className="ml-2" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCases;