function TransferForm({ wallet }) {
    try {
        const [toAddress, setToAddress] = React.useState('');
        const [amount, setAmount] = React.useState('');
        const [selectedToken, setSelectedToken] = React.useState('ETH');
        const [isLoading, setIsLoading] = React.useState(false);

        const handleTransfer = async (e) => {
            e.preventDefault();
            
            if (!toAddress || !amount) {
                alert('Preencha todos os campos');
                return;
            }

            if (!isValidAddress(toAddress)) {
                alert('Endereço inválido');
                return;
            }

            setIsLoading(true);
            try {
                const result = await sendTransaction({
                    from: wallet.address,
                    to: toAddress,
                    amount: amount,
                    token: selectedToken,
                    privateKey: wallet.privateKey
                });

                if (result.success) {
                    alert(`Transferência enviada! Hash: ${result.txHash}`);
                    setToAddress('');
                    setAmount('');
                } else {
                    alert('Erro na transferência: ' + result.error);
                }
            } catch (error) {
                alert('Erro na transferência: ' + error.message);
            } finally {
                setIsLoading(false);
            }
        };

        return (
            <form onSubmit={handleTransfer} className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Transferir Tokens</h3>
                
                <div>
                    <label className="block text-sm font-medium mb-2">Token</label>
                    <select
                        value={selectedToken}
                        onChange={(e) => setSelectedToken(e.target.value)}
                        className="w-full px-3 py-2 bg-black bg-opacity-30 border border-gray-600 rounded-lg text-white"
                    >
                        <option value="ETH">Ethereum (ETH)</option>
                        <option value="USDT">Tether USD (USDT)</option>
                        <option value="USDC">USD Coin (USDC)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Endereço de Destino</label>
                    <input
                        type="text"
                        value={toAddress}
                        onChange={(e) => setToAddress(e.target.value)}
                        placeholder="0x..."
                        className="w-full px-3 py-2 bg-black bg-opacity-30 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Quantidade</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.0"
                        step="0.000001"
                        className="w-full px-3 py-2 bg-black bg-opacity-30 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 py-3 rounded-lg font-semibold disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
                >
                    {isLoading ? (
                        <>
                            <div className="icon-loader animate-spin"></div>
                            <span>Enviando...</span>
                        </>
                    ) : (
                        <>
                            <div className="icon-send"></div>
                            <span>Transferir</span>
                        </>
                    )}
                </button>

                <div className="text-xs text-gray-400 mt-2">
                    ⚠️ Verifique o endereço antes de enviar. Transações não podem ser revertidas.
                </div>
            </form>
        );
    } catch (error) {
        console.error('TransferForm error:', error);
        return null;
    }
}