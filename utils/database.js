async function createOrGetUser(name) {
    try {
        const users = await trickleListObjects('player', 100, true);
        const existingUser = users.items.find(u => u.objectData.name === name);
        
        if (existingUser) {
            return existingUser;
        }
        
        const userData = {
            name: name,
            balance: 1000,
            totalWins: 0,
            totalLosses: 0,
            biggestWin: 0,
            createdAt: new Date().toISOString()
        };
        
        return await trickleCreateObject('player', userData);
    } catch (error) {
        console.error('Error creating/getting user:', error);
        throw error;
    }
}

async function updateUserBalance(userId, newBalance) {
    try {
        const user = await trickleGetObject('player', userId);
        await trickleUpdateObject('player', userId, {
            ...user.objectData,
            balance: newBalance
        });
    } catch (error) {
        console.error('Error updating balance:', error);
    }
}

async function getAllUsers() {
    try {
        const result = await trickleListObjects('player', 100, true);
        return result.items;
    } catch (error) {
        console.error('Error getting users:', error);
        return [];
    }
}

async function recordGameResult(userId, bet, win, multiplier) {
    try {
        const gameData = {
            userId: userId,
            bet: bet,
            win: win,
            multiplier: multiplier,
            timestamp: new Date().toISOString()
        };
        
        return await trickleCreateObject('game_result', gameData);
    } catch (error) {
        console.error('Error recording game:', error);
    }
}