function LoginModal({ isOpen, onClose, onLogin }) {
    try {
        const [name, setName] = React.useState('');
        const [loading, setLoading] = React.useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        setLoading(true);
        
        try {
            const userData = {
                name: name.trim()
            };
            
            onLogin(userData);
            setName('');
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="game-card p-8 w-full max-w-md mx-4">
                    <div className="text-center mb-6">
                        <div className="text-6xl mb-4">🐅</div>
                        <h2 className="text-2xl font-bold text-yellow-400">Bem-vindo ao Fortune Tiger</h2>
                        <p className="text-gray-300 mt-2">Entre para começar a jogar</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-yellow-400">
                                Nome do Jogador
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Digite seu nome"
                                className="w-full bg-black bg-opacity-50 border border-yellow-400 rounded-lg px-4 py-3 text-white placeholder-gray-400"
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading || !name.trim()}
                            className="btn-gold w-full py-3 text-lg font-bold disabled:opacity-50"
                        >
                            {loading ? 'Entrando...' : '🎰 Começar a Jogar'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-xs text-gray-400">
                        Você receberá R$ 1000 de bônus para começar!
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('LoginModal component error:', error);
        return null;
    }
}