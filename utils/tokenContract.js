const TOKEN_ADDRESS = '0x1234567890123456789012345678901234567890'; // Replace with actual contract address
const TOKEN_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint256)",
    "function transfer(address to, uint amount) returns (bool)",
    "function approve(address spender, uint256 amount) returns (bool)",
    "function allowance(address owner, address spender) view returns (uint256)",
    "function transferFrom(address from, address to, uint256 amount) returns (bool)"
];

const TOKEN_INFO = {
    name: 'Coingbit',
    symbol: 'BYT',
    price: 2798300,
    tradingPrice: 15.00,
    totalSupply: 12987200000,
    availableSupply: 2987300000,
    gasBalance: 798740000,
    weiBalance: '2987300000000000000000000000'
};

function getTokenContract(provider) {
    try {
        return new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider);
    } catch (error) {
        console.error('Error creating token contract:', error);
        throw error;
    }
}

async function getTokenBalance(address, contract) {
    try {
        const balance = await contract.balanceOf(address);
        return ethers.utils.formatUnits(balance, 18);
    } catch (error) {
        console.error('Error getting token balance:', error);
        throw error;
    }
}

async function executeTokenTrade(type, amount, contract, signer) {
    try {
        const amountInWei = ethers.utils.parseEther(amount.toString());
        if (type === 'buy') {
            const tx = await contract.connect(signer).approve(TOKEN_ADDRESS, amountInWei);
            await tx.wait();
        } else {
            const tx = await contract.connect(signer).transfer(TOKEN_ADDRESS, amountInWei);
            await tx.wait();
        }
        return true;
    } catch (error) {
        console.error('Error executing token trade:', error);
        throw error;
    }
}
