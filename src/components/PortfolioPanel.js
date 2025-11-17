function PortfolioPanel({ user, marketData }) {
    try {
        const [portfolio, setPortfolio] = React.useState({});
        const [performance, setPerformance] = React.useState(null);

        React.useEffect(() => {
            if (user?.objectData?.portfolio) {
                try {
                    const portfolioData = JSON.parse(user.objectData.portfolio);
                    setPortfolio(portfolioData);
                    calculatePerformance(portfolioData);
                } catch (error) {
                    setPortfolio({});
                }
            }
        }, [user, marketData]);

        const calculatePerformance = (portfolioData) => {
            let totalValue = user?.objectData?.balance || 0;
            let totalCost = 0;
            let positions = [];

            Object.entries(portfolioData).forEach(([symbol, data]) => {
                const currentPrice = marketData[symbol + '/USDT']?.price || 0;
                const currentValue = data.amount * currentPrice;
                const pnl = currentValue - data.cost;
                const pnlPercent = ((currentValue - data.cost) / data.cost) * 100;

                positions.push({
                    symbol,
                    amount: data.amount,
                    avgPrice: data.cost / data.amount,
                    currentPrice,
                    currentValue,
                    cost: data.cost,
                    pnl,
                    pnlPercent
                });

                totalValue += currentValue;
                totalCost += data.cost;
            });

            const totalPnL = totalValue - (user?.objectData?.balance || 0) - totalCost;
            const totalReturn = totalCost > 0 ? (totalPnL / totalCost) * 100 : 0;

            setPerformance({
                totalValue,
                totalPnL,
                totalReturn,
                positions
            });
        };

        if (!performance) {
            return (
                <div className="p-6">
                    <div className="text-center py-8">
                        <div className="icon-pie-chart text-4xl text-gray-400 mb-4"></div>
                        <p className="text-gray-400">Loading portfolio data...</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="p-6 space-y-6">
                <h2 className="text-2xl font-bold text-white">Portfolio Management</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-card rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-2">Total Portfolio Value</h3>
                        <p className="text-3xl font-bold text-white">${performance.totalValue.toLocaleString()}</p>
                        <div className="flex items-center mt-2">
                            <span className={`text-sm ${performance.totalPnL >= 0 ? 'text-green' : 'text-red'}`}>
                                {performance.totalPnL >= 0 ? '+' : ''}${performance.totalPnL.toFixed(2)}
                            </span>
                            <span className={`text-sm ml-2 ${performance.totalReturn >= 0 ? 'text-green' : 'text-red'}`}>
                                ({performance.totalReturn >= 0 ? '+' : ''}{performance.totalReturn.toFixed(2)}%)
                            </span>
                        </div>
                    </div>
                    
                    <div className="bg-card rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-2">Cash Balance</h3>
                        <p className="text-2xl font-bold text-green">${(user?.objectData?.balance || 0).toLocaleString()}</p>
                        <p className="text-sm text-gray-400 mt-2">Available for trading</p>
                    </div>
                    
                    <div className="bg-card rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-2">Active Positions</h3>
                        <p className="text-2xl font-bold text-blue-400">{performance.positions.length}</p>
                        <p className="text-sm text-gray-400 mt-2">Open positions</p>
                    </div>
                </div>

                <div className="bg-card rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Position Details</h3>
                    
                    {performance.positions.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="icon-trending-up text-4xl text-gray-400 mb-4"></div>
                            <p className="text-gray-400">No positions yet. Start trading to see your portfolio!</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-700">
                                        <th className="text-left py-3 text-gray-400">Asset</th>
                                        <th className="text-right py-3 text-gray-400">Amount</th>
                                        <th className="text-right py-3 text-gray-400">Avg Price</th>
                                        <th className="text-right py-3 text-gray-400">Current Price</th>
                                        <th className="text-right py-3 text-gray-400">Market Value</th>
                                        <th className="text-right py-3 text-gray-400">P&L</th>
                                        <th className="text-right py-3 text-gray-400">P&L %</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {performance.positions.map((position) => (
                                        <tr key={position.symbol} className="border-b border-gray-800">
                                            <td className="py-3 text-white font-medium">{position.symbol}</td>
                                            <td className="py-3 text-right text-white">
                                                {position.amount.toFixed(6)}
                                            </td>
                                            <td className="py-3 text-right text-white">
                                                ${position.avgPrice.toFixed(2)}
                                            </td>
                                            <td className="py-3 text-right text-white">
                                                ${position.currentPrice.toFixed(2)}
                                            </td>
                                            <td className="py-3 text-right text-white">
                                                ${position.currentValue.toFixed(2)}
                                            </td>
                                            <td className={`py-3 text-right ${position.pnl >= 0 ? 'text-green' : 'text-red'}`}>
                                                {position.pnl >= 0 ? '+' : ''}${position.pnl.toFixed(2)}
                                            </td>
                                            <td className={`py-3 text-right ${position.pnlPercent >= 0 ? 'text-green' : 'text-red'}`}>
                                                {position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent.toFixed(2)}%
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('PortfolioPanel component error:', error);
        return null;
    }
}