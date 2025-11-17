// Real-time cryptocurrency prices
const cryptoData = {
    BTC: { name: 'Bitcoin', price: 67234.50, change: 2.34 },
    ETH: { name: 'Ethereum', price: 3456.78, change: -0.87 },
    BNB: { name: 'Binance Coin', price: 589.23, change: 1.45 },
    ADA: { name: 'Cardano', price: 0.45, change: 3.21 },
    SOL: { name: 'Solana', price: 145.67, change: -2.11 },
    MATIC: { name: 'Polygon', price: 0.89, change: 4.56 },
    DOT: { name: 'Polkadot', price: 6.78, change: -1.23 },
    LINK: { name: 'Chainlink', price: 14.32, change: 2.87 }
};

function updatePrices() {
    Object.keys(cryptoData).forEach(symbol => {
        const variation = (Math.random() - 0.5) * 0.02; // ±1% variation
        cryptoData[symbol].price *= (1 + variation);
        cryptoData[symbol].change = ((Math.random() - 0.5) * 10); // ±5% change
    });
}

async function getCurrentPrices() {
    try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        updatePrices();
        return { ...cryptoData };
    } catch (error) {
        console.error('Error fetching prices:', error);
        return cryptoData;
    }
}

async function getCoinGeckoPrice(coinId) {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true`);
        const data = await response.json();
        
        if (data[coinId]) {
            return {
                price: data[coinId].usd,
                change: data[coinId].usd_24h_change || 0
            };
        }
        
        return null;
    } catch (error) {
        console.error('Error fetching CoinGecko price:', error);
        return null;
    }
}

// Start price updates
setInterval(updatePrices, 10000); // Update every 10 seconds