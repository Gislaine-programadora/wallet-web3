function CashbackModal({ isOpen, onClose, user, balance, onUpdateBalance }) {
    try {
        const [cashbackData, setCashbackData] = React.useState(null);
        const [loading, setLoading] = React.useState(true);

        React.useEffect(() => {
            if (isOpen && user) {
                loadCashbackData();
            }
        }, [isOpen, user]);

        const loadCashbackData = async () => {
            try {
                const cashbacks = await trickleListObjects('cashback', 100, true);
                const userCashbacks = cashbacks.items.filter(c => c.objectData.userId === user.objectId);
                
                const totalCashback = userCashbacks.reduce((sum, c) => sum + (c.objectData.cashbackAmount || 0), 0);
                const pendingCashback = userCashbacks.filter(c => c.objectData.status === 'pending');
                const paidCashback = userCashbacks.filter(c => c.objectData.status === 'paid');
                
                setCashbackData({
                    totalCashback,
                    pendingAmount: pendingCashback.reduce((sum, c) => sum + c.objectData.cashbackAmount, 0),
                    paidAmount: paidCashback.reduce((sum, c) => sum + c.objectData.cashbackAmount, 0),
                    cashbackRate: 5, // 5%
                    history: userCashbacks
                });
            } catch (error) {
                console.error('Error loading cashback data:', error);
            } finally {
                setLoading(false);
            }
        };

        const claimCashback = async () => {
            try {
                const pendingCashbacks = await trickleListObjects('cashback', 100, true);
                const userPending = pendingCashbacks.items.filter(
                    c => c.objectData.userId === user.objectId && c.objectData.status === 'pending'
                );

                if (userPending.length === 0) {
                    alert('Nenhum cashback disponível para resgate!');
                    return;
                }

                let totalAmount = 0;
                for (const cashback of userPending) {
                    totalAmount += cashback.objectData.cashbackAmount;
                    await trickleUpdateObject('cashback', cashback.objectId, {
                        ...cashback.objectData,
                        status: 'paid'
                    });
                }

                const newBalance = balance + totalAmount;
                await onUpdateBalance(newBalance);
                
                await createNotification(user.objectId, 'Cashback Recebido!', 
                    `Você recebeu R$ ${totalAmount.toFixed(2)} de cashback!`, 'bonus');
                
                alert(`Cashback de R$ ${totalAmount.toFixed(2)} creditado!`);
                loadCashbackData();
            } catch (error) {
                console.error('Error claiming cashback:', error);
                alert('Erro ao resgatar cashback');
            }
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="game-card p-8 w-full max-w-lg mx-4 h-5/6 overflow-hidden">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-yellow-400">💰 Cashback Semanal</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white">
                            <div className="icon-x text-xl"></div>
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center py-8">
                            <div className="text-4xl mb-4">⏳</div>
                            <p className="text-gray-400">Carregando dados...</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-6 rounded-lg">
                                <h3 className="text-white font-bold text-lg mb-4">Cashback Disponível</h3>
                                <div className="text-3xl font-bold text-white mb-2">
                                    R$ {cashbackData?.pendingAmount?.toFixed(2) || '0.00'}
                                </div>
                                <button 
                                    onClick={claimCashback}
                                    disabled={!cashbackData?.pendingAmount}
                                    className="btn-gold px-6 py-2 disabled:opacity-50"
                                >
                                    💰 Resgatar Cashback
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-black bg-opacity-30 p-4 rounded-lg text-center">
                                    <div className="text-xl font-bold text-green-400">
                                        R$ {cashbackData?.paidAmount?.toFixed(2) || '0.00'}
                                    </div>
                                    <div className="text-sm text-gray-400">Total Recebido</div>
                                </div>
                                <div className="bg-black bg-opacity-30 p-4 rounded-lg text-center">
                                    <div className="text-xl font-bold text-blue-400">
                                        {cashbackData?.cashbackRate}%
                                    </div>
                                    <div className="text-sm text-gray-400">Taxa Cashback</div>
                                </div>
                            </div>

                            <div className="bg-yellow-500 bg-opacity-20 p-4 rounded-lg">
                                <h4 className="text-yellow-300 font-bold mb-2">Como Funciona:</h4>
                                <ul className="text-yellow-200 text-sm space-y-1">
                                    <li>• Receba 5% de volta em todas as apostas</li>
                                    <li>• Cashback calculado semanalmente</li>
                                    <li>• Resgate disponível toda segunda-feira</li>
                                    <li>• Sem limite mínimo para resgate</li>
                                </ul>
                            </div>

                            <div className="bg-black bg-opacity-30 p-4 rounded-lg">
                                <h4 className="text-white font-bold mb-3">Histórico Recente</h4>
                                {cashbackData?.history?.length > 0 ? (
                                    <div className="space-y-2 max-h-32 overflow-y-auto">
                                        {cashbackData.history.slice(0, 5).map((item, index) => (
                                            <div key={index} className="flex justify-between text-sm">
                                                <span className="text-gray-400">{item.objectData.period}</span>
                                                <span className="text-green-400">R$ {item.objectData.cashbackAmount.toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-400 text-sm">Nenhum histórico ainda</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('CashbackModal error:', error);
        return null;
    }
}