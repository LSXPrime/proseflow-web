import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const CommunitySection = () => {
  const communityActions = [
    {
      title: 'Report a Bug / Suggest a Feature',
      description: 'Help us find the flaws and dream up the future. Your voice shapes the next evolution.',
      icon: 'lucide:bug',
      buttonText: 'Open an Issue on GitHub',
      buttonLink: 'https://github.com/LSXPrime/ProseFlow/issues'
    },
    {
      title: 'Contribute Code',
      description: 'Are you a builder? The source code is open. Join us in creating the ultimate AI tool.',
      icon: 'lucide:code',
      buttonText: 'Become a Contributor',
      buttonLink: 'https://github.com/LSXPrime/ProseFlow/blob/main/CONTRIBUTING.md'
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
          ProseFlow is Forged by its Community.
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {communityActions.map((action, index) => (
            <motion.div
              key={action.title}
              className="glass-glow rounded-2xl p-8 backdrop-blur-lg border border-indigo-500/20 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                boxShadow: '0 0 40px rgba(129, 140, 248, 0.4)'
              }}
            >
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-full bg-gray-800/50 mr-4 icon-glow">
                  <Icon icon={action.icon} width="24" height="24" className="text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold">{action.title}</h3>
              </div>
              
              <p className="text-gray-300 mb-8">{action.description}</p>
              
              <motion.a
                href={action.buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{action.buttonText}</span>
                <Icon icon="lucide:external-link" className="ml-2" />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;