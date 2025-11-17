function DragonGold({ balance, onUpdateBalance, onBack }) {
    try {
        const [reels, setReels] = React.useState(['🐉', '🐉', '🐉', '🐉', '🐉']);
        const [isSpinning, setIsSpinning] = React.useState(false);
        const [bet, setBet] = React.useState(20);
        const [lastWin, setLastWin] = React.useState(0);
        const [multiplierActive, setMultiplierActive] = React.useState(false);
        const [currentMultiplier, setCurrentMultiplier] = React.useState(1);

        const symbols = ['🐉', '💰', '👑', '💎', '🔥', '⚡', '🏆'];
        
        const spin = async () => {
            if (bet > balance) {
                alert('Saldo insuficiente!');
                return;
            }

            setIsSpinning(true);
            onUpdateBalance(balance - bet);
            
            // Spinning animation
            for (let i = 0; i < 15; i++) {
                setReels(Array.from({ length: 5 }, () => 
                    symbols[Math.floor(Math.random() * symbols.length)]
                ));
                await new Promise(resolve => setTimeout(resolve, 80));
            }
            
            const result = generateDragonResult(symbols);
            setReels(result.reels);
            
            if (result.win > 0) {
                const finalWin = result.win * currentMultiplier;
                setLastWin(finalWin);
                onUpdateBalance(balance - bet + finalWin);
                
                if (result.multiplier > 1) {
                    setCurrentMultiplier(prev => Math.min(prev * result.multiplier, 50));
                    setMultiplierActive(true);
                }
            } else {
                setLastWin(0);
                setCurrentMultiplier(1);
                setMultiplierActive(false);
            }
            
            setIsSpinning(false);
        };

        const generateDragonResult = (symbols) => {
            const reels = Array.from({ length: 5 }, () => 
                symbols[Math.floor(Math.random() * symbols.length)]
            );
            
            let multiplier = 1;
            let win = 0;
            
            // Count dragons
            const dragonCount = reels.filter(symbol => symbol === '🐉').length;
            
            if (dragonCount >= 5) {
                multiplier = 20;
                win = bet * 50;
            } else if (dragonCount >= 4) {
                multiplier = 10;
                win = bet * 25;
            } else if (dragonCount >= 3) {
                multiplier = 5;
                win = bet * 10;
            } else if (dragonCount >= 2) {
                multiplier = 2;
                win = bet * 3;
            }
            
            // Special combinations
            if (reels.every(s => s === '💎')) {
                win = bet * 100;
                multiplier = 25;
            } else if (reels.filter(s => s === '👑').length >= 3) {
                win = bet * 15;
                multiplier = 3;
            }
            
            return { reels, multiplier, win };
        };

        return (
            <div className="container mx-auto px-4 py-8">
                <button onClick={onBack} className="btn-primary px-4 py-2 mb-6">
                    <div className="icon-arrow-left text-sm mr-2 inline-block"></div>
                    Voltar
                </button>

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-yellow-400 mb-2">🐉 Dragon Gold</h2>
                    {multiplierActive && (
                        <div className="bg-red-600 bg-opacity-20 border border-red-400 rounded-lg p-2 inline-block">
                            <span className="text-red-400 font-bold">
                                🔥 MULTIPLICADOR ATIVO: {currentMultiplier}x
                            </span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="game-card p-8 text-center">
                            <div className="flex justify-center space-x-2 mb-8">
                                {reels.map((symbol, index) => (
                                    <div 
                                        key={index}
                                        className={`w-20 h-20 bg-black bg-opacity-50 rounded-xl flex items-center justify-center text-3xl border-2 border-red-400 ${
                                            isSpinning ? 'spinning' : ''
                                        }`}
                                    >
                                        {symbol}
                                    </div>
                                ))}
                            </div>

                            {lastWin > 0 && (
                                <div className="bg-green-600 bg-opacity-20 border border-green-400 rounded-lg p-4 mb-6">
                                    <div className="text-2xl font-bold text-green-400">
                                        🎉 Ganhou R$ {lastWin.toFixed(2)}!
                                    </div>
                                    {currentMultiplier > 1 && (
                                        <div className="text-red-400">
                                            Multiplicador aumentou para {currentMultiplier}x!
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="flex items-center space-x-4 justify-center">
                                    <button 
                                        onClick={() => setBet(Math.max(5, bet - 5))}
                                        className="bg-red-600 hover:bg-red-700 w-10 h-10 rounded"
                                        disabled={bet <= 5}
                                    >
                                        -
                                    </button>
                                    <div className="bg-black bg-opacity-50 px-4 py-2 rounded border border-yellow-400">
                                        <span className="text-yellow-400 font-bold">R$ {bet}</span>
                                    </div>
                                    <button 
                                        onClick={() => setBet(Math.min(balance, bet + 5))}
                                        className="bg-green-600 hover:bg-green-700 w-10 h-10 rounded"
                                        disabled={bet >= balance}
                                    >
                                        +
                                    </button>
                                </div>

                                <button 
                                    onClick={spin}
                                    disabled={isSpinning || bet > balance}
                                    className="btn-gold w-full py-4 text-xl font-bold disabled:opacity-50"
                                >
                                    {isSpinning ? 'Girando...' : '🐉 DESPERTAR DRAGÃO'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <WalletBalance balance={balance} />
                        
                        <div className="game-card p-4 mt-6">
                            <h3 className="text-lg font-bold text-yellow-400 mb-3">Prêmios</h3>
                            <div className="text-sm text-gray-300 space-y-1">
                                <p>🐉🐉🐉🐉🐉 - 50x + 20x mult</p>
                                <p>🐉🐉🐉🐉 - 25x + 10x mult</p>
                                <p>🐉🐉🐉 - 10x + 5x mult</p>
                                <p>💎💎💎💎💎 - 100x + 25x mult</p>
                                <p>👑👑👑 - 15x + 3x mult</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('DragonGold error:', error);
        return null;
    }
}