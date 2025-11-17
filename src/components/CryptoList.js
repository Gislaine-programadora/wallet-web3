function CryptoList({ onSelect, selectedCrypto }) {
    try {
        const cryptos = [
            { id: 'ETH', name: 'Ethereum', icon: 'fab fa-ethereum' },
            { id: 'BTC', name: 'Bitcoin', icon: 'fab fa-bitcoin' },
            { id: 'BNB', name: 'Binance Coin', icon: 'fas fa-coins' }
        ];

        return (
            <div data-name="crypto-list" className="grid grid-cols-3 gap-4 m-6">
                {cryptos.map(crypto => (
                    <div
                        key={crypto.id}
                        data-name={`crypto-card-${crypto.id}`}
                        className={`crypto-card p-4 rounded-lg cursor-pointer ${
                            selectedCrypto === crypto.id ? 'ring-2 ring-blue-500' : ''
                        }`}
                        onClick={() => onSelect(crypto.id)}
                    >
                        <i className={`${crypto.icon} text-2xl mb-2`}></i>
                        <h3 className="text-lg font-semibold">{crypto.name}</h3>
                        <p className="text-sm text-gray-400">{crypto.id}</p>
                    </div>
                ))}
            </div>
        );
    } catch (error) {
        console.error('CryptoList component error:', error);
        reportError(error);
        return null;
    }
}
