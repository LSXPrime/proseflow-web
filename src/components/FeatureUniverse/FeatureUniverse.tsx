import { useState, useEffect, useRef} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {Icon} from '@iconify/react';

const AnimatedGalaxyCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<any[]>([]);
    const animationFrameId = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const parent = canvas.parentElement;
        if (!parent) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // A ref to hold the current radii, which will be updated on resize
        const galaxyRadii = { x: 0, y: 0 };

        // Initialize particles only once
        if (particlesRef.current.length === 0) {
            const numParticles = 1200;
            const arms = 3;
            const armTightness = 0.5;

            for (let i = 0; i < numParticles; i++) {
                // Use a normalized radius (0 to 1) to make it independent of screen size
                const normalizedRadius = Math.pow(Math.random(), 1.5);
                const angle = normalizedRadius * 20 / armTightness;
                const armAngle = Math.floor(Math.random() * arms) * (2 * Math.PI / arms);
                const fuzz = Math.pow(Math.random(), 2) * (1 / (normalizedRadius + 0.1)) * 0.5;

                particlesRef.current.push({
                    normalizedRadius: normalizedRadius,
                    theta: angle + armAngle + fuzz,
                    size: Math.random() * 2.2 + 0.5,
                    opacity: Math.random() * 0.7 + 0.3,
                    // Differential rotation speed factor
                    velocity: 0.0001 + (1 - normalizedRadius) * 0.001,
                    color: ['#ffffff', '#fde047', '#a78bfa', '#7dd3fc'][Math.floor(Math.random() * 4)]
                });
            }
        }

        const animate = () => {
            const { width, height } = canvas.getBoundingClientRect();
            const centerX = width / 2;
            const centerY = height / 2;

            ctx.clearRect(0, 0, width, height);

            // Draw galaxy core glow
            const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, width * 0.1);
            coreGradient.addColorStop(0, 'rgba(253, 224, 71, 0.3)');
            coreGradient.addColorStop(1, 'rgba(253, 224, 71, 0)');
            ctx.fillStyle = coreGradient;
            ctx.fillRect(0, 0, width, height);

            // Update and draw each particle
            particlesRef.current.forEach(p => {
                p.theta += p.velocity;

                // Convert normalized polar coordinates to elliptical cartesian coordinates
                const x = centerX + p.normalizedRadius * galaxyRadii.x * Math.cos(p.theta);
                const y = centerY + p.normalizedRadius * galaxyRadii.y * Math.sin(p.theta);

                if (x > 0 && x < width && y > 0 && y < height) {
                    ctx.beginPath();
                    ctx.arc(x, y, p.size, 0, 2 * Math.PI);
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = p.opacity;
                    ctx.fill();
                }
            });
            ctx.globalAlpha = 1; // Reset global alpha

            animationFrameId.current = requestAnimationFrame(animate);
        };

        // Handle resizing gracefully
        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                const dpr = window.devicePixelRatio || 1;

                canvas.width = width * dpr;
                canvas.height = height * dpr;
                ctx.scale(dpr, dpr);

                // Update the galaxy radii to be elliptical, filling the container
                galaxyRadii.x = width * 0.48;
                galaxyRadii.y = height * 0.48;
            }

            // Kick off animation loop if it's not already running
            if (animationFrameId.current === null) {
                animate();
            }
        });

        resizeObserver.observe(parent);

        return () => {
            resizeObserver.disconnect();
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />;
};


const FeatureUniverse = () => {
    const [activeGroup, setActiveGroup] = useState('productivity');
    const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState('main'); // 'main' or 'group'
    const [featureNodes, setFeatureNodes] = useState<any[]>([]);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Effect to detect mobile screen size
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const featureGroups = [
        {
            id: 'productivity',
            title: 'PRODUCTIVITY',
            icon: 'lucide:zap',
            description: 'Core workflow features that keep you in the flow',
            position: {x: 15, y: 35},
            mobilePosition: { x: 15, y: 10 },
            color: 'from-indigo-500 to-purple-500',
            features: [
                'Generate Text or Transform Selections',
                'Universal Access via Global Hotkeys',
                'Intelligent Floating Orb & Menu',
                'Drag-and-Drop Arc Menu',
                'Smart Paste for Ultimate Speed',
                'Read from Files (PDF, DOCX, etc.)',
                'Flexible Output: In-Place, Windowed, or Diff View',
                'Iterative Refinement Window',
                'Context-Aware Actions'
            ]
        },
        {
            id: 'hybrid',
            title: 'HYBRID AI ENGINE',
            icon: 'lucide:cpu',
            description: 'Run AI locally or connect to cloud providers',
            position: {x: 50, y: 10},
            mobilePosition: { x: 55, y: 22 },
            color: 'from-purple-500 to-pink-500',
            features: [
                'Run AI 100% Locally & Offline',
                'Connect to Your Favorite Cloud AI',
                'Intelligent Provider Fallback',
                'Secure Credential Management'
            ]
        },
        {
            id: 'customization',
            title: 'CUSTOMIZATION',
            icon: 'lucide:sliders-horizontal',
            description: 'Tailor ProseFlow to your exact needs',
            position: {x: 30, y: 70},
            mobilePosition: { x: 25, y: 35 },
            color: 'from-cyan-500 to-blue-500',
            features: [
                'Build Your Own AI "Actions"',
                'Dynamic Templating with Placeholders',
                'Build Powerful Multi-Step Actions',
                'Conditional Logic for Inputs',
                'Organize with Groups, Icons & Favorites',
                'Bulk & Drag-and-Drop Management',
                'Duplicate, Export & Share Actions',
                'Conflict-Free Importing',
                'Intuitive Hotkey Recording'
            ]
        },
        {
            id: 'models',
            title: 'LOCAL MODELS',
            icon: 'lucide:database',
            description: 'Manage and run powerful local AI models',
            position: {x: 65, y: 70},
            mobilePosition: { x: 60, y: 50 },
            color: 'from-blue-500 to-cyan-500',
            features: [
                'Integrated Model Library',
                'GPU Acceleration',
                'Specific GPU Selection',
                'Flash Attention Support',
                'Advanced Resource Management',
                'Auto-Unload Idle Models',
                'Load on Startup',
                'Detailed Parameter Control'
            ]
        },
        {
            id: 'analytics',
            title: 'ANALYTICS',
            icon: 'lucide:bar-chart-2',
            description: 'Track usage and optimize performance',
            position: {x: 80, y: 40},
            mobilePosition: { x: 30, y: 65 },
            color: 'from-teal-500 to-green-500',
            features: [
                'Usage Analytics',
                'Live Background Task Monitoring',
                'Real-Time Application Log',
                'Cloud Performance Monitoring',
                'Live Hardware Monitor',
                'Searchable Interaction History'
            ]
        },
        {
            id: 'collaboration',
            title: 'COLLABORATION',
            icon: 'lucide:users',
            description: 'Sync your setup across devices or with your team',
            position: {x: 48, y: 70},
            mobilePosition: { x: 60, y: 80 },
            color: 'from-green-500 to-emerald-500',
            features: [
                'Shared Workspace Sync',
                'Password-Protected Encryption',
                'Automatic & Manual Sync',
                'Advanced Conflict Resolution'
            ]
        }
    ];

    const activeGroupData = featureGroups.find(group => group.id === activeGroup) || featureGroups[0];

    // Handle node selection: switch to the group's feature galaxy view
    const handleNodeClick = (groupId: string) => {
        setActiveGroup(groupId);

        const groupData = featureGroups.find(group => group.id === groupId);
        if (groupData) {
            // Generate positions for each feature to create a sub-galaxy
            const newFeatureNodes = groupData.features.map((featureText, index) => {
                const angle = (index / groupData.features.length) * 2 * Math.PI;
                // Use a smaller radius on mobile to prevent items from going off-screen
                const radius = (isMobile ? 22 : 28) + Math.random() * (isMobile ? 8 : 10);
                const centerX = isMobile ? 32 : 48;
                return {
                    id: `${groupId}-${index}`,
                    text: featureText,
                    position: {
                        x: centerX + radius * Math.cos(angle) + (Math.random() - 0.5) * 5,
                        y: 50 + radius * Math.sin(angle) + (Math.random() - 0.5) * 5,
                    },
                    // Use smaller orb sizes on mobile
                    size: (isMobile ? 60 : 80) + Math.random() * 40,
                };
            });
            setFeatureNodes(newFeatureNodes);
        }
        setViewMode('group');
    };

    // Handle returning to the main feature groups view
    const handleReturnToMain = () => {
        setViewMode('main');
    };


    return (
        <section className="py-16 sm:py-20 relative overflow-hidden bg-black">
            {/* Global background gradient */}
            <div className="fixed inset-0 z-[-2]">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(92,107,192,0.1)_0%,rgba(0,0,0,0)_70%)]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.h2
                    className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
            ProseFlow Capabilities
          </span>
                </motion.h2>

                <motion.p
                    className="text-lg sm:text-xl text-gray-400 text-center mb-12 sm:mb-16 max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Navigate the galaxy of possibilities
                </motion.p>

                <div
                    className="relative h-[100vh] md:h-[70vh] w-full rounded-3xl border border-gray-800/50 bg-gray-900/20 backdrop-blur-md overflow-hidden"
                    ref={containerRef}
                >
                    <AnimatedGalaxyCanvas />

                    <AnimatePresence mode="wait">
                        {viewMode === 'main' ? (
                            // Main screen: Galaxy of feature groups
                            <motion.div
                                key="main-view"
                                className="w-full h-full"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                            >
                                {/* Connection lines - hidden on mobile to reduce clutter */}
                                {!isMobile && (
                                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                                        <defs>
                                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="rgba(129, 140, 248, 0.2)" />
                                                <stop offset="100%" stopColor="rgba(192, 132, 252, 0.2)" />
                                            </linearGradient>
                                        </defs>
                                        {featureGroups.map((group, index) => (
                                            featureGroups.map((otherGroup, otherIndex) => {
                                                if (index < otherIndex &&
                                                    Math.abs(group.position.x - otherGroup.position.x) < 60 &&
                                                    Math.abs(group.position.y - otherGroup.position.y) < 60) {
                                                    return (
                                                        <line
                                                            key={`${group.id}-${otherGroup.id}`}
                                                            x1={`${group.position.x}%`}
                                                            y1={`${group.position.y}%`}
                                                            x2={`${otherGroup.position.x}%`}
                                                            y2={`${otherGroup.position.y}%`}
                                                            stroke="url(#lineGradient)"
                                                            strokeWidth="0.7"
                                                            strokeDasharray="4,4"
                                                        />
                                                    );
                                                }
                                                return null;
                                            })
                                        ))}
                                    </svg>
                                )}

                                {/* Feature group nodes */}
                                {featureGroups.map((group) => {
                                    const position = isMobile ? group.mobilePosition : group.position;
                                    return (
                                        <motion.div
                                            key={group.id}
                                            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 flex flex-col items-center`}
                                            style={{
                                                left: `${position.x}%`,
                                                top: `${position.y}%`
                                            }}
                                            onMouseEnter={() => !isMobile && setHoveredGroup(group.id)}
                                            onMouseLeave={() => !isMobile && setHoveredGroup(null)}
                                            onClick={() => handleNodeClick(group.id)}
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            whileHover={!isMobile ? { scale: 1.2, zIndex: 30 } : {}}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <div className="relative">
                                                {/* Pulsing ring */}
                                                <motion.div
                                                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${group.color} blur-md`}
                                                    animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0.2, 0.7] }}
                                                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                                                />

                                                {/* Main node */}
                                                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${group.color} flex items-center justify-center relative shadow-lg`}>
                                                    <Icon icon={group.icon} className="text-white" width={isMobile ? 24 : 32} height={isMobile ? 24 : 32} />
                                                </div>
                                            </div>

                                            {/* Title - Static on mobile, on hover for desktop */}
                                            {isMobile ? (
                                                <div className="mt-2 text-center text-xs font-medium text-gray-300 w-24">
                                                    {group.title}
                                                </div>
                                            ) : (
                                                <AnimatePresence>
                                                    {hoveredGroup === group.id && (
                                                        <motion.div
                                                            className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: 10 }}
                                                        >
                                                            <div className="px-4 py-2 bg-black/50 backdrop-blur-lg rounded-full text-sm font-medium">
                                                                {group.title}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        ) : (
                            // Group screen: Galaxy of individual features
                            <motion.div
                                key="group-view"
                                className="w-full h-full p-4 sm:p-8 relative"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                            >
                                {/* Return button */}
                                <motion.button
                                    onClick={handleReturnToMain}
                                    className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50 flex items-center gap-2 px-3 py-2 sm:px-4 bg-black/50 backdrop-blur-lg rounded-full text-xs sm:text-sm font-medium hover:bg-white/20 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Icon icon="lucide:arrow-left" />
                                    <span className="hidden sm:inline">Back to Main Groups</span>
                                </motion.button>

                                {/* Group Title */}
                                <div className="text-center pt-2 relative z-10">
                                    <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300 mb-2">
                                        {activeGroupData.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">{activeGroupData.description}</p>
                                </div>

                                {/* Feature nodes */}
                                <div className="absolute inset-0 z-20">
                                    {featureNodes.map((node, index) => (
                                        <motion.div
                                            key={node.id}
                                            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-center p-2"
                                            style={{
                                                left: `${node.position.x}%`,
                                                top: `${node.position.y}%`,
                                            }}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.2 + index * 0.05 }}
                                        >
                                            <div className="relative">
                                                {/* Background Orb */}
                                                <div
                                                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br ${activeGroupData.color} opacity-20 blur-xl`}
                                                    style={{ width: `${node.size}px`, height: `${node.size}px` }}
                                                />
                                                <div className="relative text-xs sm:text-sm font-medium text-gray-200 max-w-[120px] sm:max-w-[140px]">
                                                    {node.text}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default FeatureUniverse;