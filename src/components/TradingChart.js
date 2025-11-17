function TradingChart({ selectedPair }) {
    try {
        const chartContainerRef = React.useRef(null);
        const [chart, setChart] = React.useState(null);
        const [timeframe, setTimeframe] = React.useState('1H');
        const [indicators, setIndicators] = React.useState({
            sma: true,
            ema: false,
            rsi: false,
            macd: false,
            bollinger: false,
            volume: true
        });

        React.useEffect(() => {
            if (chartContainerRef.current) {
                if (chart) {
                    chart.remove();
                }

                const newChart = LightweightCharts.createChart(chartContainerRef.current, {
                    layout: {
                        background: { color: 'transparent' },
                        textColor: '#ffffff',
                    },
                    grid: {
                        vertLines: { color: 'rgba(255, 255, 255, 0.1)' },
                        horzLines: { color: 'rgba(255, 255, 255, 0.1)' },
                    },
                    timeScale: {
                        timeVisible: true,
                        secondsVisible: false,
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    rightPriceScale: {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    crosshair: {
                        mode: LightweightCharts.CrosshairMode.Normal,
                    },
                });

                const candleSeries = newChart.addCandlestickSeries({
                    upColor: '#00d4aa',
                    downColor: '#ff6b6b',
                    borderVisible: false,
                    wickUpColor: '#00d4aa',
                    wickDownColor: '#ff6b6b',
                });

                const data = generateCandlestickData(selectedPair);
                candleSeries.setData(data);

                if (indicators.sma) {
                    const smaData = calculateSMA(data, 20);
                    const smaSeries = newChart.addLineSeries({
                        color: '#ffa726',
                        lineWidth: 2,
                        title: 'SMA 20',
                    });
                    smaSeries.setData(smaData);
                }

                if (indicators.ema) {
                    const emaData = calculateEMA(data, 12);
                    const emaSeries = newChart.addLineSeries({
                        color: '#42a5f5',
                        lineWidth: 2,
                        title: 'EMA 12',
                    });
                    emaSeries.setData(emaData);
                }

                if (indicators.bollinger) {
                    const bollingerData = calculateBollingerBands(data);
                    
                    const upperBand = newChart.addLineSeries({
                        color: '#9c27b0',
                        lineWidth: 1,
                        title: 'BB Upper',
                    });
                    const lowerBand = newChart.addLineSeries({
                        color: '#9c27b0',
                        lineWidth: 1,
                        title: 'BB Lower',
                    });
                    
                    upperBand.setData(bollingerData.map(item => ({ time: item.time, value: item.upper })));
                    lowerBand.setData(bollingerData.map(item => ({ time: item.time, value: item.lower })));
                }

                if (indicators.volume) {
                    const volumeData = calculateVolume(data);
                    const volumeSeries = newChart.addHistogramSeries({
                        color: '#26a69a',
                        priceFormat: {
                            type: 'volume',
                        },
                        priceScaleId: 'volume',
                    });
                    volumeSeries.setData(volumeData);
                    
                    newChart.priceScale('volume').applyOptions({
                        scaleMargins: {
                            top: 0.8,
                            bottom: 0,
                        },
                    });
                }

                setChart(newChart);

                const interval = setInterval(() => {
                    const lastCandle = data[data.length - 1];
                    const newTime = lastCandle.time + 3600;
                    const variation = (Math.random() - 0.5) * 0.02;
                    const newPrice = lastCandle.close * (1 + variation);
                    
                    const newCandle = {
                        time: newTime,
                        open: lastCandle.close,
                        high: Math.max(lastCandle.close, newPrice),
                        low: Math.min(lastCandle.close, newPrice),
                        close: newPrice,
                    };
                    
                    candleSeries.update(newCandle);
                }, 3000);

                return () => {
                    clearInterval(interval);
                };
            }
        }, [selectedPair, indicators]);

        const toggleIndicator = (indicator) => {
            setIndicators(prev => ({
                ...prev,
                [indicator]: !prev[indicator]
            }));
        };

        return (
            <div className="bg-card rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold">Advanced Chart - {selectedPair}</h3>
                    <div className="flex space-x-2">
                        <button 
                            onClick={() => toggleIndicator('sma')}
                            className={`px-2 py-1 text-xs rounded ${
                                indicators.sma ? 'bg-orange-600 text-white' : 'bg-gray-700 text-gray-300'
                            }`}
                        >
                            SMA
                        </button>
                        <button 
                            onClick={() => toggleIndicator('ema')}
                            className={`px-2 py-1 text-xs rounded ${
                                indicators.ema ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                            }`}
                        >
                            EMA
                        </button>
                        <button 
                            onClick={() => toggleIndicator('bollinger')}
                            className={`px-2 py-1 text-xs rounded ${
                                indicators.bollinger ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
                            }`}
                        >
                            BB
                        </button>
                        <button 
                            onClick={() => toggleIndicator('macd')}
                            className={`px-2 py-1 text-xs rounded ${
                                indicators.macd ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'
                            }`}
                        >
                            MACD
                        </button>
                        <button 
                            onClick={() => toggleIndicator('volume')}
                            className={`px-2 py-1 text-xs rounded ${
                                indicators.volume ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'
                            }`}
                        >
                            VOL
                        </button>
                    </div>
                </div>
                
                <div className="h-96" ref={chartContainerRef}></div>
                
                <div className="flex space-x-2 mt-4">
                    {['1m', '5m', '15m', '1H', '4H', '1D'].map((tf) => (
                        <button
                            key={tf}
                            onClick={() => setTimeframe(tf)}
                            className={`px-3 py-1 text-xs rounded ${
                                timeframe === tf ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                            }`}
                        >
                            {tf}
                        </button>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('TradingChart component error:', error);
        return null;
    }
}
