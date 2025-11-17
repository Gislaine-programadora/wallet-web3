function TournamentModal({ isOpen, onClose, user, balance, onUpdateBalance }) {
    try {
        const [tournaments, setTournaments] = React.useState([]);
        const [loading, setLoading] = React.useState(true);

        React.useEffect(() => {
            if (isOpen) {
                loadTournaments();
            }
        }, [isOpen]);

        const loadTournaments = async () => {
            setLoading(true);
            try {
                const result = await trickleListObjects('tournament', 100, true);
                setTournaments(result.items.filter(t => t.objectData.isActive));
            } catch (error) {
                console.error('Error loading tournaments:', error);
            } finally {
                setLoading(false);
            }
        };

        const joinTournament = async (tournament) => {
            if (balance < tournament.objectData.entryFee) {
                alert('Saldo insuficiente para participar!');
                return;
            }

            try {
                const newBalance = balance - tournament.objectData.entryFee;
                await onUpdateBalance(newBalance);
                
                await trickleUpdateObject('tournament', tournament.objectId, {
                    ...tournament.objectData,
                    currentParticipants: tournament.objectData.currentParticipants + 1
                });

                await createNotification(user.objectId, 'Torneio Inscrito!', 
                    `Você se inscreveu no torneio ${tournament.objectData.name}`, 'tournament');
                
                alert('Inscrição realizada com sucesso!');
                loadTournaments();
            } catch (error) {
                console.error('Error joining tournament:', error);
                alert('Erro ao se inscrever no torneio');
            }
        };

        const getStatusColor = (status) => {
            switch (status) {
                case 'upcoming': return 'bg-blue-600';
                case 'active': return 'bg-green-600';
                case 'finished': return 'bg-gray-600';
                default: return 'bg-gray-600';
            }
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="game-card p-8 w-full max-w-2xl mx-4 h-5/6 overflow-hidden">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-yellow-400">🏆 Torneios Semanais</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white">
                            <div className="icon-x text-xl"></div>
                        </button>
                    </div>

                    <div className="overflow-y-auto h-full">
                        {loading ? (
                            <div className="text-center py-8">
                                <div className="text-4xl mb-4">⏳</div>
                                <p className="text-gray-400">Carregando torneios...</p>
                            </div>
                        ) : tournaments.length === 0 ? (
                            <div className="text-center py-8">
                                <div className="text-4xl mb-4">🏆</div>
                                <p className="text-gray-400">Nenhum torneio ativo no momento</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {tournaments.map((tournament) => (
                                    <div key={tournament.objectId} className="bg-black bg-opacity-30 p-6 rounded-lg">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-white">{tournament.objectData.name}</h3>
                                                <p className="text-gray-300">{tournament.objectData.description}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded text-white text-sm ${getStatusColor(tournament.objectData.status)}`}>
                                                {tournament.objectData.status}
                                            </span>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                            <div className="text-center">
                                                <div className="text-yellow-400 font-bold text-lg">
                                                    R$ {tournament.objectData.prizePool}
                                                </div>
                                                <div className="text-xs text-gray-400">Premiação</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-white font-bold text-lg">
                                                    R$ {tournament.objectData.entryFee}
                                                </div>
                                                <div className="text-xs text-gray-400">Inscrição</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-blue-400 font-bold text-lg">
                                                    {tournament.objectData.currentParticipants}/{tournament.objectData.maxParticipants}
                                                </div>
                                                <div className="text-xs text-gray-400">Participantes</div>
                                            </div>
                                            <div className="text-center">
                                                <button 
                                                    onClick={() => joinTournament(tournament)}
                                                    disabled={tournament.objectData.currentParticipants >= tournament.objectData.maxParticipants}
                                                    className="btn-gold px-4 py-2 text-sm disabled:opacity-50"
                                                >
                                                    Participar
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div className="text-xs text-gray-400">
                                            Início: {new Date(tournament.objectData.startDate).toLocaleString()} | 
                                            Fim: {new Date(tournament.objectData.endDate).toLocaleString()}
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
        console.error('TournamentModal error:', error);
        return null;
    }
}