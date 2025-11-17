function PriceWidget() {
    try {
        const [prices, setPrices] = React.useState({});
        const [loading, setLoading] = React.useState(true);

        React.useEffect(() => {
            loadPrices();
            const interval = setInterval(loadPrices, 30000); // Update every 30 seconds
            return () => clearInterval(interval);
        }, []);

        const loadPrices = async () => {
            try {
                const cryptoPrices = await getCurrentPrices();
                setPrices(cryptoPrices);
            } catch (error) {
                console.error('Error loading prices:', error);
            } finally {
                setLoading(false);
            }
        };

        const formatPrice = (price) => {
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2
            }).format(price);
        };

        const getPriceColor = (change) => {
            return change >= 0 ? 'text-green-400' : 'text-red-400';
        };

        if (loading) {
            return (
                <div className="price-widget rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4 text-white">Cotações</h3>
                    <div className="animate-pulse space-y-3">
                        <div className="h-12 bg-white bg-opacity-10 rounded"></div>
                        <div className="h-12 bg-white bg-opacity-10 rounded"></div>
                        <div className="h-12 bg-white bg-opacity-10 rounded"></div>
                    </div>
                </div>
            );
        }

        return (
            <div className="price-widget rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Cotações</h3>
                    <button 
                        onClick={loadPrices}
                        className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
                    >
                        <div className="icon-refresh-cw text-white text-sm"></div>
                    </button>
                </div>

                <div className="space-y-3">
                    {Object.entries(prices).map(([symbol, data]) => (
                        <div key={symbol} className="flex items-center justify-between p-3 bg-white bg-opacity-5 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-xs">
                                        {symbol}
                                    </span>
                                </div>
                                <div>
                                    <div className="font-semibold text-white text-sm">{symbol}</div>
                                    <div className="text-xs text-gray-400">{data.name}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-semibold text-white text-sm">
                                    {formatPrice(data.price)}
                                </div>
                                <div className={`text-xs ${getPriceColor(data.change)}`}>
                                    {data.change >= 0 ? '+' : ''}{data.change.toFixed(2)}%
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 text-xs text-gray-400 text-center">
                    Última atualização: {new Date().toLocaleTimeString('pt-BR')}
                </div>
            </div>
        );
    } catch (error) {
        console.error('PriceWidget error:', error);
        return null;
    }
}