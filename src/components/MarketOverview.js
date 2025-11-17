function MarketOverview({ marketData }) {
    try {
        const btcData = marketData['BTC/USDT'];
        
        return (
            <div className="bg-dark-secondary border-b border-gray-800 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-1">
                                <span className="text-white text-lg font-semibold">BTC/USDT</span>
                                <span className={`text-sm px-2 py-1 rounded ${
                                    btcData.change >= 0 ? 'bg-green-900 text-green' : 'bg-red-900 text-red'
                                }`}>
                                    {btcData.change >= 0 ? '+' : ''}{btcData.change.toFixed(2)}%
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-white">
                                ${btcData.price.toLocaleString()}
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-8 text-sm">
                            <div>
                                <div className="text-gray-400">24h High</div>
                                <div className="text-white font-medium">${btcData.high24h.toLocaleString()}</div>
                            </div>
                            <div>
                                <div className="text-gray-400">24h Low</div>
                                <div className="text-white font-medium">${btcData.low24h.toLocaleString()}</div>
                            </div>
                            <div>
                                <div className="text-gray-400">24h Volume</div>
                                <div className="text-white font-medium">{btcData.volume}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded">1m</button>
                        <button className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded">5m</button>
                        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded">15m</button>
                        <button className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded">1h</button>
                        <button className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded">4h</button>
                        <button className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded">1d</button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('MarketOverview component error:', error);
        return null;
    }
}