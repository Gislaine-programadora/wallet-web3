function WalletDashboard({ wallet, onLogout, currentView, setCurrentView }) {
    try {
        const [showPrivateKey, setShowPrivateKey] = React.useState(false);

        const copyToClipboard = (text) => {
            navigator.clipboard.writeText(text);
            alert('Copiado para a área de transferência!');
        };

        return (
            <div className="min-h-screen">
                {/* Header */}
                <header className="glass-card m-4 p-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <div className="icon-wallet text-white"></div>
                            </div>
                            <h1 className="text-xl font-bold">CryptoWallet</h1>
                        </div>
                        <button
                            onClick={onLogout}
                            className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                        >
                            <div className="icon-log-out"></div>
                            <span>Sair</span>
                        </button>
                    </div>
                </header>

                <div className="flex flex-col lg:flex-row gap-4 mx-4">
                    {/* Main Content */}
                    <div className="flex-1 space-y-4">
                        {/* Wallet Info */}
                        <div className="wallet-card p-6">
                            <h2 className="text-xl font-semibold mb-4">Informações da Carteira</h2>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-sm text-gray-300">Endereço</label>
                                    <div className="flex items-center space-x-2">
                                        <span className="font-mono text-sm bg-black bg-opacity-30 px-3 py-1 rounded">
                                            {wallet.address.slice(0, 20)}...
                                        </span>
                                        <button
                                            onClick={() => copyToClipboard(wallet.address)}
                                            className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
                                        >
                                            <div className="icon-copy text-sm"></div>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-300">Chave Privada</label>
                                    <div className="flex items-center space-x-2">
                                        <span className="font-mono text-sm bg-black bg-opacity-30 px-3 py-1 rounded">
                                            {showPrivateKey ? wallet.privateKey : '••••••••••••••••'}
                                        </span>
                                        <button
                                            onClick={() => setShowPrivateKey(!showPrivateKey)}
                                            className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
                                        >
                                            <div className={`icon-${showPrivateKey ? 'eye-off' : 'eye'} text-sm`}></div>
                                        </button>
                                        <button
                                            onClick={() => copyToClipboard(wallet.privateKey)}
                                            className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
                                        >
                                            <div className="icon-copy text-sm"></div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Token Balances */}
                        <TokenBalance wallet={wallet} />

                        {/* Navigation Tabs */}
                        <div className="glass-card p-4">
                            <div className="flex space-x-2 mb-6">
                                <button
                                    onClick={() => setCurrentView('transfer')}
                                    className={`px-4 py-2 rounded-lg transition-colors ${
                                        currentView === 'transfer' ? 'bg-blue-600' : 'bg-black bg-opacity-30'
                                    }`}
                                >
                                    Transferir
                                </button>
                                <button
                                    onClick={() => setCurrentView('import')}
                                    className={`px-4 py-2 rounded-lg transition-colors ${
                                        currentView === 'import' ? 'bg-blue-600' : 'bg-black bg-opacity-30'
                                    }`}
                                >
                                    Importar Token
                                </button>
                            </div>

                            {currentView === 'transfer' && <TransferForm wallet={wallet} />}
                            {currentView === 'import' && <ImportToken wallet={wallet} />}
                        </div>
                    </div>

                    {/* Price Widget */}
                    <div className="lg:w-80">
                        <PriceWidget />
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('WalletDashboard error:', error);
        return null;
    }
}