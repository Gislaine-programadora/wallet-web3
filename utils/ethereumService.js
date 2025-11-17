// Ethereum Integration Service
class EthereumService {
    constructor() {
        this.account = null;
        this.isConnected = false;
    }

    async connectWallet() {
        try {
            if (typeof window.ethereum !== 'undefined') {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });
                this.account = accounts[0];
                this.isConnected = true;
                
                return { success: true, account: this.account };
            } else {
                return { success: false, error: 'MetaMask não instalado' };
            }
        } catch (error) {
            console.error('Erro ao conectar wallet:', error);
            return { success: false, error: error.message };
        }
    }

    async getBalance(address = this.account) {
        try {
            // Mock balance for demo
            return '1000.0';
        } catch (error) {
            console.error('Erro ao buscar saldo:', error);
            return '0';
        }
    }

    async sendTransaction(to, amount) {
        try {
            // Mock transaction for demo
            const txHash = '0x' + Math.random().toString(16).substr(2, 64);
            return { success: true, hash: txHash };
        } catch (error) {
            console.error('Erro na transação:', error);
            return { success: false, error: error.message };
        }
    }

    async getTransactionStatus(txHash) {
        try {
            // Mock status for demo
            return true;
        } catch (error) {
            console.error('Erro ao verificar transação:', error);
            return null;
        }
    }
}

const ethereumService = new EthereumService();