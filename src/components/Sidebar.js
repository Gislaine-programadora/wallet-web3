function Sidebar({ selectedPair, onPairSelect, marketData }) {
    try {
        return (
            <div className="w-80 bg-dark-secondary border-r border-gray-800 p-4">
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-white">Markets</h3>
                        <div className="icon-search text-gray-400"></div>
                    </div>
                    
                    <div className="flex space-x-2 mb-4">
                        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded">USDT</button>
                        <button className="px-3 py-1 text-gray-400 text-sm">BTC</button>
                        <button className="px-3 py-1 text-gray-400 text-sm">ETH</button>
                    </div>
                </div>
                
                <div className="space-y-1">
                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 mb-2 px-2">
                        <span>Pair</span>
                        <span className="text-right">Price</span>
                        <span className="text-right">Change</span>
                    </div>
                    
                    {Object.values(marketData).map((pair) => (
                        <div
                            key={pair.symbol}
                            className={`grid grid-cols-3 gap-2 p-2 rounded cursor-pointer hover:bg-gray-800 ${
                                selectedPair === pair.symbol ? 'bg-gray-800' : ''
                            }`}
                            onClick={() => onPairSelect(pair.symbol)}
                        >
                            <div>
                                <div className="text-white text-sm font-medium">{pair.symbol.split('/')[0]}</div>
                                <div className="text-gray-400 text-xs">{pair.symbol.split('/')[1]}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-white text-sm">{pair.price.toFixed(2)}</div>
                                <div className="text-gray-400 text-xs">{pair.volume}</div>
                            </div>
                            <div className="text-right">
                                <span className={`text-sm ${pair.change >= 0 ? 'text-green' : 'text-red'}`}>
                                    {pair.change >= 0 ? '+' : ''}{pair.change.toFixed(2)}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Sidebar component error:', error);
        return null;
    }
}