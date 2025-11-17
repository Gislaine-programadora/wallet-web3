function SeriesDetail({ content, onBack, onPlay }) {
    try {
        const [selectedSeason, setSelectedSeason] = React.useState(1);
        const episodes = getEpisodes(content.id, selectedSeason);

        if (!content) {
            return null;
        }

        return (
            <div className="min-h-screen pt-20">
                <button
                    onClick={onBack}
                    className="fixed top-24 left-4 z-10 bg-black bg-opacity-70 p-2 rounded-full hover:bg-opacity-90 transition-colors"
                >
                    <div className="icon-arrow-left text-white text-xl"></div>
                </button>

                <div className="relative h-96 lg:h-[500px]">
                    <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${content.backdrop})` }}
                    >
                        <div className="absolute inset-0 hero-gradient"></div>
                    </div>

                    <div className="relative z-10 flex items-end h-full">
                        <div className="px-4 lg:px-8 pb-8 flex space-x-6">
                            <img
                                src={content.poster}
                                alt={content.title}
                                className="w-32 lg:w-48 rounded-lg shadow-lg"
                            />
                            
                            <div className="flex-1 max-w-2xl">
                                <h1 className="text-3xl lg:text-5xl font-bold mb-4">
                                    {content.title}
                                </h1>
                                
                                <div className="flex items-center space-x-4 mb-4">
                                    <span className="bg-[var(--primary-color)] text-white px-2 py-1 rounded">
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

                                <p className="text-lg text-gray-200 mb-6">
                                    {content.description}
                                </p>

                                <div className="flex space-x-4">
                                    <button 
                                        onClick={() => onPlay(content, episodes[0])}
                                        className="bg-white text-black px-6 py-3 rounded flex items-center space-x-2 font-semibold hover:bg-gray-200 transition-colors"
                                    >
                                        <div className="icon-play text-lg"></div>
                                        <span>Assistir</span>
                                    </button>
                                    
                                    <button className="bg-gray-600 bg-opacity-70 text-white px-6 py-3 rounded flex items-center space-x-2 hover:bg-opacity-90 transition-colors">
                                        <div className="icon-plus text-lg"></div>
                                        <span>Minha Lista</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-4 lg:px-8 py-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-white mb-4">
                            Episódios
                        </h2>
                        
                        {content.seasons > 1 && (
                            <div className="flex space-x-2 mb-6">
                                {Array.from({ length: content.seasons }, (_, i) => i + 1).map(season => (
                                    <button
                                        key={season}
                                        onClick={() => setSelectedSeason(season)}
                                        className={`px-4 py-2 rounded transition-colors ${
                                            selectedSeason === season
                                                ? 'bg-[var(--primary-color)] text-white'
                                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                        }`}
                                    >
                                        Temporada {season}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="grid gap-4">
                        {episodes.map((episode, index) => (
                            <div 
                                key={index}
                                onClick={() => onPlay(content, episode)}
                                className="episode-card p-4 cursor-pointer flex space-x-4"
                            >
                                <div className="flex-shrink-0 w-32 h-20">
                                    <img
                                        src={episode.thumbnail}
                                        alt={episode.title}
                                        className="w-full h-full object-cover rounded"
                                    />
                                </div>
                                
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-semibold text-white">
                                            {index + 1}. {episode.title}
                                        </h3>
                                        <span className="text-sm text-gray-400">
                                            {episode.duration}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-400 line-clamp-2">
                                        {episode.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('SeriesDetail component error:', error);
        return null;
    }
}