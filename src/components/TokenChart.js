function TokenChart({ symbol = 'CGB' }) {
    try {
        const chartContainerRef = React.useRef(null);
        const [chart, setChart] = React.useState(null);
        const [timeframe, setTimeframe] = React.useState('1H');

        React.useEffect(() => {
            if (chartContainerRef.current && window.LightweightCharts) {
                if (chart) {
                    chart.remove();
                }

                const newChart = window.LightweightCharts.createChart(chartContainerRef.current, {
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
                        mode: window.LightweightCharts.CrosshairMode.Normal,
                    },
                });

                const candleSeries = newChart.addCandlestickSeries({
                    upColor: '#4facfe',
                    downColor: '#f5576c',
                    borderVisible: false,
                    wickUpColor: '#4facfe',
                    wickDownColor: '#f5576c',
                });

                const data = generateChartData(symbol, timeframe);
                candleSeries.setData(data);

                // Add volume
                const volumeData = data.map(candle => ({
                    time: candle.time,
                    value: Math.random() * 1000000 + 500000
                }));

                const volumeSeries = newChart.addHistogramSeries({
                    color: '#4facfe',
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

                setChart(newChart);

                // Real-time updates
                const interval = setInterval(() => {
                    const lastCandle = data[data.length - 1];
                    const newTime = lastCandle.time + 60;
                    const variation = (Math.random() - 0.5) * 0.02;
                    const basePrice = symbol === 'CGB' ? 47632200 : 112.00;
                    const newPrice = basePrice * (1 + variation);
                    
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
        }, [symbol, timeframe]);

        return (
            <div className="card-glass p-6 m-4">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-white">Gráfico {symbol}</h3>
                        <p className="text-sm text-gray-300">Preço em tempo real</p>
                    </div>
                    <div className="flex space-x-2">
                        {['1H', '4H', '1D', '1W'].map((tf) => (
                            <button
                                key={tf}
                                onClick={() => setTimeframe(tf)}
                                className={`px-3 py-1 text-sm rounded-lg transition-all ${
                                    timeframe === tf 
                                        ? 'btn-primary' 
                                        : 'bg-white bg-opacity-10 hover:bg-opacity-20 text-white'
                                }`}
                            >
                                {tf}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="h-96" ref={chartContainerRef}></div>
            </div>
        );
    } catch (error) {
        console.error('TokenChart component error:', error);
        return null;
    }
}