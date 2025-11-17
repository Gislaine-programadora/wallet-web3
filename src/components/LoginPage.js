function LoginPage({ onLogin }) {
    try {
        const [password, setPassword] = React.useState('');
        const [confirmPassword, setConfirmPassword] = React.useState('');
        const [privateKey, setPrivateKey] = React.useState('');
        const [isImporting, setIsImporting] = React.useState(false);
        const [isLoading, setIsLoading] = React.useState(false);

        const handleCreateWallet = async (e) => {
            e.preventDefault();
            if (password.length < 6) {
                alert('A senha deve ter pelo menos 6 caracteres');
                return;
            }
            if (password !== confirmPassword) {
                alert('As senhas não coincidem');
                return;
            }

            setIsLoading(true);
            try {
                await onLogin(password);
            } catch (error) {
                alert('Erro ao criar carteira');
            } finally {
                setIsLoading(false);
            }
        };

        const handleImportWallet = async (e) => {
            e.preventDefault();
            if (!privateKey.trim()) {
                alert('Digite a chave privada');
                return;
            }

            setIsLoading(true);
            try {
                await onLogin(password, privateKey.trim());
            } catch (error) {
                alert('Chave privada inválida');
            } finally {
                setIsLoading(false);
            }
        };

        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="glass-card p-8 w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <div className="icon-wallet text-white text-2xl"></div>
                        </div>
                        <h1 className="text-3xl font-bold mb-2">CryptoWallet</h1>
                        <p className="text-gray-300">Sua carteira digital segura</p>
                    </div>

                    <div className="mb-6">
                        <div className="flex rounded-lg bg-black bg-opacity-30 p-1">
                            <button
                                onClick={() => setIsImporting(false)}
                                className={`flex-1 py-2 px-4 rounded-md transition-all ${
                                    !isImporting ? 'bg-blue-600 text-white' : 'text-gray-300'
                                }`}
                            >
                                Criar Carteira
                            </button>
                            <button
                                onClick={() => setIsImporting(true)}
                                className={`flex-1 py-2 px-4 rounded-md transition-all ${
                                    isImporting ? 'bg-blue-600 text-white' : 'text-gray-300'
                                }`}
                            >
                                Importar
                            </button>
                        </div>
                    </div>

                    <form onSubmit={isImporting ? handleImportWallet : handleCreateWallet}>
                        {isImporting && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">
                                    Chave Privada
                                </label>
                                <textarea
                                    value={privateKey}
                                    onChange={(e) => setPrivateKey(e.target.value)}
                                    placeholder="Cole sua chave privada aqui..."
                                    className="w-full px-3 py-2 bg-black bg-opacity-30 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                                    rows={3}
                                    required
                                />
                            </div>
                        )}

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">
                                Senha
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Digite uma senha segura"
                                className="w-full px-3 py-2 bg-black bg-opacity-30 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                                required
                                minLength={6}
                            />
                        </div>

                        {!isImporting && (
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Confirmar Senha
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirme sua senha"
                                    className="w-full px-3 py-2 bg-black bg-opacity-30 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                                    required
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3 rounded-lg font-semibold disabled:opacity-50 transition-all"
                        >
                            {isLoading ? 'Processando...' : 
                             isImporting ? 'Importar Carteira' : 'Criar Carteira'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-xs text-gray-400">
                        Sua carteira é criptografada e armazenada localmente
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('LoginPage error:', error);
        return null;
    }
}