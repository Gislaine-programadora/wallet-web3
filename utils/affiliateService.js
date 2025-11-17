async function createAffiliateRelation(referrerId, referredId, referralCode) {
    try {
        const affiliateData = {
            referrerId,
            referredId,
            referralCode,
            commissionRate: 10, // 10%
            totalEarnings: 0,
            status: 'active'
        };
        
        return await trickleCreateObject('affiliate', affiliateData);
    } catch (error) {
        console.error('Error creating affiliate relation:', error);
    }
}

async function processAffiliateCommission(referredId, amount) {
    try {
        const affiliates = await trickleListObjects('affiliate', 100, true);
        const relation = affiliates.items.find(a => a.objectData.referredId === referredId);
        
        if (!relation) return;
        
        const commission = amount * (relation.objectData.commissionRate / 100);
        
        await trickleUpdateObject('affiliate', relation.objectId, {
            ...relation.objectData,
            totalEarnings: relation.objectData.totalEarnings + commission
        });
        
        // Add commission to referrer's balance
        const referrer = await trickleGetObject('player', relation.objectData.referrerId);
        await trickleUpdateObject('player', relation.objectData.referrerId, {
            ...referrer.objectData,
            balance: referrer.objectData.balance + commission
        });
        
        return commission;
    } catch (error) {
        console.error('Error processing affiliate commission:', error);
    }
}

async function getUserAffiliates(userId) {
    try {
        const affiliates = await trickleListObjects('affiliate', 100, true);
        return affiliates.items.filter(a => a.objectData.referrerId === userId);
    } catch (error) {
        console.error('Error getting user affiliates:', error);
        return [];
    }
}
