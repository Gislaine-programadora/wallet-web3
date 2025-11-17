function TigrinhoCards({ balance, onUpdateBalance, onBack }) {
    try {
        const [cards, setCards] = React.useState([]);
        const [selectedCards, setSelectedCards] = React.useState([]);
        const [bet, setBet] = React.useState(10);
        const [isPlaying, setIsPlaying] = React.useState(false);
        const [gameResult, setGameResult] = React.useState(null);
        const [multiplier, setMultiplier] = React.useState(1);

        const cardValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const targetSum = 21;

        const startNewGame = () => {
            if (bet > balance) {
                alert('Saldo insuficiente!');
                return;
            }

            onUpdateBalance(balance - bet);
            setIsPlaying(true);
            setSelectedCards([]);
            setGameResult(null);
            
            // Generate random cards
            const newCards = Array.from({ length: 12 }, (_, index) => ({
                id: index,
                value: cardValues[Math.floor(Math.random() * cardValues.length)],
                isRevealed: false,
                isSelected: false
            }));
            
            setCards(newCards);
        };

        const selectCard = (cardId) => {
            if (!isPlaying || gameResult) return;

            const card = cards.find(c => c.id === cardId);
            if (card.isRevealed) return;

            const newCards = cards.map(c => 
                c.id === cardId ? { ...c, isRevealed: true, isSelected: true } : c
            );
            setCards(newCards);

            const newSelectedCards = [...selectedCards, card.value];
            setSelectedCards(newSelectedCards);

            const sum = newSelectedCards.reduce((a, b) => a + b, 0);
            
            if (sum === targetSum) {
                // Perfect win!
                const winMultiplier = 10 + newSelectedCards.length;
                const winAmount = bet * winMultiplier;
                setMultiplier(winMultiplier);
                setGameResult({ type: 'perfect', amount: winAmount });
                onUpdateBalance(balance - bet + winAmount);
                setIsPlaying(false);
            } else if (sum > targetSum) {
                // Bust
                setGameResult({ type: 'bust', amount: 0 });
                setIsPlaying(false);
            } else if (newSelectedCards.length >= 5) {
                // Max cards reached
                const winMultiplier = Math.max(2, Math.floor(sum / 3));
                const winAmount = bet * winMultiplier;
                setMultiplier(winMultiplier);
                setGameResult({ type: 'maxcards', amount: winAmount });
                onUpdateBalance(balance - bet + winAmount);
                setIsPlaying(false);
            }
        };

        const cashOut = () => {
            if (!isPlaying || selectedCards.length === 0) return;

            const sum = selectedCards.reduce((a, b) => a + b, 0);
            const winMultiplier = Math.max(1.5, sum / 10);
            const winAmount = bet * winMultiplier;
            setMultiplier(winMultiplier);
            setGameResult({ type: 'cashout', amount: winAmount });
            onUpdateBalance(balance - bet + winAmount);
            setIsPlaying(false);
        };

        const currentSum = selectedCards.reduce((a, b) => a + b, 0);

        return (
            <div className="container mx-auto px-4 py-8">
                <button onClick={onBack} className="btn-primary px-4 py-2 mb-6">
                    <div className="icon-arrow-left text-sm mr-2 inline-block"></div>
                    Voltar
                </button>

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-yellow-400 mb-2">🃏 Tigrinho Cards</h2>
                    <p className="text-gray-300">Escolha cartas para somar exatamente 21 pontos!</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="game-card p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div className="text-lg">
                                    <span className="text-yellow-400">Soma atual: </span>
                                    <span className={`font-bold ${currentSum > targetSum ? 'text-red-400' : 'text-green-400'}`}>
                                        {currentSum}
                                    </span>
                                    <span className="text-gray-400"> / {targetSum}</span>
                                </div>
                                <div className="text-sm text-gray-400">
                                    Cartas: {selectedCards.length}/5
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-3 mb-6">
                                {cards.map((card) => (
                                    <div
                                        key={card.id}
                                        onClick={() => selectCard(card.id)}
                                        className={`aspect-square rounded-lg border-2 flex items-center justify-center text-xl font-bold cursor-pointer transition-all ${
                                            card.isRevealed
                                                ? card.isSelected
                                                    ? 'bg-yellow-400 border-yellow-300 text-black'
                                                    : 'bg-gray-600 border-gray-500 text-white'
                                                : 'bg-blue-600 border-blue-400 text-white hover:bg-blue-500'
                                        } ${!isPlaying || gameResult ? 'cursor-not-allowed opacity-50' : ''}`}
                                    >
                                        {card.isRevealed ? card.value : '🃏'}
                                    </div>
                                ))}
                            </div>

                            {gameResult && (
                                <div className={`p-4 rounded-lg mb-4 ${
                                    gameResult.type === 'perfect' ? 'bg-green-600' :
                                    gameResult.type === 'bust' ? 'bg-red-600' : 'bg-blue-600'
                                } bg-opacity-20 border ${
                                    gameResult.type === 'perfect' ? 'border-green-400' :
                                    gameResult.type === 'bust' ? 'border-red-400' : 'border-blue-400'
                                }`}>
                                    <div className="text-center">
                                        {gameResult.type === 'perfect' && (
                                            <>
                                                <div className="text-2xl font-bold text-green-400 mb-2">
                                                    🎉 PERFEITO! 🎉
                                                </div>
                                                <div className="text-green-300">
                                                    Você fez exatamente 21! Multiplicador {multiplier}x
                                                </div>
                                            </>
                                        )}
                                        {gameResult.type === 'bust' && (
                                            <>
                                                <div className="text-2xl font-bold text-red-400 mb-2">
                                                    💥 ESTOUROU!
                                                </div>
                                                <div className="text-red-300">
                                                    Passou de 21 pontos
                                                </div>
                                            </>
                                        )}
                                        {(gameResult.type === 'cashout' || gameResult.type === 'maxcards') && (
                                            <>
                                                <div className="text-2xl font-bold text-blue-400 mb-2">
                                                    💰 GANHOU!
                                                </div>
                                                <div className="text-blue-300">
                                                    Multiplicador {multiplier.toFixed(1)}x
                                                </div>
                                            </>
                                        )}
                                        {gameResult.amount > 0 && (
                                            <div className="text-xl font-bold text-yellow-400 mt-2">
                                                +R$ {gameResult.amount.toFixed(2)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="flex space-x-4">
                                {!isPlaying ? (
                                    <div className="space-y-4 w-full">
                                        <div className="flex items-center space-x-4">
                                            <label className="text-yellow-400">Aposta:</label>
                                            <input
                                                type="number"
                                                value={bet}
                                                onChange={(e) => setBet(Math.max(5, parseInt(e.target.value) || 5))}
                                                className="bg-black bg-opacity-50 border border-yellow-400 rounded px-3 py-2 text-white"
                                                min="5"
                                                max={balance}
                                            />
                                        </div>
                                        <button
                                            onClick={startNewGame}
                                            className="btn-gold w-full py-3 text-lg font-bold"
                                        >
                                            🃏 Novo Jogo
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={cashOut}
                                        disabled={selectedCards.length === 0 || currentSum > targetSum}
                                        className="btn-success w-full py-3 font-bold disabled:opacity-50"
                                    >
                                        💰 Retirar ({(bet * Math.max(1.5, currentSum / 10)).toFixed(2)})
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                        <WalletBalance balance={balance} />
                        
                        <div className="game-card p-4 mt-6">
                            <h3 className="text-lg font-bold text-yellow-400 mb-3">Como Jogar</h3>
                            <div className="text-sm text-gray-300 space-y-2">
                                <p>• Clique nas cartas para revelá-las</p>
                                <p>• Tente somar exatamente 21 pontos</p>
                                <p>• 21 exato = multiplicador 10x+</p>
                                <p>• Retire antes de estourar</p>
                                <p>• Máximo 5 cartas por rodada</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('TigrinhoCards error:', error);
        return null;
    }
}