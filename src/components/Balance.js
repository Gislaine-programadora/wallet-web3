function Balance({ balance, cryptoBalance }) {
    try {
        return (
            <div data-name="balance-container" className="balance-card rounded-lg p-6 m-6">
                <div data-name="fiat-balance" className="mb-4">
                    <h2 className="text-lg text-gray-300">Available Balance</h2>
                    <p className="text-3xl font-bold">R$ {balance.toFixed(2)}</p>
                </div>
                {cryptoBalance > 0 && (
                    <div data-name="crypto-balance" className="mt-2">
                        <h3 className="text-sm text-gray-300">ETH Balance</h3>
                        <p className="text-xl font-semibold">{cryptoBalance.toFixed(6)} ETH</p>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('Balance component error:', error);
        reportError(error);
        return null;
    }
}
