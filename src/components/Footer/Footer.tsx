const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (<footer className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">

            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
                <span className="text-2xl font-bold">
                  <span className="text-white">Prose</span>
                  <span className="text-indigo-400">Flow</span>
                </span>
                    <span className="text-gray-400">
              © {currentYear} ProseFlow. Fluid Intelligence.
            </span>
                </div>

                <p className="text-center text-gray-400 md:text-right">
                    Created with ❤️ and respect for your privacy by{' '}
                    <a
                        href="https://github.com/LSXPrime"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 transition-colors duration-300 hover:text-indigo-300"
                    >
                        @LSXPrime
                    </a>
                </p>
            </div>
        </div>
    </footer>);
};

export default Footer;