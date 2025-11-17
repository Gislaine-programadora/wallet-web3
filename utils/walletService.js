// Wallet creation and management functions
async function createWallet(password) {
    try {
        const privateKey = generatePrivateKey();
        const address = deriveAddress(privateKey);
        
        const walletData = {
            address: address,
            privateKey: privateKey,
            password: password,
            createdAt: new Date().toISOString()
        };

        return walletData;
    } catch (error) {
        console.error('Error creating wallet:', error);
        throw error;
    }
}

async function importWalletFromPrivateKey(privateKey, password) {
    try {
        if (!isValidPrivateKey(privateKey)) {
            throw new Error('Chave privada inválida');
        }
        
        const address = deriveAddress(privateKey);
        
        const walletData = {
            address: address,
            privateKey: privateKey,
            password: password,
            imported: true,
            createdAt: new Date().toISOString()
        };

        return walletData;
    } catch (error) {
        console.error('Error importing wallet:', error);
        throw error;
    }
}

function generatePrivateKey() {
    // Generate a random 64-character hex string
    const chars = '0123456789abcdef';
    let result = '0x';
    for (let i = 0; i < 64; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

function deriveAddress(privateKey) {
    // Simulate address derivation from private key
    const chars = '0123456789abcdef';
    let address = '0x';
    for (let i = 0; i < 40; i++) {
        address += chars[Math.floor(Math.random() * chars.length)];
    }
    return address;
}

function isValidPrivateKey(privateKey) {
    return privateKey && privateKey.length === 66 && privateKey.startsWith('0x');
}

function isValidAddress(address) {
    return address && address.length === 42 && address.startsWith('0x');
}

async function getETHBalance(address) {
    try {
        // Simulate balance fetch
        return (Math.random() * 10).toFixed(6);
    } catch (error) {
        console.error('Error getting ETH balance:', error);
        return '0.000000';
    }
}

async function getTokenBalance(address, tokenAddress) {
    try {
        // Simulate token balance fetch
        return (Math.random() * 1000).toFixed(6);
    } catch (error) {
        console.error('Error getting token balance:', error);
        return '0.000000';
    }
}

async function sendTransaction(txData) {
    try {
        // Simulate transaction
        const txHash = '0x' + Math.random().toString(16).substr(2, 64);
        
        return {
            success: true,
            txHash: txHash
        };
    } catch (error) {
        console.error('Error sending transaction:', error);
        return { success: false, error: error.message };
    }
}

function getStoredTokens(address) {
    try {
        const key = `tokens_${address}`;
        const tokens = localStorage.getItem(key);
        return tokens ? JSON.parse(tokens) : [];
    } catch (error) {
        console.error('Error getting stored tokens:', error);
        return [];
    }
}

function addTokenToWallet(address, tokenData) {
    try {
        const key = `tokens_${address}`;
        const existingTokens = getStoredTokens(address);
        
        // Check if token already exists
        const exists = existingTokens.find(t => t.address === tokenData.address);
        if (exists) {
            throw new Error('Token já existe na carteira');
        }
        
        existingTokens.push(tokenData);
        localStorage.setItem(key, JSON.stringify(existingTokens));
    } catch (error) {
        console.error('Error adding token:', error);
        throw error;
    }
}

async function getTokenInfo(address) {
    try {
        // Simulate token info fetch from contract
        const mockTokens = {
            '0xa0b86a33e6c6c8f8b4de2a8c3c2d3f3c3b3a3b3a': {
                name: 'USD Coin',
                symbol: 'USDC',
                decimals: 6
            }
        };
        
        return mockTokens[address] || null;
    } catch (error) {
        console.error('Error getting token info:', error);
        return null;
    }
}