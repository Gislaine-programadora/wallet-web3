function WalletPanel({ user, marketData }) {
    try {
        const [portfolio, setPortfolio] = React.useState({});

        React.useEffect(() => {
            if (user?.objectData?.portfolio) {
                try {
                    setPortfolio(JSON.parse(user.objectData.portfolio));
                } catch (error) {
                    setPortfolio({});
                }
            }
        }, [user]);

        const totalValue = React.useMemo(() => {
            let total = user?.objectData?.balance || 0;
            Object.entries(portfolio).forEach(([symbol, amount]) => {
                const price = marketData[symbol + '/USDT']?.price || 0;
                total += amount * price;
            });
            return total;
        }, [portfolio, marketData, user]);

        return (
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-card rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-2">Total Balance</h3>
                        <p className="text-3xl font-bold text-green">${totalValue.toLocaleString()}</p>
                    </div>
                    
                    <div className="bg-card rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-2">Available Balance</h3>
                        <p className="text-2xl font-bold text-white">${user?.objectData?.balance?.toLocaleString()}</p>
                    </div>
                    
                    <div className="bg-card rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-2">Portfolio Value</h3>
                        <p className="text-2xl font-bold text-blue-400">
                            ${(totalValue - (user?.objectData?.balance || 0)).toLocaleString()}
                        </p>
                    </div>
                </div>

                <div className="bg-card rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Portfolio Holdings</h3>
                    
                    {Object.keys(portfolio).length === 0 ? (
                        <div className="text-center py-8">
                            <div className="icon-wallet text-4xl text-gray-400 mb-4"></div>
                            <p className="text-gray-400">No holdings yet. Start trading to build your portfolio!</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {Object.entries(portfolio).map(([symbol, amount]) => {
                                const price = marketData[symbol + '/USDT']?.price || 0;
                                const value = amount * price;
                                return (
                                    <div key={symbol} className="flex justify-between items-center p-3 bg-gray-800 rounded">
                                        <div>
                                            <div className="font-semibold text-white">{symbol}</div>
                                            <div className="text-sm text-gray-400">{amount.toFixed(6)} {symbol}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-semibold text-white">${value.toFixed(2)}</div>
                                            <div className="text-sm text-gray-400">${price.toFixed(2)}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('WalletPanel component error:', error);
        return null;
    }
}
