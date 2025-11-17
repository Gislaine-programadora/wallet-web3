function OrderBook({ selectedPair }) {
    try {
        const asks = [
            { price: 43285.50, amount: 0.125, total: 5410.69 },
            { price: 43280.25, amount: 0.089, total: 3851.94 },
            { price: 43275.00, amount: 0.234, total: 10122.35 },
            { price: 43270.75, amount: 0.156, total: 6750.24 },
            { price: 43265.50, amount: 0.078, total: 3374.71 }
        ];

        const bids = [
            { price: 43260.25, amount: 0.145, total: 6272.74 },
            { price: 43255.00, amount: 0.198, total: 8564.49 },
            { price: 43250.75, amount: 0.167, total: 7222.88 },
            { price: 43245.50, amount: 0.234, total: 10119.45 },
            { price: 43240.25, amount: 0.089, total: 3848.38 }
        ];

        return (
            <div className="bg-card rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold">Order Book</h3>
                    <div className="flex space-x-2">
                        <button className="p-1 text-gray-400 hover:text-white">
                            <div className="icon-settings"></div>
                        </button>
                    </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 mb-2">
                    <span>Price(USDT)</span>
                    <span className="text-right">Amount(BTC)</span>
                    <span className="text-right">Total</span>
                </div>
                
                <div className="space-y-1 mb-4">
                    {asks.reverse().map((ask, index) => (
                        <div key={index} className="grid grid-cols-3 gap-2 text-xs">
                            <span className="text-red">{ask.price.toFixed(2)}</span>
                            <span className="text-gray-300 text-right">{ask.amount.toFixed(3)}</span>
                            <span className="text-gray-300 text-right">{ask.total.toFixed(2)}</span>
                        </div>
                    ))}
                </div>
                
                <div className="text-center py-2 border-y border-gray-700">
                    <span className="text-green font-medium">43,247.82</span>
                    <span className="text-gray-400 text-sm ml-2">≈ $43,247.82</span>
                </div>
                
                <div className="space-y-1 mt-4">
                    {bids.map((bid, index) => (
                        <div key={index} className="grid grid-cols-3 gap-2 text-xs">
                            <span className="text-green">{bid.price.toFixed(2)}</span>
                            <span className="text-gray-300 text-right">{bid.amount.toFixed(3)}</span>
                            <span className="text-gray-300 text-right">{bid.total.toFixed(2)}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('OrderBook component error:', error);
        return null;
    }
}