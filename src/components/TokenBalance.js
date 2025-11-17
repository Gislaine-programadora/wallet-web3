function TokenBalance({ wallet }) {
    try {
        const [balances, setBalances] = React.useState({});
        const [loading, setLoading] = React.useState(true);

        React.useEffect(() => {
            loadBalances();
        }, [wallet]);

        const loadBalances = async () => {
            try {
                setLoading(true);
                const ethBalance = await getETHBalance(wallet.address);
                const tokens = getStoredTokens(wallet.address);
                
                const tokenBalances = {};
                for (const token of tokens) {
                    const balance = await getTokenBalance(wallet.address, token.address);
                    tokenBalances[token.address] = { ...token, balance };
                }

                setBalances({
                    ETH: { symbol: 'ETH', name: 'Ethereum', balance: ethBalance, decimals: 18 },
                    ...tokenBalances
                });
            } catch (error) {
                console.error('Error loading balances:', error);
            } finally {
                setLoading(false);
            }
        };

        if (loading) {
            return (
                <div className="glass-card p-6">
                    <div className="animate-pulse">
                        <div className="h-4 bg-white bg-opacity-20 rounded mb-4"></div>
                        <div className="space-y-3">
                            <div className="h-16 bg-white bg-opacity-10 rounded"></div>
                            <div className="h-16 bg-white bg-opacity-10 rounded"></div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-4">Saldos dos Tokens</h2>
                <div className="space-y-3">
                    {Object.values(balances).map((token, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-black bg-opacity-20 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">
                                        {token.symbol.slice(0, 2)}
                                    </span>
                                </div>
                                <div>
                                    <div className="font-semibold">{token.symbol}</div>
                                    <div className="text-sm text-gray-300">{token.name}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-semibold">
                                    {parseFloat(token.balance).toFixed(6)}
                                </div>
                                <div className="text-sm text-gray-300">{token.symbol}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={loadBalances}
                    className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                    <div className="icon-refresh-cw"></div>
                    <span>Atualizar Saldos</span>
                </button>
            </div>
        );
    } catch (error) {
        console.error('TokenBalance error:', error);
        return null;
    }
}