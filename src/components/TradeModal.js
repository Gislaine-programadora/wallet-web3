function TradeModal({ isOpen, onClose, asset, marketData, onCreateTrade }) {
    try {
        const [amount, setAmount] = React.useState('');
        const [type, setType] = React.useState('buy');
        const [isProcessing, setIsProcessing] = React.useState(false);
        const [message, setMessage] = React.useState('');
        const [pixCode, setPixCode] = React.useState('');

        const assetData = marketData[asset];
        const total = amount && assetData ? (parseFloat(amount) * assetData.price).toFixed(2) : '0.00';

        const handleTrade = async (e) => {
            e.preventDefault();
            
            const value = parseFloat(amount);
            if (!value || value <= 0) {
                setMessage('Digite uma quantidade válida');
                return;
            }

            setIsProcessing(true);
            setMessage('Gerando código PIX para pagamento...');

            try {
                const result = await onCreateTrade(asset, value, type, assetData.price);
                if (result.success) {
                    setPixCode(result.pixCode);
                    setMessage('Código PIX gerado! Efetue o pagamento para confirmar a ordem.');
                } else {
                    setMessage(result.error || 'Erro ao criar ordem');
                }
            } catch (error) {
                setMessage('Erro ao processar trade');
            } finally {
                setIsProcessing(false);
            }
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="card-glass p-8 w-full max-w-md mx-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Trade {asset}</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white">
                            <div className="icon-x text-xl"></div>
                        </button>
                    </div>

                    {!pixCode ? (
                        <form onSubmit={handleTrade} className="space-y-4">
                            <div className="flex space-x-2 mb-4">
                                <button 
                                    type="button"
                                    className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                                        type === 'buy' ? 'btn-success' : 'bg-gray-800 bg-opacity-50 text-gray-400'
                                    }`}
                                    onClick={() => setType('buy')}
                                >
                                    Comprar
                                </button>
                                <button 
                                    type="button"
                                    className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                                        type === 'sell' ? 'btn-danger' : 'bg-gray-800 bg-opacity-50 text-gray-400'
                                    }`}
                                    onClick={() => setType('sell')}
                                >
                                    Vender
                                </button>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-white">
                                    Quantidade de {asset}
                                </label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full p-3 rounded-lg bg-gray-800 bg-opacity-50 border border-gray-600 text-white"
                                    placeholder="0.00"
                                    min="0"
                                    step="0.001"
                                    disabled={isProcessing}
                                    required
                                />
                            </div>

                            <div className="bg-blue-500 bg-opacity-20 p-4 rounded-lg">
                                <p className="text-sm text-blue-300">Preço: R$ {assetData?.price.toLocaleString()}</p>
                                <p className="text-lg font-bold text-white">Total: R$ {total}</p>
                            </div>

                            {message && !pixCode && (
                                <div className="p-3 rounded text-sm bg-blue-500 bg-opacity-20 text-blue-300">
                                    {isProcessing && (
                                        <div className="icon-loader-2 text-sm mr-2 animate-spin inline-block"></div>
                                    )}
                                    {message}
                                </div>
                            )}

                            <button 
                                type="submit" 
                                className="btn-primary w-full py-3 text-white font-semibold"
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Processando...' : `${type === 'buy' ? 'Comprar' : 'Vender'} ${asset}`}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center space-y-4">
                            <div className="bg-green-500 bg-opacity-20 p-4 rounded-lg">
                                <div className="icon-check-circle text-green-400 text-3xl mb-2"></div>
                                <p className="text-green-300 font-semibold">Ordem Criada!</p>
                            </div>

                            <div className="bg-yellow-500 bg-opacity-20 p-4 rounded-lg">
                                <p className="text-sm text-yellow-300 mb-2">Código PIX para Pagamento:</p>
                                <p className="font-mono text-lg font-bold text-white break-all">{pixCode}</p>
                                <p className="text-xs text-yellow-300 mt-2">
                                    Valor: R$ {total} | {type === 'buy' ? 'Compra' : 'Venda'} de {amount} {asset}
                                </p>
                            </div>

                            <button 
                                onClick={() => {
                                    onClose();
                                    setAmount('');
                                    setPixCode('');
                                    setMessage('');
                                }}
                                className="btn-primary w-full py-3 text-white font-semibold"
                            >
                                Fechar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('TradeModal component error:', error);
        return null;
    }
}