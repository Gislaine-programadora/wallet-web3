function VolumeAnalysis({ selectedPair }) {
    try {
        const [volumeData, setVolumeData] = React.useState(null);

        React.useEffect(() => {
            generateVolumeAnalysis();
        }, [selectedPair]);

        const generateVolumeAnalysis = () => {
            const data = generateCandlestickData(selectedPair, 20);
            const volumes = calculateVolume(data);
            
            const avgVolume = volumes.reduce((sum, v) => sum + v.value, 0) / volumes.length;
            const currentVolume = volumes[volumes.length - 1].value;
            const volumeRatio = currentVolume / avgVolume;
            
            let volumeSignal = 'NORMAL';
            if (volumeRatio > 1.5) volumeSignal = 'HIGH';
            else if (volumeRatio < 0.5) volumeSignal = 'LOW';

            setVolumeData({
                current: currentVolume,
                average: avgVolume,
                ratio: volumeRatio,
                signal: volumeSignal
            });
        };

        if (!volumeData) return null;

        return (
            <div className="bg-card rounded-lg p-4">
                <h3 className="text-white font-semibold mb-4">Volume Analysis</h3>
                
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Current Volume:</span>
                        <span className="text-white">{(volumeData.current / 1000).toFixed(0)}K</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Avg Volume:</span>
                        <span className="text-gray-300">{(volumeData.average / 1000).toFixed(0)}K</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Volume Ratio:</span>
                        <span className={`${
                            volumeData.ratio > 1.5 ? 'text-green' : 
                            volumeData.ratio < 0.5 ? 'text-red' : 'text-white'
                        }`}>
                            {volumeData.ratio.toFixed(2)}x
                        </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Signal:</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                            volumeData.signal === 'HIGH' ? 'bg-green-900 text-green' :
                            volumeData.signal === 'LOW' ? 'bg-red-900 text-red' :
                            'bg-gray-800 text-gray-300'
                        }`}>
                            {volumeData.signal}
                        </span>
                    </div>
                </div>
                
                <div className="mt-4 p-3 bg-gray-800 rounded">
                    <div className="text-xs text-gray-400 mb-1">Volume Trend</div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                            className={`h-2 rounded-full ${
                                volumeData.ratio > 1.5 ? 'bg-green' : 
                                volumeData.ratio < 0.5 ? 'bg-red' : 'bg-blue-500'
                            }`}
                            style={{ width: `${Math.min(volumeData.ratio * 50, 100)}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('VolumeAnalysis component error:', error);
        return null;
    }
}