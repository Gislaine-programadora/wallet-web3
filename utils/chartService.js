function createChart(container) {
    try {
        const chart = LightweightCharts.createChart(container, {
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
            },
        });

        const candleSeries = chart.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        });

        return { chart, candleSeries };
    } catch (error) {
        console.error('Error creating chart:', error);
        throw error;
    }
}

function generateMockPriceData() {
    const basePrice = 2798300;
    const data = [];
    const now = new Date();
    
    for (let i = 100; i > 0; i--) {
        const time = new Date(now.getTime() - i * 60000);
        const variation = (Math.random() - 0.5) * 1000;
        const open = basePrice + variation;
        const high = open + Math.random() * 500;
        const low = open - Math.random() * 500;
        const close = (open + high + low) / 3;

        data.push({
            time: time.getTime() / 1000,
            open,
            high,
            low,
            close,
        });
    }
    return data;
}
