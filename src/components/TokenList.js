function TokenList({ onSelectToken }) {
    try {
        const [tokens, setTokens] = React.useState([]);

        React.useEffect(() => {
            try {
                const tokenList = [
                    {
                        symbol: 'CGB',
                        name: 'CoingBit',
                        decimals: 18,
                        currentPrice: 47632200,
                        priceChange: 46.0,
                        tradingPrice: 112.00,
                        minUnit: 0.00000000101
                    },
                    {
                        symbol: 'ETH',
                        name: 'Ethereum',
                        decimals: 18,
                        currentPrice: 2650.00,
                        priceChange: 2.3
                    },
                    {
                        symbol: 'USDT',
                        name: 'Tether USD',
                        decimals: 6,
                        currentPrice: 1.00,
                        priceChange: 0.1
                    },
                    {
                        symbol: 'USDC',
                        name: 'USD Coin',
                        decimals: 6,
                        currentPrice: 1.00,
                        priceChange: -0.05
                    }
                ];
                setTokens(tokenList);

                const interval = setInterval(() => {
                    try {
                        const updatedTokens = tokenList.map(token => ({
                            ...token,
                            currentPrice: token.currentPrice * (1 + (Math.random() - 0.5) * 0.02),
                            priceChange: (Math.random() - 0.5) * 10
                        }));
                        setTokens(updatedTokens);
                    } catch (error) {
                        console.error('Token update error:', error);
                    }
                }, 3000);

                return () => clearInterval(interval);
            } catch (error) {
                console.error('TokenList initialization error:', error);
            }
        }, []);

        return (
            <div className="card-glass p-6 m-4">
                <h3 className="text-xl font-bold text-white mb-6">Tokens Disponíveis</h3>
                
                <div className="space-y-3">
                    {tokens.map((token) => (
                        <div 
                            key={token.symbol}
                            className="bg-white bg-opacity-10 hover:bg-opacity-20 p-4 rounded-lg cursor-pointer transition-all"
                            onClick={() => onSelectToken && onSelectToken(token.symbol)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">{token.symbol}</span>
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold">{token.name}</div>
                                        <div className="text-gray-300 text-sm">{token.symbol}</div>
                                    </div>
                                </div>
                                
                                <div className="text-right">
                                    <div className="text-white font-bold">
                                        ${token.currentPrice.toLocaleString('en-US', { 
                                            minimumFractionDigits: token.symbol === 'CGB' ? 0 : 2,
                                            maximumFractionDigits: token.symbol === 'CGB' ? 0 : 6
                                        })}
                                    </div>
                                    <div className={`text-sm ${
                                        token.priceChange >= 0 ? 'text-green-400' : 'text-red-400'
                                    }`}>
                                        {token.priceChange >= 0 ? '+' : ''}{token.priceChange.toFixed(2)}%
                                    </div>
                                </div>
                            </div>
                            
                            {token.symbol === 'CGB' && (
                                <div className="mt-3 pt-3 border-t border-white border-opacity-20">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-300">Preço Trading:</span>
                                            <span className="text-white font-semibold ml-2">
                                                ${token.tradingPrice}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-300">Min. Unit:</span>
                                            <span className="text-white font-semibold ml-2">
                                                {token.minUnit}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('TokenList component error:', error);
        return null;
    }
}