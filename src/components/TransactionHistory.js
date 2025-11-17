function TransactionHistory({ isOpen, onClose, user }) {
    try {
        const [transactions, setTransactions] = React.useState([]);
        const [loading, setLoading] = React.useState(true);

        React.useEffect(() => {
            if (isOpen && user) {
                loadTransactions();
            }
        }, [isOpen, user]);

        const loadTransactions = async () => {
            setLoading(true);
            try {
                const allTransactions = await trickleListObjects('transaction', 100, true);
                const userTransactions = allTransactions.items.filter(t => t.objectData.userId === user.objectId);
                setTransactions(userTransactions);
            } catch (error) {
                console.error('Error loading transactions:', error);
            } finally {
                setLoading(false);
            }
        };

        const getStatusColor = (status) => {
            switch (status) {
                case 'completed': return 'text-green-400 bg-green-900';
                case 'pending': return 'text-yellow-400 bg-yellow-900';
                case 'cancelled': return 'text-red-400 bg-red-900';
                default: return 'text-gray-400 bg-gray-800';
            }
        };

        const getTypeIcon = (type) => {
            switch (type) {
                case 'deposit': return '💰';
                case 'withdraw': return '💸';
                case 'game_win': return '🎉';
                case 'game_loss': return '😞';
                default: return '💳';
            }
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="game-card p-8 w-full max-w-2xl mx-4 max-h-96 overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-yellow-400">📊 Histórico de Transações</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white">
                            <div className="icon-x text-xl"></div>
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center py-8">
                            <div className="text-4xl mb-4">⏳</div>
                            <div className="text-gray-300">Carregando histórico...</div>
                        </div>
                    ) : transactions.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="text-4xl mb-4">📋</div>
                            <div className="text-gray-300">Nenhuma transação encontrada</div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {transactions.map((transaction) => (
                                <div key={transaction.objectId} className="bg-black bg-opacity-30 p-4 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="text-2xl">{getTypeIcon(transaction.objectData.type)}</div>
                                            <div>
                                                <div className="font-bold text-white">{transaction.objectData.description}</div>
                                                <div className="text-sm text-gray-400">
                                                    {new Date(transaction.createdAt).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`font-bold ${
                                                transaction.objectData.type === 'deposit' || transaction.objectData.type === 'game_win' 
                                                    ? 'text-green-400' : 'text-red-400'
                                            }`}>
                                                {transaction.objectData.type === 'deposit' || transaction.objectData.type === 'game_win' ? '+' : '-'}
                                                R$ {transaction.objectData.amount.toFixed(2)}
                                            </div>
                                            <div className={`text-xs px-2 py-1 rounded ${getStatusColor(transaction.objectData.status)}`}>
                                                {transaction.objectData.status}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('TransactionHistory error:', error);
        return null;
    }
}