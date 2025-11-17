function LuckyCoins({ balance, onUpdateBalance, onBack }) {
    try {
        const [coins, setCoins] = React.useState([]);
        const [bet, setBet] = React.useState(10);
        const [isFlipping, setIsFlipping] = React.useState(false);
        const [gameActive, setGameActive] = React.useState(false);
        const [currentWin, setCurrentWin] = React.useState(0);
        const [streak, setStreak] = React.useState(0);

        const startGame = () => {
            if (bet > balance) {
                alert('Saldo insuficiente!');
                return;
            }

            onUpdateBalance(balance - bet);
            setGameActive(true);
            setCurrentWin(0);
            setStreak(0);
            
            const initialCoins = Array.from({ length: 9 }, (_, index) => ({
                id: index,
                side: Math.random() > 0.5 ? 'heads' : 'tails',
                isRevealed: false,
                multiplier: Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 2 : 1
            }));
            
            setCoins(initialCoins);
        };

        const flipCoin = async (coinId) => {
            if (!gameActive || isFlipping) return;

            setIsFlipping(true);
            
            // Animation delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const newCoins = coins.map(coin => 
                coin.id === coinId ? { ...coin, isRevealed: true } : coin
            );
            setCoins(newCoins);

            const coin = coins.find(c => c.id === coinId);
            
            if (coin.side === 'heads') {
                const winAmount = bet * coin.multiplier;
                setCurrentWin(prev => prev + winAmount);
                setStreak(prev => prev + 1);
                
                if (coin.multiplier > 1) {
                    // Special multiplier coin
                    setTimeout(() => {
                        alert(`🪙 MOEDA ESPECIAL! Multiplicador ${coin.multiplier}x!`);
                    }, 100);
                }
            } else {
                // Tails - game over
                setGameActive(false);
                if (currentWin > 0) {
                    onUpdateBalance(balance - bet + currentWin);
                }
            }
            
            setIsFlipping(false);
        };

        const cashOut = () => {
            if (currentWin > 0) {
                onUpdateBalance(balance - bet + currentWin);
            }
            setGameActive(false);
        };

        const resetGame = () => {
            setGameActive(false);
            setCoins([]);
            setCurrentWin(0);
            setStreak(0);
        };

        return (
            <div className="container mx-auto px-4 py-8">
                <button onClick={onBack} className="btn-primary px-4 py-2 mb-6">
                    <div className="icon-arrow-left text-sm mr-2 inline-block"></div>
                    Voltar
                </button>

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-yellow-400 mb-2">🪙 Lucky Coins</h2>
                    <p className="text-gray-300">Vire as moedas e torça por cara!</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="game-card p-6">
                            {gameActive && (
                                <div className="text-center mb-6">
                                    <div className="text-lg text-green-400 font-bold">
                                        Ganho atual: R$ {currentWin.toFixed(2)}
                                    </div>
                                    <div className="text-sm text-blue-400">
                                        Sequência: {streak} moedas
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-3 gap-4 mb-6">
                                {coins.map((coin) => (
                                    <div
                                        key={coin.id}
                                        onClick={() => flipCoin(coin.id)}
                                        className={`aspect-square rounded-full border-4 flex items-center justify-center text-4xl font-bold cursor-pointer transition-all ${
                                            coin.isRevealed
                                                ? coin.side === 'heads'
                                                    ? 'bg-yellow-400 border-yellow-300 text-black'
                                                    : 'bg-gray-600 border-gray-500 text-white'
                                                : 'bg-orange-500 border-orange-400 text-white hover:bg-orange-400'
                                        } ${!gameActive || isFlipping ? 'cursor-not-allowed opacity-50' : ''}`}
                                    >
                                        {coin.isRevealed 
                                            ? coin.side === 'heads' 
                                                ? coin.multiplier > 1 ? '👑' : '🪙'
                                                : '❌'
                                            : '🪙'
                                        }
                                        {coin.isRevealed && coin.multiplier > 1 && (
                                            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                                                {coin.multiplier}x
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {!gameActive ? (
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4 justify-center">
                                        <button 
                                            onClick={() => setBet(Math.max(2, bet - 2))}
                                            className="bg-red-600 hover:bg-red-700 w-10 h-10 rounded"
                                            disabled={bet <= 2}
                                        >
                                            -
                                        </button>
                                        <div className="bg-black bg-opacity-50 px-4 py-2 rounded border border-yellow-400">
                                            <span className="text-yellow-400 font-bold">R$ {bet}</span>
                                        </div>
                                        <button 
                                            onClick={() => setBet(Math.min(balance, bet + 2))}
                                            className="bg-green-600 hover:bg-green-700 w-10 h-10 rounded"
                                            disabled={bet >= balance}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={startGame}
                                        className="btn-gold w-full py-3 text-lg font-bold"
                                    >
                                        🪙 Começar Jogo
                                    </button>
                                </div>
                            ) : (
                                <div className="space-x-4 flex">
                                    <button
                                        onClick={cashOut}
                                        disabled={currentWin === 0}
                                        className="btn-success flex-1 py-3 font-bold disabled:opacity-50"
                                    >
                                        💰 Retirar R$ {currentWin.toFixed(2)}
                                    </button>
                                    <button
                                        onClick={resetGame}
                                        className="btn-primary flex-1 py-3 font-bold"
                                    >
                                        🔄 Novo Jogo
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <WalletBalance balance={balance} />
                        
                        <div className="game-card p-4 mt-6">
                            <h3 className="text-lg font-bold text-yellow-400 mb-3">Como Jogar</h3>
                            <div className="text-sm text-gray-300 space-y-2">
                                <p>• Clique nas moedas para virá-las</p>
                                <p>• Cara = ganho, Coroa = fim do jogo</p>
                                <p>• Moedas especiais = multiplicador</p>
                                <p>• Retire seus ganhos a qualquer momento</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('LuckyCoins error:', error);
        return null;
    }
}
