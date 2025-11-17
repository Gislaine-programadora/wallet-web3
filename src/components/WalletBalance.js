function WalletBalance({ balance, onDeposit, onWithdraw, onRanking, onHistory, onPromo, onTournament, onAffiliate, onCashback }) {
    try {
        const getBalanceColor = () => {
            if (balance < 50) return 'text-red-400';
            if (balance < 200) return 'text-yellow-400';
            return 'text-green-400';
        };

        const getBalanceIcon = () => {
            if (balance < 50) return '⚠️';
            if (balance < 200) return '💰';
            return '💎';
        };

        return (
            <div className="game-card p-6">
                <div className="text-center">
                    <div className="text-3xl mb-2">{getBalanceIcon()}</div>
                    <div className="text-sm text-gray-300 mb-1">Saldo Atual</div>
                    <div className={`text-2xl font-bold ${getBalanceColor()}`}>
                        R$ {balance.toFixed(2)}
                    </div>
                    
                    {balance < 50 && (
                        <div className="mt-3 text-xs text-red-400">
                            Saldo baixo! Considere fazer um depósito.
                        </div>
                    )}
                    
                    {balance > 500 && (
                        <div className="mt-3 text-xs text-green-400">
                            🔥 Você está em uma boa sequência!
                        </div>
                    )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-600 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                        <button 
                            onClick={onDeposit}
                            className="btn-success py-2 text-xs"
                        >
                            💰 Depositar
                        </button>
                        <button 
                            onClick={onWithdraw}
                            className="btn-primary py-2 text-xs"
                        >
                            💸 Sacar
                        </button>
                        <button 
                            onClick={onRanking}
                            className="btn-gold py-2 text-xs"
                        >
                            🏆 Ranking
                        </button>
                        <button 
                            onClick={onHistory}
                            className="bg-purple-600 hover:bg-purple-700 text-white py-2 text-xs rounded"
                        >
                            📊 Histórico
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <button 
                            onClick={onPromo}
                            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-2 text-xs rounded font-bold"
                        >
                            🎁 Códigos
                        </button>
                        <button 
                            onClick={onTournament}
                            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-2 text-xs rounded font-bold"
                        >
                            🏆 Torneios
                        </button>
                        <button 
                            onClick={onAffiliate}
                            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white py-2 text-xs rounded font-bold"
                        >
                            👥 Afiliados
                        </button>
                        <button 
                            onClick={onCashback}
                            className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white py-2 text-xs rounded font-bold"
                        >
                            💰 Cashback
                        </button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('WalletBalance component error:', error);
        return null;
    }
}