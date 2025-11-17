function PriceCards({ marketData, selectedAsset }) {
    try {
        const asset = marketData[selectedAsset];
        if (!asset) return null;

        const priceCards = [
            { 
                label: 'Netll Fred',
                subtitle: 'Apoll Calins',
                value: asset.price.toFixed(4),
                status: 'Delest',
                color: 'orange'
            },
            {
                label: 'Google',
                subtitle: 'Iral',
                value: '64',
                status: 'Say Trade 20',
                color: 'yellow'
            },
            {
                label: 'Fice Cisad',
                subtitle: 'Sydees',
                value: '165',
                status: 'Sell Takets 20',
                color: 'pink'
            },
            {
                label: 'Buy/Prices',
                subtitle: '',
                value: '110.35',
                change: '1,363%',
                status: 'Crypt def 20',
                color: 'green'
            }
        ];

        return (
            <div className="grid grid-cols-4 gap-4 p-4">
                {priceCards.map((card, index) => (
                    <div key={index} className="card-glass p-4">
                        <div className="mb-3">
                            <h3 className="text-sm font-semibold text-white">{card.label}</h3>
                            {card.subtitle && (
                                <p className="text-xs text-gray-400">{card.subtitle}</p>
                            )}
                        </div>
                        
                        <div className="mb-3">
                            <div className="flex items-baseline space-x-2">
                                <span className="text-2xl font-bold text-white">{card.value}</span>
                                {card.change && (
                                    <span className="text-lg font-semibold text-green-400">
                                        {card.change}
                                    </span>
                                )}
                            </div>
                        </div>
                        
                        <button 
                            className={`text-xs px-3 py-1 rounded-full font-medium ${
                                card.color === 'orange' ? 'bg-orange-500 text-white' :
                                card.color === 'yellow' ? 'bg-yellow-500 text-black' :
                                card.color === 'pink' ? 'bg-pink-500 text-white' :
                                'bg-green-500 text-white'
                            }`}
                        >
                            {card.status}
                        </button>
                    </div>
                ))}
            </div>
        );
    } catch (error) {
        console.error('PriceCards component error:', error);
        return null;
    }
}