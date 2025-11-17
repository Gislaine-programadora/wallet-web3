// Technical analysis utilities
function calculateSMA(data, period) {
    const result = [];
    for (let i = period - 1; i < data.length; i++) {
        const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b.close, 0);
        result.push({
            time: data[i].time,
            value: sum / period
        });
    }
    return result;
}

function calculateEMA(data, period) {
    const result = [];
    const multiplier = 2 / (period + 1);
    let ema = data[0].close;
    
    for (let i = 0; i < data.length; i++) {
        if (i === 0) {
            ema = data[i].close;
        } else {
            ema = (data[i].close - ema) * multiplier + ema;
        }
        result.push({
            time: data[i].time,
            value: ema
        });
    }
    return result;
}

function calculateRSI(data, period = 14) {
    const changes = [];
    for (let i = 1; i < data.length; i++) {
        changes.push(data[i].close - data[i - 1].close);
    }
    
    const result = [];
    for (let i = period; i < changes.length; i++) {
        const gains = changes.slice(i - period, i).filter(x => x > 0);
        const losses = changes.slice(i - period, i).filter(x => x < 0).map(x => Math.abs(x));
        
        const avgGain = gains.length > 0 ? gains.reduce((a, b) => a + b, 0) / period : 0;
        const avgLoss = losses.length > 0 ? losses.reduce((a, b) => a + b, 0) / period : 0;
        
        const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
        const rsi = 100 - (100 / (1 + rs));
        
        result.push({
            time: data[i + 1].time,
            value: rsi
        });
    }
    return result;
}

function generateCandlestickData(symbol, days = 30) {
    const data = [];
    const basePrice = getBasePrice(symbol);
    const now = new Date();
    
    for (let i = days * 24; i >= 0; i--) {
        const time = Math.floor((now.getTime() - i * 60 * 60 * 1000) / 1000);
        const variation = (Math.random() - 0.5) * 0.05;
        const open = basePrice * (1 + variation);
        const volatility = Math.random() * 0.03;
        
        const high = open * (1 + volatility);
        const low = open * (1 - volatility);
        const close = low + Math.random() * (high - low);
        
        data.push({ time, open, high, low, close });
    }
    
    return data;
}

function calculateMACD(data, fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) {
    const fastEMA = calculateEMA(data, fastPeriod);
    const slowEMA = calculateEMA(data, slowPeriod);
    
    const macdLine = [];
    for (let i = 0; i < Math.min(fastEMA.length, slowEMA.length); i++) {
        macdLine.push({
            time: fastEMA[i].time,
            value: fastEMA[i].value - slowEMA[i].value
        });
    }
    
    const signalLine = calculateEMA(macdLine.map(item => ({ close: item.value, time: item.time })), signalPeriod);
    const histogram = [];
    
    for (let i = 0; i < Math.min(macdLine.length, signalLine.length); i++) {
        histogram.push({
            time: macdLine[i].time,
            value: macdLine[i].value - signalLine[i].value
        });
    }
    
    return { macdLine, signalLine, histogram };
}

function calculateBollingerBands(data, period = 20, stdDev = 2) {
    const sma = calculateSMA(data, period);
    const bands = [];
    
    for (let i = period - 1; i < data.length; i++) {
        const slice = data.slice(i - period + 1, i + 1);
        const mean = slice.reduce((sum, item) => sum + item.close, 0) / period;
        const variance = slice.reduce((sum, item) => sum + Math.pow(item.close - mean, 2), 0) / period;
        const standardDeviation = Math.sqrt(variance);
        
        bands.push({
            time: data[i].time,
            upper: mean + (standardDeviation * stdDev),
            middle: mean,
            lower: mean - (standardDeviation * stdDev)
        });
    }
    
    return bands;
}

function calculateVolume(data) {
    return data.map(candle => ({
        time: candle.time,
        value: Math.random() * 1000000 + 500000 // Simulated volume
    }));
}

function calculateStochastic(data, kPeriod = 14, dPeriod = 3) {
    const stochK = [];
    
    for (let i = kPeriod - 1; i < data.length; i++) {
        const slice = data.slice(i - kPeriod + 1, i + 1);
        const highest = Math.max(...slice.map(item => item.high));
        const lowest = Math.min(...slice.map(item => item.low));
        const current = data[i].close;
        
        const k = ((current - lowest) / (highest - lowest)) * 100;
        stochK.push({
            time: data[i].time,
            value: k
        });
    }
    
    const stochD = calculateSMA(stochK.map(item => ({ close: item.value, time: item.time })), dPeriod);
    return { stochK, stochD };
}

function getBasePrice(symbol) {
    const prices = {
        'BTC/USDT': 43000,
        'ETH/USDT': 2650,
        'BNB/USDT': 310,
        'ADA/USDT': 0.48,
        'SOL/USDT': 98
    };
    return prices[symbol] || 100;
}
