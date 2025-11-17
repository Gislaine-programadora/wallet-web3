function BacktestingPanel({ marketData }) {
    try {
        const [strategy, setStrategy] = React.useState({
            type: 'sma_crossover',
            fastPeriod: 10,
            slowPeriod: 20,
            rsiOverbought: 70,
            rsiOversold: 30,
            initialCapital: 10000
        });
        const [results, setResults] = React.useState(null);
        const [isRunning, setIsRunning] = React.useState(false);

        const runBacktest = async () => {
            setIsRunning(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                const data = generateCandlestickData('BTC/USDT', 100);
                const trades = simulateStrategy(data, strategy);
                
                const totalReturn = ((trades.finalValue - strategy.initialCapital) / strategy.initialCapital) * 100;
                const winRate = (trades.wins / trades.totalTrades) * 100;
                
                setResults({
                    totalTrades: trades.totalTrades,
                    wins: trades.wins,
                    losses: trades.losses,
                    winRate: winRate,
                    totalReturn: totalReturn,
                    finalValue: trades.finalValue,
                    maxDrawdown: trades.maxDrawdown,
                    sharpeRatio: calculateSharpeRatio(trades.returns)
                });
            } catch (error) {
                console.error('Backtest error:', error);
            } finally {
                setIsRunning(false);
            }
        };

        const simulateStrategy = (data, strategy) => {
            let capital = strategy.initialCapital;
            let position = 0;
            let trades = [];
            let wins = 0;
            let losses = 0;
            let returns = [];
            let maxDrawdown = 0;
            let peak = capital;

            const smaFast = calculateSMA(data, strategy.fastPeriod);
            const smaSlow = calculateSMA(data, strategy.slowPeriod);
            const rsiData = calculateRSI(data);

            for (let i = Math.max(strategy.slowPeriod, 14); i < data.length; i++) {
                const price = data[i].close;
                const fastSMA = smaFast[i - strategy.fastPeriod + 1]?.value;
                const slowSMA = smaSlow[i - strategy.slowPeriod + 1]?.value;
                const rsi = rsiData[i - 14]?.value;

                if (strategy.type === 'sma_crossover' && fastSMA && slowSMA) {
                    if (fastSMA > slowSMA && position === 0) {
                        position = capital / price;
                        capital = 0;
                    } else if (fastSMA < slowSMA && position > 0) {
                        capital = position * price;
                        const returnPct = (capital - strategy.initialCapital) / strategy.initialCapital;
                        returns.push(returnPct);
                        if (capital > strategy.initialCapital) wins++;
                        else losses++;
                        position = 0;
                    }
                }

                const currentValue = position > 0 ? position * price : capital;
                if (currentValue > peak) peak = currentValue;
                const drawdown = (peak - currentValue) / peak;
                if (drawdown > maxDrawdown) maxDrawdown = drawdown;
            }

            const finalValue = position > 0 ? position * data[data.length - 1].close : capital;
            
            return {
                totalTrades: wins + losses,
                wins,
                losses,
                finalValue,
                maxDrawdown: maxDrawdown * 100,
                returns
            };
        };

        const calculateSharpeRatio = (returns) => {
            if (returns.length === 0) return 0;
            const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
            const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - avgReturn, 2), 0) / returns.length;
            const stdDev = Math.sqrt(variance);
            return stdDev === 0 ? 0 : avgReturn / stdDev;
        };

        return (
            <div className="p-6 space-y-6">
                <h2 className="text-2xl font-bold text-white">Strategy Backtesting</h2>
                
                <div className="bg-card rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Strategy Configuration</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-white">Strategy Type</label>
                            <select
                                value={strategy.type}
                                onChange={(e) => setStrategy({...strategy, type: e.target.value})}
                                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                            >
                                <option value="sma_crossover">SMA Crossover</option>
                                <option value="rsi_oversold">RSI Oversold/Overbought</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium mb-2 text-white">Initial Capital</label>
                            <input
                                type="number"
                                value={strategy.initialCapital}
                                onChange={(e) => setStrategy({...strategy, initialCapital: parseFloat(e.target.value)})}
                                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium mb-2 text-white">Fast SMA Period</label>
                            <input
                                type="number"
                                value={strategy.fastPeriod}
                                onChange={(e) => setStrategy({...strategy, fastPeriod: parseInt(e.target.value)})}
                                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium mb-2 text-white">Slow SMA Period</label>
                            <input
                                type="number"
                                value={strategy.slowPeriod}
                                onChange={(e) => setStrategy({...strategy, slowPeriod: parseInt(e.target.value)})}
                                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                            />
                        </div>
                    </div>
                    
                    <button 
                        onClick={runBacktest}
                        disabled={isRunning}
                        className="btn-buy px-6 py-3 mt-4"
                    >
                        {isRunning ? 'Running Backtest...' : 'Run Backtest'}
                    </button>
                </div>

                {results && (
                    <div className="bg-card rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Backtest Results</h3>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-gray-800 p-4 rounded">
                                <div className="text-gray-400 text-sm">Total Return</div>
                                <div className={`text-xl font-bold ${results.totalReturn >= 0 ? 'text-green' : 'text-red'}`}>
                                    {results.totalReturn.toFixed(2)}%
                                </div>
                            </div>
                            
                            <div className="bg-gray-800 p-4 rounded">
                                <div className="text-gray-400 text-sm">Win Rate</div>
                                <div className="text-xl font-bold text-white">
                                    {results.winRate.toFixed(1)}%
                                </div>
                            </div>
                            
                            <div className="bg-gray-800 p-4 rounded">
                                <div className="text-gray-400 text-sm">Total Trades</div>
                                <div className="text-xl font-bold text-white">
                                    {results.totalTrades}
                                </div>
                            </div>
                            
                            <div className="bg-gray-800 p-4 rounded">
                                <div className="text-gray-400 text-sm">Max Drawdown</div>
                                <div className="text-xl font-bold text-red">
                                    {results.maxDrawdown.toFixed(2)}%
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="bg-gray-800 p-4 rounded">
                                <div className="text-gray-400 text-sm">Final Value</div>
                                <div className="text-lg font-bold text-white">
                                    ${results.finalValue.toLocaleString()}
                                </div>
                            </div>
                            
                            <div className="bg-gray-800 p-4 rounded">
                                <div className="text-gray-400 text-sm">Sharpe Ratio</div>
                                <div className="text-lg font-bold text-white">
                                    {results.sharpeRatio.toFixed(2)}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('BacktestingPanel component error:', error);
        return null;
    }
}