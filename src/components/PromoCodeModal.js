function PromoCodeModal({ isOpen, onClose, onApply }) {
    try {
        const [code, setCode] = React.useState('');
        const [isApplying, setIsApplying] = React.useState(false);

        const handleApply = async (e) => {
            e.preventDefault();
            if (!code.trim()) return;

            setIsApplying(true);
            await onApply(code.trim().toUpperCase());
            setIsApplying(false);
            setCode('');
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="game-card p-8 w-full max-w-md mx-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-yellow-400">🎁 Código Promocional</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white">
                            <div className="icon-x text-xl"></div>
                        </button>
                    </div>

                    <form onSubmit={handleApply} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-yellow-400">
                                Digite seu código
                            </label>
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="Ex: TIGER100"
                                className="w-full bg-black bg-opacity-50 border border-yellow-400 rounded-lg px-4 py-3 text-white uppercase"
                                required
                            />
                        </div>

                        <div className="bg-blue-500 bg-opacity-20 p-4 rounded-lg">
                            <div className="text-blue-300 text-sm">
                                💡 Códigos promocionais podem dar:<br/>
                                • Saldo bônus gratuito<br/>
                                • Giros grátis<br/>
                                • Multiplicadores especiais
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={isApplying || !code.trim()}
                            className="btn-gold w-full py-3 font-bold"
                        >
                            {isApplying ? 'Aplicando...' : '🎁 Aplicar Código'}
                        </button>
                    </form>

                    <div className="mt-4 text-center text-xs text-gray-400">
                        Códigos válidos apenas uma vez por usuário
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('PromoCodeModal error:', error);
        return null;
    }
}