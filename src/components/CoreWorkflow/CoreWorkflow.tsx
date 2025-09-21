import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const CoreWorkflow = () => {
  const steps = [
    {
      id: 1,
      title: 'SUMMON',
      icon: 'lucide:command',
      description: 'A global hotkey brings ProseFlow to you, anywhere. No context switching, just pure flow.'
    },
    {
      id: 2,
      title: 'SELECT',
      icon: 'lucide:search',
      description: 'Access your entire library of custom-built AI actions. Find the perfect tool for the job in an instant.'
    },
    {
      id: 3,
      title: 'TRANSFORM',
      icon: 'lucide:sparkles',
      description: 'Replace text in-place for quick fixes or refine the output in a conversational window. The choice is yours.'
    }
  ];

  return (
    <section className="py-20 relative">
      {/* Aurora background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl transform -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl transform -translate-y-1/2"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Summon. Select. Transform.
        </motion.h2>
        
        <div className="max-w-6xl mx-auto">
          {/* Fluid timeline with curved connections */}
          <div className="relative flex justify-between items-center">
            {/* Curved connector lines */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 transform -translate-y-1/2"></div>
            
            {/* Flowing particle effect */}
            <div className="absolute top-1/2 left-0 right-0 h-1">
              <motion.div 
                className="absolute w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_10px_2px_rgba(129,140,248,0.7)]"
                initial={{ left: '0%' }}
                whileInView={{ left: '100%' }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear"
                }}
                viewport={{ once: true }}
              />
            </div>
            
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="relative flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
              >
                {/* Glowing step indicator */}
                <div className="relative mb-8">
                  <div className="w-16 h-16 rounded-full bg-gray-900 border border-indigo-500/30 flex items-center justify-center z-10 relative">
                    <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-md animate-pulse"></div>
                    <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-xl"></div>
                    <span className="text-indigo-400 font-bold text-xl z-10">{step.id}</span>
                  </div>
                  
                  {/* Pulse ring animation */}
                  <motion.div 
                    className="absolute inset-0 rounded-full border border-indigo-500/30"
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  />
                </div>
                
                {/* Step content without card */}
                <div className="text-center max-w-xs">
                  <div className="mb-3 p-3 rounded-full bg-gray-800/50 inline-block">
                    <Icon icon={step.icon} width="28" height="28" className="text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreWorkflow;