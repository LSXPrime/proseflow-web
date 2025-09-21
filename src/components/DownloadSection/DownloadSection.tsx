import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const downloadData = {
    Windows: {
        icon: 'ion:logo-windows',
        architectures: [
            {
                name: 'Windows (64-bit)',
                arch: 'x64',
                downloads: {
                    installer: {
                        name: 'Installer',
                        ext: '.exe',
                        url: 'https://github.com/LSXPrime/ProseFlow/releases/latest/download/ProseFlow-win-x64-Setup.exe'
                    },
                    portable: {
                        name: 'Portable',
                        ext: '.zip',
                        url: 'https://github.com/LSXPrime/ProseFlow/releases/latest/download/ProseFlow-win-x64-Portable.zip'
                    }
                }
            }
        ]
    },
    macOS: {
        icon: 'wpf:mac-os',
        architectures: [
            {
                name: 'Apple Silicon',
                arch: 'arm64',
                downloads: {
                    installer: {
                        name: 'Installer',
                        ext: '.pkg',
                        url: 'https://github.com/LSXPrime/ProseFlow/releases/latest/download/ProseFlow-osx-arm64-Setup.pkg'
                    },
                    portable: {
                        name: 'Portable',
                        ext: '.zip',
                        url: 'https://github.com/LSXPrime/ProseFlow/releases/latest/download/ProseFlow-osx-arm64-Portable.zip'
                    }
                }
            },
            {
                name: 'Intel',
                arch: 'x64',
                downloads: {
                    installer: {
                        name: 'Installer',
                        ext: '.pkg',
                        url: 'https://github.com/LSXPrime/ProseFlow/releases/latest/download/ProseFlow-osx-x64-Setup.pkg'
                    },
                    portable: {
                        name: 'Portable',
                        ext: '.zip',
                        url: 'https://github.com/LSXPrime/ProseFlow/releases/latest/download/ProseFlow-osx-x64-Portable.zip'
                    }
                }
            }
        ]
    },
    Linux: {
        icon: 'fa:linux',
        architectures: [
            {
                name: 'Standard (x64)',
                arch: 'x64',
                downloads: {
                    installer: {
                        name: 'AppImage',
                        ext: '.AppImage',
                        url: 'https://github.com/LSXPrime/ProseFlow/releases/latest/download/ProseFlow-linux-x64.AppImage'
                    }
                }
            },
            {
                name: 'ARM (arm64)',
                arch: 'arm64',
                downloads: {
                    installer: {
                        name: 'AppImage',
                        ext: '.AppImage',
                        url: 'https://github.com/LSXPrime/ProseFlow/releases/latest/download/ProseFlow-linux-arm64.AppImage'
                    }
                }
            }
        ]
    }
};

// Enhanced Architecture Detection Logic

/**
 * Helper function to detect if a Mac is using Apple Silicon.
 * This is a common workaround using WebGL renderer info, as there's no direct API.
 */
function isAppleSilicon() {
    try {
        const canvas = new OffscreenCanvas(1, 1);
        const gl = canvas.getContext('webgl');

        if (!gl) return false;

        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (!debugInfo) return false;

        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '';

        return renderer.includes('Apple') && !renderer.includes('Apple GPU');

    } catch (e) {
        console.warn('Could not determine Mac hardware via WebGL:', e);
        return false;
    }
}

/**
 * A best-guess of the user's CPU architecture.
 */
function getCpuArchitecture() {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;

    // Check User Agent for common 64-bit and ARM identifiers
    const uaChecks = [
        { arch: 'x64',   patterns: ['x86_64', 'x86-64', 'Win64', 'x64', 'amd64', 'WOW64'] },
        { arch: 'arm64', patterns: ['ARM64', 'AArch64'] }
    ];

    for (const { arch, patterns } of uaChecks) {
        if (patterns.some(pattern => userAgent.includes(pattern))) {
            return arch;
        }
    }

    // Check Navigator Platform for Linux-specific identifiers
    const platformChecks = [
        { arch: 'x64',   patterns: ['Linux x86_64'] },
        { arch: 'arm64', patterns: ['Linux aarch64', 'Linux armv8l'] }
    ];

    for (const { arch, patterns } of platformChecks) {
        if (patterns.some(pattern => platform.startsWith(pattern))) {
            return arch;
        }
    }

    // Handle the special case for macOS (MacIntel platform)
    if (platform === 'MacIntel') {
        return isAppleSilicon() ? 'arm64' : 'x64';
    }

    // Default fallback for 64-bit systems
    return 'x64';
}

const DownloadSection = () => {
    const [selectedOs, setSelectedOs] = useState('Windows');
    const [recommendedDownload, setRecommendedDownload] = useState<any>();
    const [latestVersion, setLatestVersion] = useState<string>('latest');

    useEffect(() => {
        // Fetch latest GitHub release version
        const fetchLatestVersion = async () => {
            try {
                const response = await fetch('https://api.github.com/repos/LSXPrime/ProseFlow/releases/latest');
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.tag_name) {
                        setLatestVersion(data.tag_name.replace(/^v/, ''));
                    }
                } else {
                    console.error(`GitHub API responded with status: ${response.status}`);
                }
            } catch (error) {
                console.error("Failed to fetch latest release version:", error);
            }
        };
        fetchLatestVersion();

        // OS and Architecture Detection
        let detectedOs = 'Windows'; // Default OS
        const platform = navigator.platform;
        if (platform.includes('Win')) {
            detectedOs = 'Windows';
        } else if (platform.includes('Mac')) {
            detectedOs = 'macOS';
        } else if (platform.includes('Linux')) {
            detectedOs = 'Linux';
        }

        // Set the active tab to the detected OS
        setSelectedOs(detectedOs);

        // Use the enhanced detection function to get the CPU architecture
        const detectedArch = getCpuArchitecture();

        // Determine the Recommended Download
        const osData = downloadData[detectedOs as keyof typeof downloadData];
        let recommendedArch = osData.architectures.find(a => a.arch === detectedArch);

        // If the detected architecture isn't available for the OS, fall back to the first one listed.
        if (!recommendedArch) {
            recommendedArch = osData.architectures[0];
        }

        setRecommendedDownload({
            text: `Download for ${detectedOs} (${recommendedArch.name})`,
            link: recommendedArch.downloads.installer.url,
        });
    }, []);

    const osTabs = Object.keys(downloadData);

    return (
        <section id="download" className="py-20 relative">
            <div className="container mx-auto px-4 text-center">
                <motion.h2
                    className="text-4xl md:text-5xl font-bold mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    Your Workflow is About to Change. Forever.
                </motion.h2>

                <motion.p
                    className="text-xl text-gray-400 max-w-2xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Experience the future of text processing with our powerful AI co-pilot.
                </motion.p>

                {/* Main Download Button */}
                <motion.div
                    className="relative mb-12 inline-block glass-glow rounded-xl backdrop-blur-lg border border-indigo-500/20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    whileHover={{ boxShadow: '0 0 40px rgba(129, 140, 248, 0.4)' }}
                >
                    <div className="absolute inset-0 m-auto w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(92,107,192,0.3)_0%,rgba(0,0,0,0)_60%)] blur-3xl -z-10 pointer-events-none"></div>
                    <motion.a
                        href={recommendedDownload ? recommendedDownload.link : '#'}
                        className="btn-primary inline-flex items-center text-lg px-10 py-5 rounded-xl min-w-[350px] justify-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Icon icon="lucide:download" className="mr-3" />
                        <span>{recommendedDownload ? recommendedDownload.text : 'Download ProseFlow'}</span>
                    </motion.a>
                </motion.div>

                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                >
                    <p className="text-gray-400">
                        Free & Open Source | Version {latestVersion} |{' '}
                        <a href="https://github.com/LSXPrime/ProseFlow/releases" className="text-indigo-400 hover:underline">
                            Release Notes
                        </a>
                    </p>
                </motion.div>

                {/* OS Tab Selectors */}
                <motion.div
                    className="flex justify-center items-center gap-2 md:gap-4 p-2 rounded-xl bg-gray-900/50 border border-white/10 max-w-md mx-auto mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                >
                    {osTabs.map((os) => (
                        <button
                            key={os}
                            onClick={() => setSelectedOs(os)}
                            className={`flex-1 relative transition-colors duration-300 py-3 px-4 rounded-lg text-sm md:text-base font-semibold ${
                                selectedOs === os ? 'text-white' : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            {selectedOs === os && (
                                <motion.div
                                    layoutId="activeOsTab"
                                    className="absolute inset-0 bg-indigo-600/50 rounded-lg"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{os}</span>
                        </button>
                    ))}
                </motion.div>

                {/* Download Options Area */}
                <div className="relative max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                        {(() => {
                            const architectures = downloadData[selectedOs as keyof typeof downloadData].architectures;
                            const containerClasses = architectures.length === 1
                                ? 'flex justify-center'
                                : 'grid grid-cols-1 md:grid-cols-2 gap-8';

                            return (
                                <motion.div
                                    key={selectedOs}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className={containerClasses}
                                >
                                    {architectures.map((arch) => (
                                        <div key={arch.name} className="p-6 rounded-2xl bg-gray-900/50 border border-white/10 text-left md:w-[24rem]">
                                            <h4 className="text-lg font-bold text-white mb-4">{arch.name}</h4>
                                            <div className="flex flex-col sm:flex-row gap-4">
                                                {Object.values(arch.downloads).map((download) => (
                                                    <motion.a
                                                        key={download.name}
                                                        href={download.url}
                                                        className="flex-1 text-center bg-gray-700/50 hover:bg-gray-600/50 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                                                        whileHover={{ y: -3 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        {download.name} <span className="text-gray-400 text-sm">{download.ext}</span>
                                                    </motion.a>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            );
                        })()}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default DownloadSection;