function AdminPanel({ isOpen, onClose, user }) {
    try {
        const [activeTab, setActiveTab] = React.useState('users');
        const [users, setUsers] = React.useState([]);
        const [transactions, setTransactions] = React.useState([]);
        const [promos, setPromos] = React.useState([]);
        const [stats, setStats] = React.useState({});

        React.useEffect(() => {
            if (isOpen && user?.objectData?.role === 'admin') {
                loadAdminData();
            }
        }, [isOpen, user]);

        const loadAdminData = async () => {
            try {
                const [usersData, transactionsData, promosData] = await Promise.all([
                    trickleListObjects('player', 100, true),
                    trickleListObjects('transaction', 100, true),
                    trickleListObjects('promotion', 100, true)
                ]);

                setUsers(usersData.items);
                setTransactions(transactionsData.items);
                setPromos(promosData.items);

                const totalUsers = usersData.items.length;
                const totalTransactions = transactionsData.items.length;
                const totalVolume = transactionsData.items.reduce((sum, tx) => sum + (tx.objectData.amount || 0), 0);

                setStats({ totalUsers, totalTransactions, totalVolume });
            } catch (error) {
                console.error('Error loading admin data:', error);
            }
        };

        const toggleUserStatus = async (userId, isActive) => {
            try {
                const user = await trickleGetObject('player', userId);
                await trickleUpdateObject('player', userId, {
                    ...user.objectData,
                    isActive: !isActive
                });
                loadAdminData();
            } catch (error) {
                console.error('Error toggling user status:', error);
            }
        };

        if (!isOpen || user?.objectData?.role !== 'admin') return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="game-card p-8 w-full max-w-6xl mx-4 h-5/6 overflow-hidden">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-yellow-400">⚙️ Painel Administrativo</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white">
                            <div className="icon-x text-xl"></div>
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-500 bg-opacity-20 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-white">{stats.totalUsers}</div>
                            <div className="text-blue-300">Usuários Totais</div>
                        </div>
                        <div className="bg-green-500 bg-opacity-20 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-white">{stats.totalTransactions}</div>
                            <div className="text-green-300">Transações</div>
                        </div>
                        <div className="bg-purple-500 bg-opacity-20 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-white">R$ {stats.totalVolume?.toFixed(2)}</div>
                            <div className="text-purple-300">Volume Total</div>
                        </div>
                    </div>

                    <div className="flex space-x-4 mb-6">
                        {['users', 'transactions', 'promos'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-lg capitalize ${
                                    activeTab === tab ? 'btn-gold' : 'bg-gray-700 text-gray-300'
                                }`}
                            >
                                {tab === 'users' ? 'Usuários' : tab === 'transactions' ? 'Transações' : 'Promoções'}
                            </button>
                        ))}
                    </div>

                    <div className="overflow-y-auto h-96">
                        {activeTab === 'users' && (
                            <div className="space-y-3">
                                {users.map((user) => (
                                    <div key={user.objectId} className="bg-black bg-opacity-30 p-4 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="text-white font-semibold">{user.objectData.name}</div>
                                                <div className="text-sm text-gray-400">
                                                    Saldo: R$ {user.objectData.balance?.toFixed(2)}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => toggleUserStatus(user.objectId, user.objectData.isActive)}
                                                className={`px-3 py-1 rounded text-xs ${
                                                    user.objectData.isActive ? 'btn-success' : 'bg-red-600 text-white'
                                                }`}
                                            >
                                                {user.objectData.isActive ? 'Ativo' : 'Inativo'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('AdminPanel error:', error);
        return null;
    }
}