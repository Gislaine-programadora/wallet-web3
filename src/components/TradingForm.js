function TradingForm({ crypto, price, balance, onTrade }) {
    try {
        const [amount, setAmount] = React.useState('');
        const [type, setType] = React.useState('buy');

        const handleSubmit = (e) => {
            e.preventDefault();
            const value = parseFloat(amount);
            if (!isNaN(value) && value > 0) {
                onTrade(type, value);
                setAmount('');
            }
        };

        return (
            <form data-name="trading-form" className="trading-form p-6 rounded-lg" onSubmit={handleSubmit}>
                <div data-name="form-header" className="flex justify-between mb-4">
                    <h3 className="text-lg font-semibold">Trade {crypto}</h3>
                    <p className="text-gray-400">Current Price: ${price?.toFixed(2)}</p>
                </div>

                <div data-name="trade-type" className="flex gap-2 mb-4">
                    <button
                        type="button"
                        data-name="buy-button"
                        className={`flex-1 py-2 rounded-lg ${
                            type === 'buy' ? 'bg-green-600' : 'bg-slate-700'
                        }`}
                        onClick={() => setType('buy')}
                    >
                        Buy
                    </button>
                    <button
                        type="button"
                        data-name="sell-button"
                        className={`flex-1 py-2 rounded-lg ${
                            type === 'sell' ? 'bg-red-600' : 'bg-slate-700'
                        }`}
                        onClick={() => setType('sell')}
                    >
                        Sell
                    </button>
                </div>

                <input
                    type="number"
                    data-name="amount-input"
                    className="w-full bg-slate-800 p-3 rounded-lg mb-4"
                    placeholder="Enter amount in USD"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                <button
                    type="submit"
                    data-name="submit-trade"
                    className="w-full button-primary py-3 rounded-lg"
                >
                    {type === 'buy' ? 'Buy' : 'Sell'} {crypto}
                </button>
            </form>
        );
    } catch (error) {
        console.error('TradingForm component error:', error);
        reportError(error);
        return null;
    }
}
