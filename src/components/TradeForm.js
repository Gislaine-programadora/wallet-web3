function TradeForm({ onTrade, isConnected }) {
    try {
        const [amount, setAmount] = React.useState('');
        const [type, setType] = React.useState('buy');
        const [message, setMessage] = React.useState('');

        const handleTrade = () => {
            if (!isConnected) {
                setMessage('Please connect your wallet first!');
                return;
            }
            
            const value = parseFloat(amount);
            if (!value || value <= 0) {
                setMessage('Please enter a valid amount');
                return;
            }

            onTrade(type, value);
            setMessage(`Successfully ${type === 'buy' ? 'bought' : 'sold'} ${value} BYT!`);
            setAmount('');
            
            setTimeout(() => setMessage(''), 3000);
        };

        return (
            <div className="bg-blue-800/30 backdrop-blur-sm rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">Trade BYT</h2>
                
                <div className="flex gap-2 mb-4">
                    <button 
                        className={`flex-1 py-2 rounded-lg transition-colors ${
                            type === 'buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'
                        }`}
                        onClick={() => setType('buy')}
                    >
                        Buy
                    </button>
                    <button 
                        className={`flex-1 py-2 rounded-lg transition-colors ${
                            type === 'sell' ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
                        }`}
                        onClick={() => setType('sell')}
                    >
                        Sell
                    </button>
                </div>

                <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-3 rounded-lg bg-blue-900/50 border border-blue-600 mb-4 text-white placeholder-blue-300"
                    min="0"
                    step="0.01"
                />

                <button 
                    onClick={handleTrade}
                    className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition-colors"
                >
                    <i className="fas fa-exchange-alt mr-2"></i>
                    {type === 'buy' ? 'Buy' : 'Sell'} BYT
                </button>

                {message && (
                    <div className={`mt-4 p-3 rounded-lg text-sm ${
                        message.includes('Successfully') 
                            ? 'bg-green-600/20 text-green-300 border border-green-600/30' 
                            : 'bg-red-600/20 text-red-300 border border-red-600/30'
                    }`}>
                        {message}
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('TradeForm error:', error);
        reportError(error);
    }
}
