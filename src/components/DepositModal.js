function DepositModal({ isOpen, onClose, onDeposit }) {
    try {
        const [amount, setAmount] = React.useState('');
        const [pixCode, setPixCode] = React.useState('');
        const [isGenerating, setIsGenerating] = React.useState(false);

        const quickAmounts = [50, 100, 200, 500, 1000];

        const generatePix = async () => {
            if (!amount || parseFloat(amount) < 10) {
                alert('Valor mínimo: R$ 10');
                return;
            }

            setIsGenerating(true);
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const code = `00020126580014BR.GOV.BCB.PIX0136${Date.now()}5204000053039865802BR5925FORTUNE TIGER LTDA6009SAO PAULO62070503***6304${Math.random().toString(16).substr(2, 4).toUpperCase()}`;
            setPixCode(code);
            setIsGenerating(false);
        };

        const confirmDeposit = () => {
            onDeposit(parseFloat(amount));
            setAmount('');
            setPixCode('');
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="game-card p-8 w-full max-w-md mx-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-yellow-400">💰 Depósito PIX</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white">
                            <div className="icon-x text-xl"></div>
                        </button>
                    </div>

                    {!pixCode ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-yellow-400">
                                    Valor (R$)
                                </label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Mínimo R$ 10"
                                    className="w-full bg-black bg-opacity-50 border border-yellow-400 rounded-lg px-4 py-3 text-white"
                                    min="10"
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                {quickAmounts.map(value => (
                                    <button
                                        key={value}
                                        onClick={() => setAmount(value.toString())}
                                        className="py-2 px-3 rounded text-sm font-medium bg-black bg-opacity-30 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors"
                                    >
                                        R$ {value}
                                    </button>
                                ))}
                            </div>

                            <button 
                                onClick={generatePix}
                                disabled={isGenerating || !amount}
                                className="btn-gold w-full py-3 font-bold"
                            >
                                {isGenerating ? 'Gerando PIX...' : '📱 Gerar PIX'}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4 text-center">
                            <div className="bg-green-600 bg-opacity-20 p-4 rounded-lg">
                                <div className="text-green-400 font-bold">PIX Gerado!</div>
                                <div className="text-sm">Valor: R$ {parseFloat(amount).toFixed(2)}</div>
                            </div>

                            <div className="bg-black bg-opacity-50 p-3 rounded-lg">
                                <div className="text-xs text-gray-400 mb-2">Código PIX:</div>
                                <div className="font-mono text-xs break-all text-white">
                                    {pixCode}
                                </div>
                            </div>

                            <button 
                                onClick={confirmDeposit}
                                className="btn-success w-full py-3 font-bold"
                            >
                                ✅ Confirmar Pagamento
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('DepositModal error:', error);
        return null;
    }
}