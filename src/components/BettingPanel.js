function BettingPanel({ bet, setBet, balance, onSpin, isSpinning }) {
    try {
        const quickBets = [1, 5, 10, 25, 50, 100];

        const handleBetChange = (amount) => {
            if (amount >= 1 && amount <= Math.min(balance, 1000)) {
                setBet(amount);
            }
        };

        return (
            <div className="space-y-6">
                <div className="bg-black bg-opacity-30 rounded-lg p-4">
                    <div className="text-sm text-gray-300 mb-2">Valor da Aposta</div>
                    <div className="flex items-center space-x-2">
                        <button 
                            onClick={() => handleBetChange(bet - 1)}
                            className="bg-red-600 hover:bg-red-700 w-8 h-8 rounded flex items-center justify-center"
                            disabled={bet <= 1}
                        >
                            -
                        </button>
                        <input 
                            type="number"
                            value={bet}
                            onChange={(e) => handleBetChange(parseFloat(e.target.value) || 1)}
                            className="bg-black bg-opacity-50 border border-yellow-400 rounded px-3 py-2 text-center text-yellow-400 font-bold flex-1"
                            min="1"
                            max={Math.min(balance, 1000)}
                        />
                        <button 
                            onClick={() => handleBetChange(bet + 1)}
                            className="bg-green-600 hover:bg-green-700 w-8 h-8 rounded flex items-center justify-center"
                            disabled={bet >= Math.min(balance, 1000)}
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    {quickBets.map(amount => (
                        <button
                            key={amount}
                            onClick={() => handleBetChange(amount)}
                            className={`py-2 px-3 rounded text-sm font-medium transition-colors ${
                                bet === amount 
                                    ? 'bg-yellow-400 text-black' 
                                    : 'bg-black bg-opacity-30 text-yellow-400 hover:bg-yellow-400 hover:text-black'
                            }`}
                            disabled={amount > balance}
                        >
                            R$ {amount}
                        </button>
                    ))}
                </div>

                <button 
                    onClick={onSpin}
                    disabled={isSpinning || bet > balance}
                    className="btn-gold w-full py-4 text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSpinning ? (
                        <div className="flex items-center justify-center">
                            <div className="icon-loader-2 animate-spin mr-2"></div>
                            Girando...
                        </div>
                    ) : (
                        '🎰 GIRAR'
                    )}
                </button>

                <div className="text-center text-sm text-gray-400">
                    Ganho possível: R$ {(bet * 10).toFixed(2)} - R$ {(bet * 100).toFixed(2)}
                </div>
            </div>
        );
    } catch (error) {
        console.error('BettingPanel component error:', error);
        return null;
    }
}