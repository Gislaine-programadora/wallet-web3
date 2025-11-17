function NotificationCenter({ isOpen, onClose, user, notifications, onRefresh }) {
    try {
        const unreadCount = notifications?.filter(n => !n.objectData.isRead).length || 0;

        const handleMarkAsRead = async (notificationId) => {
            try {
                await markAsRead(notificationId);
                onRefresh();
            } catch (error) {
                console.error('Error marking as read:', error);
            }
        };

        const getPriorityColor = (priority) => {
            switch (priority) {
                case 'high': return 'border-l-red-500 bg-red-900 bg-opacity-20';
                case 'medium': return 'border-l-yellow-500 bg-yellow-900 bg-opacity-20';
                default: return 'border-l-blue-500 bg-blue-900 bg-opacity-20';
            }
        };

        const getTypeIcon = (type) => {
            switch (type) {
                case 'transaction': return '💳';
                case 'bonus': return '🎁';
                case 'game': return '🎰';
                default: return '🔔';
            }
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="game-card p-8 w-full max-w-lg mx-4 h-5/6 overflow-hidden">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-3">
                            <h2 className="text-2xl font-bold text-yellow-400">🔔 Notificações</h2>
                            {unreadCount > 0 && (
                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                    {unreadCount}
                                </span>
                            )}
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-white">
                            <div className="icon-x text-xl"></div>
                        </button>
                    </div>

                    <div className="overflow-y-auto h-full">
                        {notifications.length === 0 ? (
                            <div className="text-center py-8">
                                <div className="text-4xl mb-4">🔔</div>
                                <p className="text-gray-400">Nenhuma notificação</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.objectId}
                                        className={`p-4 rounded-lg border-l-4 cursor-pointer transition-all ${
                                            getPriorityColor(notification.objectData.priority)
                                        } ${!notification.objectData.isRead ? 'opacity-100' : 'opacity-60'}`}
                                        onClick={() => !notification.objectData.isRead && handleMarkAsRead(notification.objectId)}
                                    >
                                        <div className="flex items-start space-x-3">
                                            <div className="text-xl mt-1">{getTypeIcon(notification.objectData.type)}</div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="text-white font-semibold">
                                                        {notification.objectData.title}
                                                    </h3>
                                                    <div className="text-xs text-gray-400">
                                                        {new Date(notification.createdAt).toLocaleString()}
                                                    </div>
                                                </div>
                                                <p className="text-gray-300 mt-1">
                                                    {notification.objectData.message}
                                                </p>
                                                {!notification.objectData.isRead && (
                                                    <div className="mt-2">
                                                        <span className="text-xs text-blue-400">
                                                            Clique para marcar como lida
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('NotificationCenter error:', error);
        return null;
    }
}