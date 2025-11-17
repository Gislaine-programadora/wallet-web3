function TradingPanel({ wallet, onTrade }) {
    try {
        const [orderType, setOrderType] = React.useState('buy');
        const [amount, setAmount] = React.useState('');
        const [price, setPrice] = React.useState(112.00);
        const [selectedToken, setSelectedToken] = React.useState('CGB');
        const [message, setMessage] = React.useState('');

        const [currentPrice, setCurrentPrice] = React.useState(112.00);

        React.useEffect(() => {
            const updatePrice = () => {
                try {
                    const variation = (Math.random() - 0.5) * 0.02;
                    const newPrice = 112.00 * (1 + variation);
                    setCurrentPrice(newPrice);
                } catch (error) {
                    console.error('Price update error:', error);
                }
            };

            const interval = setInterval(updatePrice, 3000);
            return () => clearInterval(interval);
        }, [selectedToken]);
        const total = amount && price ? (parseFloat(amount) * parseFloat(price)).toFixed(2) : '0.00';

        const handleTrade = async () => {
            if (!wallet) {
                setMessage('Wallet não encontrada');
                return;
            }

            const tradeAmount = parseFloat(amount);
            const tradePrice = parseFloat(price);
            
            if (!tradeAmount || tradeAmount <= 0) {
                setMessage('Digite uma quantidade válida');
                return;
            }

            const tradeTotal = tradeAmount * tradePrice;

            if (orderType === 'buy' && wallet.objectData.usdBalance < tradeTotal) {
                setMessage('Saldo insuficiente em USD');
                return;
            }

            if (orderType === 'sell' && wallet.objectData.coingbitBalance < tradeAmount) {
                setMessage('Saldo insuficiente de CGB');
                return;
            }

            try {
                const success = await onTrade(orderType, tradeAmount, selectedToken, tradePrice);
                if (success) {
                    setMessage(`${orderType === 'buy' ? 'Compra' : 'Venda'} realizada com sucesso!`);
                    setAmount('');
                } else {
                    setMessage('Erro na operação');
                }
            } catch (error) {
                console.error('Trade error:', error);
                setMessage('Erro na operação');
            }

            setTimeout(() => setMessage(''), 3000);
        };

        return (
            <div className="card-glass p-6 m-4">
                <h3 className="text-xl font-bold text-white mb-6">Trading CoingBit</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <div className="flex mb-4">
                            <button 
                                className={`flex-1 py-3 text-center font-medium rounded-l-lg transition-all ${
                                    orderType === 'buy' 
                                        ? 'btn-success' 
                                        : 'bg-white bg-opacity-10 text-gray-300'
                                }`}
                                onClick={() => setOrderType('buy')}
                            >
                                <div className="icon-trending-up text-sm mr-2 inline-block"></div>
                                Comprar
                            </button>
                            <button 
                                className={`flex-1 py-3 text-center font-medium rounded-r-lg transition-all ${
                                    orderType === 'sell' 
                                        ? 'btn-danger' 
                                        : 'bg-white bg-opacity-10 text-gray-300'
                                }`}
                                onClick={() => setOrderType('sell')}
                            >
                                <div className="icon-trending-down text-sm mr-2 inline-block"></div>
                                Vender
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">Token</label>
                                <select 
                                    value={selectedToken}
                                    onChange={(e) => setSelectedToken(e.target.value)}
                                    className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg px-3 py-2 text-white"
                                >
                                    <option value="CGB">CoingBit (CGB)</option>
                                    <option value="ETH">Ethereum (ETH)</option>
                                    <option value="USDT">Tether (USDT)</option>
                                    <option value="USDC">USD Coin (USDC)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">Quantidade</label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg px-3 py-2 text-white placeholder-gray-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">Preço</label>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg px-3 py-2 text-white"
                                />
                            </div>

                            <div className="bg-blue-500 bg-opacity-20 p-4 rounded-lg">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-300">Total:</span>
                                    <span className="text-white font-bold">$ {total}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">Preço atual:</span>
                                    <span className="text-blue-300">$ {currentPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            <button 
                                onClick={handleTrade}
                                className="w-full btn-primary py-3 font-semibold"
                            >
                                {orderType === 'buy' ? 'Comprar' : 'Vender'} {selectedToken}
                            </button>

                            {message && (
                                <div className={`p-3 rounded-lg text-sm ${
                                    message.includes('sucesso') 
                                        ? 'bg-green-500 bg-opacity-20 text-green-300' 
                                        : 'bg-red-500 bg-opacity-20 text-red-300'
                                }`}>
                                    {message}
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Informações da Wallet</h4>
                        {wallet && (
                            <div className="space-y-3">
                                <div className="bg-white bg-opacity-10 p-3 rounded-lg">
                                    <div className="text-sm text-gray-300">Endereço</div>
                                    <div className="text-white font-mono text-sm">
                                        {wallet.objectData.address.substring(0, 10)}...
                                        {wallet.objectData.address.substring(32)}
                                    </div>
                                </div>
                                
                                <div className="bg-white bg-opacity-10 p-3 rounded-lg">
                                    <div className="text-sm text-gray-300">Saldo CGB</div>
                                    <div className="text-white font-bold">
                                        {wallet.objectData.coingbitBalance.toLocaleString('pt-BR')} CGB
                                    </div>
                                </div>
                                
                                <div className="bg-white bg-opacity-10 p-3 rounded-lg">
                                    <div className="text-sm text-gray-300">Saldo USD</div>
                                    <div className="text-white font-bold">
                                        $ {wallet.objectData.usdBalance.toLocaleString('en-US')}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('TradingPanel component error:', error);
        return null;
    }
}
