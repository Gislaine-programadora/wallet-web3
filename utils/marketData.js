const MARKET_DATA = {
    'BTC/USDT': {
        symbol: 'BTC/USDT',
        name: 'Bitcoin',
        price: 43247.82,
        change: 2.34,
        volume: '2.3B',
        high24h: 44100.00,
        low24h: 42800.00
    },
    'ETH/USDT': {
        symbol: 'ETH/USDT', 
        name: 'Ethereum',
        price: 2678.45,
        change: -1.23,
        volume: '1.8B',
        high24h: 2720.00,
        low24h: 2650.00
    },
    'BNB/USDT': {
        symbol: 'BNB/USDT',
        name: 'Binance Coin',
        price: 312.67,
        change: 0.87,
        volume: '450M',
        high24h: 315.00,
        low24h: 308.00
    },
    'ADA/USDT': {
        symbol: 'ADA/USDT',
        name: 'Cardano',
        price: 0.4823,
        change: 3.21,
        volume: '280M',
        high24h: 0.4950,
        low24h: 0.4680
    },
    'SOL/USDT': {
        symbol: 'SOL/USDT',
        name: 'Solana',
        price: 98.34,
        change: -2.15,
        volume: '520M',
        high24h: 101.20,
        low24h: 96.80
    }
};

function getMarketData() {
    const updated = { ...MARKET_DATA };
    Object.keys(updated).forEach(symbol => {
        const variation = (Math.random() - 0.5) * 0.01;
        updated[symbol].price *= (1 + variation);
        updated[symbol].change = ((Math.random() - 0.5) * 8);
    });
    return updated;
}

function generateChartData() {
    const data = [];
    const basePrice = 43000;
    
    for (let i = 0; i < 100; i++) {
        const variation = (Math.random() - 0.5) * 0.02;
        const price = basePrice * (1 + variation);
        data.push({
            x: new Date(Date.now() - (100 - i) * 60000),
            y: price
        });
    }
    
    return data;
}