function PixDeposit({ isOpen, onClose, onDeposit }) {
    try {
        const [amount, setAmount] = React.useState('');
        const [pixCode, setPixCode] = React.useState('');
        const [isGenerating, setIsGenerating] = React.useState(false);

        const generatePixCode = async () => {
            if (!amount || parseFloat(amount) <= 0) return;

            setIsGenerating(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                const code = `00020126580014BR.GOV.BCB.PIX013636c7e5c4-1234-4567-8901-${Date.now()}5204000053039865802BR5925COINGBIT TECNOLOGIA LTDA6009SAO PAULO62140510${Date.now()}6304`;
                setPixCode(code);
            } catch (error) {
                console.error('Error generating PIX:', error);
            } finally {
                setIsGenerating(false);
            }
        };

        const handleCopyCode = () => {
            navigator.clipboard.writeText(pixCode);
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="card-glass p-8 w-full max-w-md mx-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Depósito PIX</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white">
                            <div className="icon-x text-xl"></div>
                        </button>
                    </div>

                    {!pixCode ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-white">Valor (R$)</label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0,00"
                                    className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg px-3 py-3 text-white text-lg"
                                />
                            </div>

                            <div className="bg-blue-500 bg-opacity-20 p-4 rounded-lg">
                                <p className="text-blue-300 text-sm">
                                    • Processamento instantâneo<br/>
                                    • Disponível 24h por dia<br/>
                                    • Taxa: R$ 0,00
                                </p>
                            </div>

                            <button 
                                onClick={generatePixCode}
                                disabled={!amount || parseFloat(amount) <= 0 || isGenerating}
                                className="w-full btn-success py-3 font-semibold"
                            >
                                {isGenerating ? 'Gerando PIX...' : 'Gerar Código PIX'}
                            </button>
                        </div>
                    ) : (
                        <div className="text-center space-y-4">
                            <div className="bg-green-500 bg-opacity-20 p-4 rounded-lg">
                                <div className="icon-check-circle text-green-400 text-3xl mb-2"></div>
                                <p className="text-green-300 font-semibold">PIX Gerado!</p>
                                <p className="text-sm text-green-200">Valor: R$ {parseFloat(amount).toFixed(2)}</p>
                            </div>

                            <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-300 mb-2">Código PIX:</p>
                                <p className="font-mono text-xs text-white break-all bg-gray-900 p-2 rounded">
                                    {pixCode}
                                </p>
                            </div>

                            <div className="flex space-x-2">
                                <button 
                                    onClick={handleCopyCode}
                                    className="flex-1 btn-primary py-2"
                                >
                                    <div className="icon-copy text-sm mr-2 inline-block"></div>
                                    Copiar
                                </button>
                                <button 
                                    onClick={() => {
                                        onClose();
                                        setAmount('');
                                        setPixCode('');
                                    }}
                                    className="flex-1 bg-gray-600 text-white py-2 rounded-lg"
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('PixDeposit component error:', error);
        return null;
    }
}