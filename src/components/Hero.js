function Hero({ onPlay }) {
    try {
        const [currentHero, setCurrentHero] = React.useState(0);
        const heroContent = getHeroContent();

        React.useEffect(() => {
            const timer = setInterval(() => {
                setCurrentHero((prev) => (prev + 1) % heroContent.length);
            }, 5000);

            return () => clearInterval(timer);
        }, [heroContent.length]);

        const content = heroContent[currentHero];

        return (
            <div className="relative h-screen">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ 
                        backgroundImage: `url(${content.backdrop})` 
                    }}
                >
                    <div className="absolute inset-0 hero-gradient"></div>
                </div>

                <div className="relative z-10 flex items-end h-full">
                    <div className="px-4 lg:px-8 pb-32 max-w-2xl">
                        <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                            {content.title}
                        </h1>
                        
                        <p className="text-lg lg:text-xl mb-6 text-gray-200">
                            {content.description}
                        </p>

                        <div className="flex items-center space-x-4 mb-6">
                            <span className="bg-[var(--primary-color)] text-white px-2 py-1 rounded text-sm">
                                {content.rating}
                            </span>
                            <span className="text-gray-300">{content.year}</span>
                            <span className="text-gray-300">{content.genre}</span>
                            {content.seasons && (
                                <span className="text-gray-300">
                                    {content.seasons} temporadas
                                </span>
                            )}
                        </div>

                        <div className="flex space-x-4">
                            <button 
                                onClick={() => onPlay(content)}
                                className="bg-white text-black px-8 py-3 rounded flex items-center space-x-2 font-semibold hover:bg-gray-200 transition-colors"
                            >
                                <div className="icon-play text-lg"></div>
                                <span>Assistir</span>
                            </button>
                            
                            <button className="bg-gray-600 bg-opacity-70 text-white px-8 py-3 rounded flex items-center space-x-2 font-semibold hover:bg-opacity-90 transition-colors">
                                <div className="icon-info text-lg"></div>
                                <span>Mais Informações</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Hero component error:', error);
        return null;
    }
}