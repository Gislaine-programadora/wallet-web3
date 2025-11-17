async function calculateWeeklyCashback(userId) {
    try {
        const transactions = await trickleListObjects('transaction', 100, true);
        const userTransactions = transactions.items.filter(
            t => t.objectData.userId === userId && 
            t.objectData.type === 'game_loss' &&
            isThisWeek(new Date(t.createdAt))
        );
        
        const totalBets = userTransactions.reduce((sum, t) => sum + t.objectData.amount, 0);
        const cashbackRate = 5; // 5%
        const cashbackAmount = totalBets * (cashbackRate / 100);
        
        if (cashbackAmount > 0) {
            const cashbackData = {
                userId,
                totalBets,
                cashbackRate,
                cashbackAmount,
                status: 'pending',
                period: getWeekPeriod()
            };
            
            return await trickleCreateObject('cashback', cashbackData);
        }
        
        return null;
    } catch (error) {
        console.error('Error calculating cashback:', error);
    }
}

async function processCashback(userId) {
    try {
        const pendingCashbacks = await trickleListObjects('cashback', 100, true);
        const userPending = pendingCashbacks.items.filter(
            c => c.objectData.userId === userId && c.objectData.status === 'pending'
        );
        
        let totalAmount = 0;
        for (const cashback of userPending) {
            totalAmount += cashback.objectData.cashbackAmount;
            await trickleUpdateObject('cashback', cashback.objectId, {
                ...cashback.objectData,
                status: 'paid'
            });
        }
        
        return totalAmount;
    } catch (error) {
        console.error('Error processing cashback:', error);
        return 0;
    }
}

function isThisWeek(date) {
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    const weekEnd = new Date(now.setDate(now.getDate() - now.getDay() + 6));
    return date >= weekStart && date <= weekEnd;
}

function getWeekPeriod() {
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    const weekEnd = new Date(now.setDate(now.getDate() - now.getDay() + 6));
    return `${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`;
}