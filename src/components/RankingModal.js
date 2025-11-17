function RankingModal({ isOpen, onClose, currentUser }) {
    try {
        const [rankings, setRankings] = React.useState([]);
        const [loading, setLoading] = React.useState(true);

        React.useEffect(() => {
            if (isOpen) {
                loadRankings();
            }
        }, [isOpen]);

        const loadRankings = async () => {
            setLoading(true);
            try {
                const users = await getAllUsers();
                const sortedUsers = users.sort((a, b) => b.objectData.balance - a.objectData.balance);
                setRankings(sortedUsers.slice(0, 10));
            } catch (error) {
                console.error('Error loading rankings:', error);
            } finally {
                setLoading(false);
            }
        };

        const getRankIcon = (position) => {
            switch (position) {
                case 1: return '🥇';
                case 2: return '🥈';
                case 3: return '🥉';
                default: return '🏅';
            }
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="game-card p-8 w-full max-w-lg mx-4 max-h-96 overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-yellow-400">🏆 Ranking</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white">
                            <div className="icon-x text-xl"></div>
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center py-8">
                            <div className="text-4xl mb-4">⏳</div>
                            <div className="text-gray-300">Carregando ranking...</div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {rankings.map((user, index) => (
                                <div 
                                    key={user.objectId}
                                    className={`flex items-center justify-between p-3 rounded-lg ${
                                        currentUser?.objectId === user.objectId 
                                            ? 'bg-yellow-500 bg-opacity-20 border border-yellow-400' 
                                            : 'bg-black bg-opacity-30'
                                    }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="text-2xl">{getRankIcon(index + 1)}</div>
                                        <div>
                                            <div className="font-bold text-white">
                                                {user.objectData.name}
                                                {currentUser?.objectId === user.objectId && (
                                                    <span className="text-yellow-400 ml-2">(Você)</span>
                                                )}
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                #{index + 1}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-green-400">
                                            R$ {user.objectData.balance.toFixed(2)}
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
        console.error('RankingModal error:', error);
        return null;
    }
}