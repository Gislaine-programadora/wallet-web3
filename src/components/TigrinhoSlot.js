function TigrinhoSlot({ balance, onUpdateBalance, onBack }) {
    try {
        const [reels, setReels] = React.useState([
            ['💰', 'WILD', '💎'],
            ['🐅', 'WILD', '🐅'],
            ['💰', 'WILD', '🎁']
        ]);
        const [isSpinning, setIsSpinning] = React.useState(false);
        const [bet, setBet] = React.useState(3.00);
        const [lastWin, setLastWin] = React.useState(0);
        const [totalBalance, setTotalBalance] = React.useState(100000.00);

        const symbols = ['🐅', '💰', '💎', '🎁', '🍀', 'WILD', '⭐'];
        
        const spin = async () => {
            if (bet > balance) {
                alert('Saldo insuficiente!');
                return;
            }

            setIsSpinning(true);
            onUpdateBalance(balance - bet);
            
            // Spinning animation
            for (let i = 0; i < 15; i++) {
                const newReels = Array.from({length: 3}, () => 
                    Array.from({length: 3}, () => 
                        symbols[Math.floor(Math.random() * symbols.length)]
                    )
                );
                setReels(newReels);
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            
            const result = generateTigerResult();
            setReels(result.reels);
            
            if (result.win > 0) {
                setLastWin(result.win);
                onUpdateBalance(balance - bet + result.win);
                
                if (result.win >= bet * 10) {
                    setTimeout(() => {
                        alert(`🎉 BIG WIN! R$ ${result.win.toFixed(2)}!`);
                    }, 500);
                }
            } else {
                setLastWin(0);
            }
            
            setIsSpinning(false);
        };

        const generateTigerResult = () => {
            const newReels = Array.from({length: 3}, () => 
                Array.from({length: 3}, () => 
                    symbols[Math.floor(Math.random() * symbols.length)]
                )
            );
            
            let win = 0;
            
            // Check for winning patterns
            for (let row = 0; row < 3; row++) {
                const line = [newReels[0][row], newReels[1][row], newReels[2][row]];
                
                // Three tigers
                if (line.every(s => s === '🐅')) {
                    win += bet * 20;
                }
                // Three wilds or tigers with wilds
                else if (line.filter(s => s === 'WILD' || s === '🐅').length === 3) {
                    win += bet * 15;
                }
                // Three of any other symbol
                else if (line[0] === line[1] && line[1] === line[2] && line[0] !== 'WILD') {
                    const multipliers = { '💰': 10, '💎': 8, '🎁': 6, '🍀': 4, '⭐': 3 };
                    win += bet * (multipliers[line[0]] || 2);
                }
                // Two tigers
                else if (line.filter(s => s === '🐅').length === 2) {
                    win += bet * 3;
                }
            }
            
            // Diagonal wins
            const diag1 = [newReels[0][0], newReels[1][1], newReels[2][2]];
            const diag2 = [newReels[0][2], newReels[1][1], newReels[2][0]];
            
            [diag1, diag2].forEach(line => {
                if (line.every(s => s === '🐅')) {
                    win += bet * 25;
                } else if (line.filter(s => s === '🐅' || s === 'WILD').length === 3) {
                    win += bet * 12;
                }
            });
            
            return { reels: newReels, win };
        };

        return (
            <div className="min-h-screen bg-gradient-to-b from-purple-900 via-red-800 to-orange-600 relative">
                {/* Decorative background */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 left-10 text-6xl animate-pulse">🏮</div>
                    <div className="absolute top-20 right-10 text-4xl animate-bounce">🎊</div>
                    <div className="absolute bottom-20 left-20 text-5xl animate-pulse">🎆</div>
                </div>
                
                <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
                    <button onClick={onBack} className="absolute top-4 left-4 btn-primary px-4 py-2">
                        <div className="icon-arrow-left text-sm mr-2 inline-block"></div>
                        Voltar
                    </button>

                    {/* Game Container - Vertical Mobile Style */}
                    <div className="w-full max-w-sm mx-auto">
                        {/* Header with decorative frame */}
                        <div className="bg-gradient-to-b from-yellow-400 to-orange-500 rounded-t-3xl p-4 border-4 border-yellow-300">
                            <div className="text-center">
                                <div className="flex items-center justify-center space-x-2 mb-2">
                                    <div className="text-2xl">🏮</div>
                                    <h1 className="text-xl font-bold text-red-800">Fortune Tiger</h1>
                                    <div className="text-2xl">🏮</div>
                                </div>
                                <div className="text-xs text-red-700 font-medium">Cai Jin Máo Mán Kāi Huā Fù Guì!</div>
                            </div>
                        </div>

                        {/* Game Board */}
                        <div className="bg-gradient-to-b from-red-700 to-red-900 p-6 border-4 border-yellow-300 border-t-0">
                            {/* Win Display */}
                            {lastWin > 0 && (
                                <div className="bg-yellow-400 text-red-800 text-center py-2 rounded-lg mb-4 animate-pulse border-2 border-yellow-300">
                                    <div className="font-bold">🎉 GANHOU R$ {lastWin.toFixed(2)} 🎉</div>
                                </div>
                            )}
                            
                            {/* Reels - 3x3 Grid */}
                            <div className="grid grid-cols-3 gap-1 mb-6 p-2 bg-black bg-opacity-30 rounded-lg">
                                {reels.map((reel, reelIndex) => (
                                    <div key={reelIndex} className="space-y-1">
                                        {reel.map((symbol, symbolIndex) => (
                                            <div 
                                                key={`${reelIndex}-${symbolIndex}`}
                                                className={`aspect-square bg-gradient-to-b from-yellow-100 to-white rounded-lg flex items-center justify-center text-lg font-bold border-2 border-yellow-400 shadow-lg ${
                                                    isSpinning ? 'animate-spin' : ''
                                                }`}
                                            >
                                                {symbol === 'WILD' ? (
                                                    <div className="text-red-600 text-xs font-black">WILD</div>
                                                ) : (
                                                    <div>{symbol}</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            {/* Balance Display */}
                            <div className="bg-black bg-opacity-50 rounded-lg p-3 mb-4 text-white text-center">
                                <div className="text-xs text-yellow-300">Saldo</div>
                                <div className="text-lg font-bold">{totalBalance.toFixed(2)}</div>
                            </div>

                            {/* Bet Controls */}
                            <div className="bg-black bg-opacity-50 rounded-lg p-3 mb-4">
                                <div className="text-white text-xs mb-2 text-center">Aposta</div>
                                <div className="flex items-center justify-center space-x-3">
                                    <button 
                                        onClick={() => setBet(Math.max(1, bet - 0.5))}
                                        className="bg-red-600 hover:bg-red-700 w-8 h-8 rounded-full text-white font-bold text-sm"
                                    >
                                        -
                                    </button>
                                    <div className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold min-w-16 text-center">
                                        {bet.toFixed(2)}
                                    </div>
                                    <button 
                                        onClick={() => setBet(Math.min(balance, bet + 0.5))}
                                        className="bg-green-600 hover:bg-green-700 w-8 h-8 rounded-full text-white font-bold text-sm"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Spin Button */}
                            <button 
                                onClick={spin}
                                disabled={isSpinning || bet > balance}
                                className="w-full bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl text-lg shadow-lg transform transition hover:scale-105 border-2 border-green-300"
                            >
                                {isSpinning ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin mr-2">🎰</div>
                                        GIRANDO...
                                    </div>
                                ) : (
                                    '🎰 GIRAR'
                                )}
                            </button>
                        </div>

                        {/* Bottom decorative frame */}
                        <div className="bg-gradient-to-b from-orange-500 to-yellow-400 rounded-b-3xl p-2 border-4 border-yellow-300 border-t-0">
                            <div className="text-center text-xs text-red-800 font-medium">
                                💰 Boa Sorte! 💰
                            </div>
                        </div>
                    </div>

                    {/* Paytable */}
                    <div className="mt-6 bg-black bg-opacity-70 rounded-xl p-4 text-white max-w-sm w-full">
                        <h3 className="text-sm font-bold mb-2 text-yellow-400 text-center">💰 Prêmios</h3>
                        <div className="grid grid-cols-2 gap-1 text-xs">
                            <div>🐅🐅🐅 = 20x</div>
                            <div>💰💰💰 = 10x</div>
                            <div>💎💎💎 = 8x</div>
                            <div>🎁🎁🎁 = 6x</div>
                            <div>WILD = Substitui</div>
                            <div>🐅🐅 = 3x</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('TigrinhoSlot component error:', error);
        return null;
    }
}
