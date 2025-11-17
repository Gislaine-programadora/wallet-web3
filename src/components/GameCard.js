function GameCard({ title, description, image, minBet, maxBet, onPlay }) {
    try {
        return (
            <div className="game-card p-6 text-center">
                <div className="text-6xl mb-4">{image}</div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">{title}</h3>
                <p className="text-gray-300 text-sm mb-4">{description}</p>
                
                <div className="bg-black bg-opacity-30 rounded-lg p-3 mb-4">
                    <div className="text-xs text-gray-400 mb-1">Aposta</div>
                    <div className="text-yellow-400 font-bold">
                        R$ {minBet} - R$ {maxBet}
                    </div>
                </div>
                
                <button 
                    onClick={onPlay}
                    className="btn-gold w-full py-3 text-lg font-bold"
                >
                    🎰 Jogar
                </button>
            </div>
        );
    } catch (error) {
        console.error('GameCard component error:', error);
        return null;
    }
}