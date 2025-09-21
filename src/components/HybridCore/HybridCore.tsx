import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const HybridCore = () => {
  const options = [
    {
      id: 'cloud',
      title: 'LIMITLESS POWER',
      features: [
        'Access cutting-edge models (OpenAI, Groq, etc.)',
        'Intelligent provider fallback for 100% uptime',
        'Secure, encrypted on-disk API key storage'
      ],
      bgColor: 'from-indigo-900/30 to-purple-900/30',
      borderColor: 'border-indigo-500/30'
    },
    {
      id: 'local',
      title: 'ABSOLUTE PRIVACY',
      features: [
        'Works completely offline, forever',
        'No data ever leaves your machine',
        'No API keys, no per-use costs'
      ],
      bgColor: 'from-purple-900/30 to-indigo-900/30',
      borderColor: 'border-purple-500/30'
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          The Power of Choice. The Freedom of Privacy.
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {options.map((option, index) => (
            <motion.div
              key={option.id}
              className={`glass rounded-2xl p-8 backdrop-blur-lg border ${option.borderColor} overflow-hidden relative`}
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 30px rgba(129, 140, 248, 0.3)'
              }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${option.bgColor} z-[-1]`}></div>
              
              {/* Nebula effect for cloud */}
              {option.id === 'cloud' && (
                <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_center,rgba(92,107,192,0.2)_0%,rgba(0,0,0,0)_70%)]"></div>
              )}
              
              {/* Energy core effect for local */}
              {option.id === 'local' && (
                <div className="absolute top-0 right-0 w-64 h-64">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.3)_0%,rgba(0,0,0,0)_70%)] animate-pulse"></div>
                </div>
              )}
              
              <h3 className="text-3xl font-bold mb-8">{option.title}</h3>
              
              <ul className="space-y-4">
                {option.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * featureIndex }}
                    viewport={{ once: true }}
                  >
                    <Icon icon="lucide:check" className="text-green-400 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-200">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HybridCore;