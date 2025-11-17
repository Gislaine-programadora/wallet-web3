function AlertsPanel({ user, marketData }) {
    try {
        const [alerts, setAlerts] = React.useState([]);
        const [showCreateAlert, setShowCreateAlert] = React.useState(false);
        const [newAlert, setNewAlert] = React.useState({
            symbol: 'BTC/USDT',
            targetPrice: '',
            condition: 'above',
            message: ''
        });

        React.useEffect(() => {
            loadAlerts();
            const interval = setInterval(() => {
                checkAlerts();
            }, 5000);
            return () => clearInterval(interval);
        }, [user]);

        const loadAlerts = async () => {
            if (user) {
                const userAlerts = await getUserAlerts(user.objectId);
                setAlerts(userAlerts);
            }
        };

        const handleCreateAlert = async (e) => {
            e.preventDefault();
            try {
                await createAlert({
                    userId: user.objectId,
                    symbol: newAlert.symbol,
                    targetPrice: parseFloat(newAlert.targetPrice),
                    condition: newAlert.condition,
                    message: newAlert.message || `Price alert for ${newAlert.symbol}`,
                    isActive: true
                });
                
                setNewAlert({ symbol: 'BTC/USDT', targetPrice: '', condition: 'above', message: '' });
                setShowCreateAlert(false);
                loadAlerts();
            } catch (error) {
                console.error('Error creating alert:', error);
            }
        };

        const checkAlerts = async () => {
            if (!user || alerts.length === 0) return;
            
            for (const alert of alerts) {
                const currentPrice = marketData[alert.objectData.symbol]?.price;
                if (!currentPrice || alert.objectData.triggered) continue;
                
                const shouldTrigger = 
                    (alert.objectData.condition === 'above' && currentPrice >= alert.objectData.targetPrice) ||
                    (alert.objectData.condition === 'below' && currentPrice <= alert.objectData.targetPrice);
                
                if (shouldTrigger) {
                    try {
                        await trickleUpdateObject('alert', alert.objectId, {
                            ...alert.objectData,
                            triggered: true,
                            isActive: false
                        });
                        
                        if (Notification.permission === 'granted') {
                            new Notification(`Price Alert: ${alert.objectData.symbol}`, {
                                body: `Price ${alert.objectData.condition} $${alert.objectData.targetPrice}. Current: $${currentPrice.toFixed(2)}`,
                                icon: '/favicon.ico'
                            });
                        }
                        
                        loadAlerts();
                    } catch (error) {
                        console.error('Error updating alert:', error);
                    }
                }
            }
        };

        const handleDeleteAlert = async (alertId) => {
            try {
                await deleteAlert(alertId);
                loadAlerts();
            } catch (error) {
                console.error('Error deleting alert:', error);
            }
        };

        const requestNotificationPermission = () => {
            if ('Notification' in window && Notification.permission === 'default') {
                Notification.requestPermission();
            }
        };

        React.useEffect(() => {
            requestNotificationPermission();
        }, []);

        return (
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">Price Alerts</h2>
                    <button 
                        onClick={() => setShowCreateAlert(true)}
                        className="btn-buy px-4 py-2"
                    >
                        <div className="icon-plus text-sm mr-2 inline-block"></div>
                        Create Alert
                    </button>
                </div>

                {showCreateAlert && (
                    <div className="bg-card rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Create New Alert</h3>
                        <form onSubmit={handleCreateAlert} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-white">Symbol</label>
                                    <select
                                        value={newAlert.symbol}
                                        onChange={(e) => setNewAlert({...newAlert, symbol: e.target.value})}
                                        className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                    >
                                        {Object.keys(marketData).map(symbol => (
                                            <option key={symbol} value={symbol}>{symbol}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-white">Condition</label>
                                    <select
                                        value={newAlert.condition}
                                        onChange={(e) => setNewAlert({...newAlert, condition: e.target.value})}
                                        className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                    >
                                        <option value="above">Above</option>
                                        <option value="below">Below</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2 text-white">Target Price</label>
                                <input
                                    type="number"
                                    value={newAlert.targetPrice}
                                    onChange={(e) => setNewAlert({...newAlert, targetPrice: e.target.value})}
                                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                    placeholder="Enter target price"
                                    required
                                />
                            </div>
                            
                            <div className="flex space-x-3">
                                <button type="submit" className="btn-buy px-6 py-2">Create Alert</button>
                                <button 
                                    type="button" 
                                    onClick={() => setShowCreateAlert(false)}
                                    className="bg-gray-600 px-6 py-2 rounded text-white"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="bg-card rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Active Alerts</h3>
                    
                    {alerts.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="icon-bell text-4xl text-gray-400 mb-4"></div>
                            <p className="text-gray-400">No alerts created yet</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {alerts.map((alert) => (
                                <div key={alert.objectId} className="flex justify-between items-center p-4 bg-gray-800 rounded">
                                    <div>
                                        <div className="font-semibold text-white">{alert.objectData.symbol}</div>
                                        <div className="text-sm text-gray-400">
                                            Alert when price goes {alert.objectData.condition} ${alert.objectData.targetPrice}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Created: {new Date(alert.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handleDeleteAlert(alert.objectId)}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        <div className="icon-trash-2 text-lg"></div>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('AlertsPanel component error:', error);
        return null;
    }
}