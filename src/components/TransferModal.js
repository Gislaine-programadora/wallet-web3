function TransferModal({ isOpen, onClose, wallet, onTransfer }) {
    try {
        const [toAddress, setToAddress] = React.useState('');
        const [amount, setAmount] = React.useState('');
        const [token, setToken] = React.useState('CGB');
        const [message, setMessage] = React.useState('');
        const [isProcessing, setIsProcessing] = React.useState(false);

        const handleTransfer = async (e) => {
            e.preventDefault();
            
            if (!toAddress || !amount) {
                setMessage('Preencha todos os campos');
                return;
            }

            if (!toAddress.startsWith('0x') || toAddress.length !== 42) {
                setMessage('Endereço ETH inválido');
                return;
            }

            const transferAmount = parseFloat(amount);
            if (token === 'CGB' && transferAmount > wallet.objectData.coingbitBalance) {
                setMessage('Saldo insuficiente de CGB');
                return;
            }

            setIsProcessing(true);
            try {
                const result = await transferToken(wallet, toAddress, transferAmount, token);
                if (result.success) {
                    setMessage(`Transferência realizada! TX: ${result.txHash.substring(0, 10)}...`);
                    onTransfer();
                    setTimeout(() => {
                        onClose();
                        setToAddress('');
                        setAmount('');
                        setMessage('');
                    }, 3000);
                } else {
                    setMessage('Erro na transferência');
                }
            } catch (error) {
                setMessage('Erro na transferência');
            } finally {
                setIsProcessing(false);
            }
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="card-glass p-8 w-full max-w-md mx-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Transferir Tokens</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white">
                            <div className="icon-x text-xl"></div>
                        </button>
                    </div>

                    <form onSubmit={handleTransfer} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-white">Token</label>
                            <select
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                                className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg px-3 py-2 text-white"
                            >
                                <option value="CGB">CoingBit (CGB)</option>
                                <option value="ETH">Ethereum (ETH)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-white">Endereço de destino</label>
                            <input
                                type="text"
                                value={toAddress}
                                onChange={(e) => setToAddress(e.target.value)}
                                placeholder="0x..."
                                className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg px-3 py-2 text-white"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-white">Quantidade</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg px-3 py-2 text-white"
                                required
                            />
                            <p className="text-xs text-gray-400 mt-1">
                                Disponível: {token === 'CGB' ? wallet?.objectData?.coingbitBalance?.toLocaleString() : wallet?.objectData?.ethBalance} {token}
                            </p>
                        </div>

                        <div className="bg-yellow-500 bg-opacity-20 p-3 rounded-lg">
                            <p className="text-yellow-300 text-sm">
                                ⚠️ Verifique o endereço antes de enviar. Transações não podem ser revertidas.
                            </p>
                        </div>

                        {message && (
                            <div className={`p-3 rounded-lg text-sm ${
                                message.includes('realizada') 
                                    ? 'bg-green-500 bg-opacity-20 text-green-300' 
                                    : 'bg-red-500 bg-opacity-20 text-red-300'
                            }`}>
                                {message}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={isProcessing}
                            className="w-full btn-primary py-3 font-semibold"
                        >
                            {isProcessing ? 'Processando...' : 'Transferir'}
                        </button>
                    </form>
                </div>
            </div>
        );
    } catch (error) {
        console.error('TransferModal component error:', error);
        return null;
    }
}