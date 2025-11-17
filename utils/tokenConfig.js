// Token CoingBit Configuration
const COINGBIT_CONFIG = {
    name: 'CoingBit',
    symbol: 'CGB',
    contract: '0x742d35Cc6635C0532925a3b8D400d2C5E44C5c5c',
    decimals: 18,
    network: 'ethereum',
    initialSupply: 2987760000,
    currentPrice: 47632200,
    priceChange: 46.0, // 46% up
    tradingPrice: 112.00,
    minUnit: 0.00000000101
};

const ETH_CONFIG = {
    rpcUrl: process.env.REACT_APP_ETH_RPC || 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID',
    chainId: 1,
    explorerUrl: 'https://etherscan.io'
};

const WALLET_CONFIG = {
    defaultAddress: process.env.REACT_APP_WALLET_ADDRESS || '0x1234567890123456789012345678901234567890',
    defaultPrivateKey: process.env.REACT_APP_PRIVATE_KEY || 'your_private_key_here'
};

// Supported tokens on Ethereum
const SUPPORTED_TOKENS = {
    ETH: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
        price: 2650.00,
        change: 2.3,
        contract: null // Native ETH
    },
    USDT: {
        name: 'Tether USD',
        symbol: 'USDT',
        decimals: 6,
        price: 1.00,
        change: 0.1,
        contract: '0xdAC17F958D2ee523a2206206994597C13D831ec7'
    },
    USDC: {
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6,
        price: 1.00,
        change: -0.05,
        contract: '0xA0b86a33E6c6c8F8b4dE2A8c3c2d3f3c3b3a3b3a'
    },
    WBTC: {
        name: 'Wrapped Bitcoin',
        symbol: 'WBTC',
        decimals: 8,
        price: 43500.00,
        change: 1.8,
        contract: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'
    },
    CGB: COINGBIT_CONFIG
};