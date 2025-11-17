function Dashboard({ user, marketData, balance, onWithdraw }) {
    try {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-4">
                <div className="balance-card">
                    <div className="flex items-center justify-center mb-3">
                        <div className="icon-wallet text-2xl text-green-400"></div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Saldo Disponível</h3>
                    <p className="text-3xl font-bold text-green-400">
                        R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <button 
                        onClick={onWithdraw}
                        className="btn-success mt-4 w-full"
                    >
                        <div className="icon-credit-card text-sm mr-2 inline-block"></div>
                        Sacar via PIX
                    </button>
                </div>

                <div className="lg:col-span-3 glass-card p-6">
                    <h3 className="text-xl font-semibold mb-4">Ativos Disponíveis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.entries(marketData).map(([symbol, data]) => (
                            <div key={symbol} className="asset-card">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h4 className="font-semibold">{data.name}</h4>
                                        <p className="text-sm text-gray-400">{symbol}</p>
                                    </div>
                                    <span className={`text-sm px-2 py-1 rounded ${
                                        data.change >= 0 ? 'bg-green-500 bg-opacity-20 text-green-400' : 'bg-red-500 bg-opacity-20 text-red-400'
                                    }`}>
                                        {data.change >= 0 ? '+' : ''}{data.change.toFixed(2)}%
                                    </span>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold">
                                        {data.currency === 'BRL' ? 'R$' : '$'} {data.price.toLocaleString()}
                                    </span>
                                    <div className="flex space-x-2">
                                        <button className="btn-success text-xs px-2 py-1">
                                            <div className="icon-trending-up text-xs"></div>
                                        </button>
                                        <button className="btn-danger text-xs px-2 py-1">
                                            <div className="icon-trending-down text-xs"></div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Dashboard component error:', error);
        reportError(error);
    }
}
