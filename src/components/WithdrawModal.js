function WithdrawModal({ isOpen, onClose, onWithdraw, balance }) {
    try {
        const [amount, setAmount] = React.useState('');
        const [pixKey, setPixKey] = React.useState('');
        const [isProcessing, setIsProcessing] = React.useState(false);

        const handleWithdraw = async (e) => {
            e.preventDefault();
            
            const withdrawAmount = parseFloat(amount);
            if (withdrawAmount < 20) {
                alert('Valor mínimo para saque: R$ 20');
                return;
            }

            if (withdrawAmount > balance) {
                alert('Saldo insuficiente!');
                return;
            }

            if (!pixKey) {
                alert('Informe sua chave PIX!');
                return;
            }

            setIsProcessing(true);
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            const success = await onWithdraw(withdrawAmount);
            if (success) {
                alert(`Saque de R$ ${withdrawAmount.toFixed(2)} processado! Será creditado em até 24h.`);
                setAmount('');
                setPixKey('');
            }
            setIsProcessing(false);
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="game-card p-8 w-full max-w-md mx-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-yellow-400">💸 Saque PIX</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white">
                            <div className="icon-x text-xl"></div>
                        </button>
                    </div>

                    <form onSubmit={handleWithdraw} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-yellow-400">
                                Chave PIX
                            </label>
                            <input
                                type="text"
                                value={pixKey}
                                onChange={(e) => setPixKey(e.target.value)}
                                placeholder="CPF, e-mail ou telefone"
                                className="w-full bg-black bg-opacity-50 border border-yellow-400 rounded-lg px-4 py-3 text-white"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-yellow-400">
                                Valor (R$)
                            </label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Mínimo R$ 20"
                                className="w-full bg-black bg-opacity-50 border border-yellow-400 rounded-lg px-4 py-3 text-white"
                                min="20"
                                max={balance}
                                required
                            />
                            <div className="text-xs text-gray-400 mt-1">
                                Saldo disponível: R$ {balance.toFixed(2)}
                            </div>
                        </div>

                        <div className="bg-yellow-500 bg-opacity-20 p-3 rounded-lg">
                            <div className="text-yellow-300 text-sm">
                                ⚠️ Processamento: até 24h<br/>
                                💰 Taxa: R$ 0,00
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={isProcessing}
                            className="btn-primary w-full py-3 font-bold"
                        >
                            {isProcessing ? 'Processando...' : '💸 Solicitar Saque'}
                        </button>
                    </form>
                </div>
            </div>
        );
    } catch (error) {
        console.error('WithdrawModal error:', error);
        return null;
    }
}