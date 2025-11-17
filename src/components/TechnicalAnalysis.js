function TechnicalAnalysis({ selectedPair, marketData }) {
    try {
        const [analysis, setAnalysis] = React.useState(null);

        React.useEffect(() => {
            generateAnalysis();
        }, [selectedPair]);

        const generateAnalysis = () => {
            const data = generateCandlestickData(selectedPair, 30);
            const rsiData = calculateRSI(data);
            const smaData = calculateSMA(data, 20);
            const macdData = calculateMACD(data);
            const bollingerData = calculateBollingerBands(data);
            const stochData = calculateStochastic(data);
            
            const currentPrice = data[data.length - 1].close;
            const currentRSI = rsiData[rsiData.length - 1]?.value || 50;
            const currentSMA = smaData[smaData.length - 1]?.value || currentPrice;
            const currentMACD = macdData.macdLine[macdData.macdLine.length - 1]?.value || 0;
            const currentSignal = macdData.signalLine[macdData.signalLine.length - 1]?.value || 0;
            const currentBB = bollingerData[bollingerData.length - 1] || { upper: currentPrice * 1.02, lower: currentPrice * 0.98 };
            const currentStochK = stochData.stochK[stochData.stochK.length - 1]?.value || 50;
            
            let signal = 'NEUTRAL';
            let strength = 'MEDIUM';
            let signals = [];
            
            // RSI Analysis
            if (currentRSI > 70) signals.push('SELL');
            else if (currentRSI < 30) signals.push('BUY');
            
            // SMA Analysis  
            if (currentPrice > currentSMA) signals.push('BUY');
            else if (currentPrice < currentSMA) signals.push('SELL');
            
            // MACD Analysis
            if (currentMACD > currentSignal) signals.push('BUY');
            else if (currentMACD < currentSignal) signals.push('SELL');
            
            // Bollinger Bands Analysis
            if (currentPrice > currentBB.upper) signals.push('SELL');
            else if (currentPrice < currentBB.lower) signals.push('BUY');
            
            // Stochastic Analysis
            if (currentStochK > 80) signals.push('SELL');
            else if (currentStochK < 20) signals.push('BUY');
            
            const buySignals = signals.filter(s => s === 'BUY').length;
            const sellSignals = signals.filter(s => s === 'SELL').length;
            
            if (buySignals > sellSignals) {
                signal = 'BUY';
                strength = buySignals >= 3 ? 'STRONG' : 'WEAK';
            } else if (sellSignals > buySignals) {
                signal = 'SELL';
                strength = sellSignals >= 3 ? 'STRONG' : 'WEAK';
            }

            setAnalysis({
                signal,
                strength,
                rsi: currentRSI,
                sma: currentSMA,
                macd: currentMACD,
                signal: currentSignal,
                price: currentPrice,
                support: currentBB.lower,
                resistance: currentBB.upper,
                stochastic: currentStochK,
                buySignals,
                sellSignals
            });
        };

        if (!analysis) return null;

        const getSignalColor = (signal) => {
            switch (signal) {
                case 'BUY': return 'text-green bg-green-900';
                case 'SELL': return 'text-red bg-red-900';
                default: return 'text-yellow-400 bg-yellow-900';
            }
        };

        return (
            <div className="bg-card rounded-lg p-4">
                <h3 className="text-white font-semibold mb-4">Technical Analysis</h3>
                
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Signal:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getSignalColor(analysis.signal)}`}>
                            {analysis.signal} ({analysis.strength})
                        </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">RSI (14):</span>
                        <span className={`text-sm ${
                            analysis.rsi > 70 ? 'text-red' : 
                            analysis.rsi < 30 ? 'text-green' : 'text-white'
                        }`}>
                            {analysis.rsi.toFixed(2)}
                        </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">MACD:</span>
                        <span className={`text-sm ${analysis.macd > analysis.signal ? 'text-green' : 'text-red'}`}>
                            {analysis.macd?.toFixed(4) || '0.0000'}
                        </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Stochastic:</span>
                        <span className={`text-sm ${
                            analysis.stochastic > 80 ? 'text-red' : 
                            analysis.stochastic < 20 ? 'text-green' : 'text-white'
                        }`}>
                            {analysis.stochastic?.toFixed(2) || '50.00'}
                        </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Support (BB):</span>
                        <span className="text-green">${analysis.support?.toFixed(2) || '0.00'}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Resistance (BB):</span>
                        <span className="text-red">${analysis.resistance?.toFixed(2) || '0.00'}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Signals:</span>
                        <span className="text-white text-sm">
                            {analysis.buySignals}B / {analysis.sellSignals}S
                        </span>
                    </div>
                </div>
                
                <div className="mt-4 p-3 bg-gray-800 rounded">
                    <div className="text-xs text-gray-400 mb-1">RSI Indicator</div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                            className={`h-2 rounded-full ${
                                analysis.rsi > 70 ? 'bg-red' : 
                                analysis.rsi < 30 ? 'bg-green' : 'bg-yellow-400'
                            }`}
                            style={{ width: `${analysis.rsi}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>0</span>
                        <span>50</span>
                        <span>100</span>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('TechnicalAnalysis component error:', error);
        return null;
    }
}