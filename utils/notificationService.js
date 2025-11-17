async function createNotification(userId, title, message, type = 'system', priority = 'medium') {
    try {
        const notificationData = {
            userId,
            title,
            message,
            type,
            isRead: false,
            priority
        };

        const notification = await trickleCreateObject('notification', notificationData);
        
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, {
                body: message,
                icon: '🐅'
            });
        }

        return notification;
    } catch (error) {
        console.error('Error creating notification:', error);
    }
}

async function getUserNotifications(userId) {
    try {
        const notifications = await trickleListObjects('notification', 100, true);
        return notifications.items.filter(n => n.objectData.userId === userId);
    } catch (error) {
        console.error('Error getting notifications:', error);
        return [];
    }
}

async function markAsRead(notificationId) {
    try {
        const notification = await trickleGetObject('notification', notificationId);
        await trickleUpdateObject('notification', notificationId, {
            ...notification.objectData,
            isRead: true
        });
    } catch (error) {
        console.error('Error marking notification as read:', error);
    }
}

async function createTransaction(userId, type, amount, status, pixKey, description) {
    try {
        const transactionData = {
            userId,
            type,
            amount,
            status,
            pixKey,
            description
        };
        
        return await trickleCreateObject('transaction', transactionData);
    } catch (error) {
        console.error('Error creating transaction:', error);
    }
}