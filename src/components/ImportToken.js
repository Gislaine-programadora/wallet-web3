function ImportToken({ wallet }) {
    try {
        const [tokenAddress, setTokenAddress] = React.useState('');
        const [tokenSymbol, setTokenSymbol] = React.useState('');
        const [tokenName, setTokenName] = React.useState('');
        const [tokenDecimals, setTokenDecimals] = React.useState(18);
        const [isLoading, setIsLoading] = React.useState(false);

        const handleImportToken = async (e) => {
            e.preventDefault();
            
            if (!tokenAddress || !tokenSymbol || !tokenName) {
                alert('Preencha todos os campos obrigatórios');
                return;
            }

            if (!isValidAddress(tokenAddress)) {
                alert('Endereço do token inválido');
                return;
            }

            setIsLoading(true);
            try {
                const tokenData = {
                    address: tokenAddress,
                    symbol: tokenSymbol.toUpperCase(),
                    name: tokenName,
                    decimals: tokenDecimals
                };

                addTokenToWallet(wallet.address, tokenData);
                
                alert(`Token ${tokenSymbol} importado com sucesso!`);
                setTokenAddress('');
                setTokenSymbol('');
                setTokenName('');
                setTokenDecimals(18);
            } catch (error) {
                alert('Erro ao importar token: ' + error.message);
            } finally {
                setIsLoading(false);
            }
        };

        const handleAutoFill = async () => {
            if (!tokenAddress || !isValidAddress(tokenAddress)) {
                alert('Digite um endereço válido primeiro');
                return;
            }

            setIsLoading(true);
            try {
                const tokenInfo = await getTokenInfo(tokenAddress);
                if (tokenInfo) {
                    setTokenSymbol(tokenInfo.symbol);
                    setTokenName(tokenInfo.name);
                    setTokenDecimals(tokenInfo.decimals);
                }
            } catch (error) {
                alert('Não foi possível obter informações do token');
            } finally {
                setIsLoading(false);
            }
        };

        return (
            <form onSubmit={handleImportToken} className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Importar Token Personalizado</h3>
                
                <div>
                    <label className="block text-sm font-medium mb-2">Endereço do Contrato *</label>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={tokenAddress}
                            onChange={(e) => setTokenAddress(e.target.value)}
                            placeholder="0x..."
                            className="flex-1 px-3 py-2 bg-black bg-opacity-30 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                            required
                        />
                        <button
                            type="button"
                            onClick={handleAutoFill}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                        >
                            <div className="icon-search text-sm"></div>
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Símbolo *</label>
                    <input
                        type="text"
                        value={tokenSymbol}
                        onChange={(e) => setTokenSymbol(e.target.value)}
                        placeholder="ETH"
                        className="w-full px-3 py-2 bg-black bg-opacity-30 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Nome *</label>
                    <input
                        type="text"
                        value={tokenName}
                        onChange={(e) => setTokenName(e.target.value)}
                        placeholder="Ethereum"
                        className="w-full px-3 py-2 bg-black bg-opacity-30 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Decimais</label>
                    <input
                        type="number"
                        value={tokenDecimals}
                        onChange={(e) => setTokenDecimals(parseInt(e.target.value))}
                        min="0"
                        max="18"
                        className="w-full px-3 py-2 bg-black bg-opacity-30 border border-gray-600 rounded-lg text-white"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3 rounded-lg font-semibold disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
                >
                    {isLoading ? (
                        <>
                            <div className="icon-loader animate-spin"></div>
                            <span>Importando...</span>
                        </>
                    ) : (
                        <>
                            <div className="icon-plus"></div>
                            <span>Importar Token</span>
                        </>
                    )}
                </button>
            </form>
        );
    } catch (error) {
        console.error('ImportToken error:', error);
        return null;
    }
}
