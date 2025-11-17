function VideoPlayer({ content, onClose, onBack }) {
    try {
        const [isPlaying, setIsPlaying] = React.useState(true);
        const [showControls, setShowControls] = React.useState(true);
        const videoRef = React.useRef(null);

        React.useEffect(() => {
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = 'unset';
            };
        }, []);

        React.useEffect(() => {
            const timer = setTimeout(() => {
                setShowControls(false);
            }, 3000);

            return () => clearTimeout(timer);
        }, []);

        const togglePlay = () => {
            if (videoRef.current) {
                if (isPlaying) {
                    videoRef.current.pause();
                } else {
                    videoRef.current.play();
                }
                setIsPlaying(!isPlaying);
            }
        };

        const handleMouseMove = () => {
            setShowControls(true);
            setTimeout(() => {
                setShowControls(false);
            }, 3000);
        };

        return (
            <div 
                className="fixed inset-0 bg-black z-50 flex items-center justify-center"
                onMouseMove={handleMouseMove}
            >
                <video
                    ref={videoRef}
                    src={content.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
                    className="w-full h-full object-contain"
                    autoPlay
                    controls={showControls}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                />

                <div className={`absolute inset-0 transition-opacity duration-300 ${
                    showControls ? 'opacity-100' : 'opacity-0'
                }`}>
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                        <button
                            onClick={onBack}
                            className="bg-black bg-opacity-70 p-3 rounded-full hover:bg-opacity-90 transition-colors"
                        >
                            <div className="icon-arrow-left text-white text-xl"></div>
                        </button>

                        <button
                            onClick={onClose}
                            className="bg-black bg-opacity-70 p-3 rounded-full hover:bg-opacity-90 transition-colors"
                        >
                            <div className="icon-x text-white text-xl"></div>
                        </button>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-black bg-opacity-70 rounded-lg p-4">
                            <h3 className="text-white font-semibold mb-1">
                                {content.title}
                                {content.currentEpisode && (
                                    <span className="text-gray-300 ml-2">
                                        - {content.currentEpisode.title}
                                    </span>
                                )}
                            </h3>
                            {content.currentEpisode && (
                                <p className="text-gray-400 text-sm">
                                    {content.currentEpisode.description}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <button
                            onClick={togglePlay}
                            className="bg-black bg-opacity-50 p-6 rounded-full hover:bg-opacity-70 transition-colors"
                        >
                            <div className={`text-white text-3xl ${
                                isPlaying ? 'icon-pause' : 'icon-play'
                            }`}></div>
                        </button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('VideoPlayer component error:', error);
        return null;
    }
}