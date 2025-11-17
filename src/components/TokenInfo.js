function TokenInfo({ tokenInfo }) {
    try {
        return (
            <div data-name="token-info" className="token-info">
                <div data-name="token-header" className="flex items-center justify-between mb-6">
                    <div data-name="token-logo" className="token-logo flex items-center justify-center">
                        <span className="text-2xl font-bold">BYT</span>
                    </div>
                    <div data-name="token-name" className="text-right">
                        <h1 className="text-3xl font-bold">Coingbit</h1>
                        <p className="text-blue-300">BYT</p>
                    </div>
                </div>

                <div data-name="token-stats" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div data-name="price-info" className="token-stats">
                        <h3 className="text-sm text-blue-300">Current Price</h3>
                        <p className="token-price">${tokenInfo.price.toLocaleString()}</p>
                        <p className="text-sm text-blue-300">Trading Price: ${tokenInfo.tradingPrice}</p>
                    </div>

                    <div data-name="supply-info" className="token-stats">
                        <h3 className="text-sm text-blue-300">Token Supply</h3>
                        <p className="text-xl font-bold">{tokenInfo.totalSupply.toLocaleString()}</p>
                        <p className="text-sm text-blue-300">Available: {tokenInfo.availableSupply.toLocaleString()}</p>
                    </div>

                    <div data-name="gas-info" className="token-stats">
                        <h3 className="text-sm text-blue-300">Gas Balance</h3>
                        <p className="text-xl font-bold">{tokenInfo.gasBalance.toLocaleString()}</p>
                        <p className="text-sm text-blue-300">Wei: {tokenInfo.weiBalance}</p>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('TokenInfo component error:', error);
        reportError(error);
        return null;
    }
}
