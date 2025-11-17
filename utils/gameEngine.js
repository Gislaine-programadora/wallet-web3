function generateSpinResult(symbols) {
    try {
        const reels = [
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)]
        ];
        
        let multiplier = 0;
        let win = 0;
        
        // Check for winning combinations
        if (reels[0] === reels[1] && reels[1] === reels[2]) {
            // Three of a kind
            switch (reels[0]) {
                case '🐅': // Tiger - highest payout
                    multiplier = 100;
                    break;
                case '💎': // Diamond
                    multiplier = 50;
                    break;
                case '💰': // Money bag
                    multiplier = 25;
                    break;
                case '🔥': // Fire
                    multiplier = 20;
                    break;
                case '⭐': // Star
                    multiplier = 15;
                    break;
                case '🍀': // Lucky clover
                    multiplier = 10;
                    break;
                case '🎰': // Slot machine
                    multiplier = 5;
                    break;
            }
        } else if (reels[0] === reels[1] || reels[1] === reels[2] || reels[0] === reels[2]) {
            // Two of a kind
            const symbol = reels[0] === reels[1] ? reels[0] : 
                          reels[1] === reels[2] ? reels[1] : reels[0];
            
            switch (symbol) {
                case '🐅':
                    multiplier = 10;
                    break;
                case '💎':
                    multiplier = 5;
                    break;
                case '💰':
                    multiplier = 3;
                    break;
                default:
                    multiplier = 2;
                    break;
            }
        }
        
        // Special bonus: any two tigers
        const tigerCount = reels.filter(symbol => symbol === '🐅').length;
        if (tigerCount === 2 && multiplier === 0) {
            multiplier = 5;
        }
        
        // Random bonus chance (5%)
        if (multiplier === 0 && Math.random() < 0.05) {
            multiplier = 3;
        }
        
        return {
            reels: reels,
            multiplier: multiplier,
            win: multiplier > 0 ? multiplier * 10 : 0 // Base win amount
        };
    } catch (error) {
        console.error('Game engine error:', error);
        return {
            reels: ['🎰', '🎰', '🎰'],
            multiplier: 0,
            win: 0
        };
    }
}

function getPayoutTable() {
    return {
        '🐅🐅🐅': { multiplier: 100, name: 'Triple Tiger' },
        '💎💎💎': { multiplier: 50, name: 'Triple Diamond' },
        '💰💰💰': { multiplier: 25, name: 'Triple Money' },
        '🔥🔥🔥': { multiplier: 20, name: 'Triple Fire' },
        '⭐⭐⭐': { multiplier: 15, name: 'Triple Star' },
        '🍀🍀🍀': { multiplier: 10, name: 'Triple Clover' },
        '🎰🎰🎰': { multiplier: 5, name: 'Triple Slot' },
        '🐅🐅': { multiplier: 10, name: 'Double Tiger' },
        '💎💎': { multiplier: 5, name: 'Double Diamond' },
        '💰💰': { multiplier: 3, name: 'Double Money' },
        'Any Double': { multiplier: 2, name: 'Any Pair' }
    };
}

function calculateWinAmount(bet, multiplier) {
    try {
        return bet * multiplier;
    } catch (error) {
        console.error('Win calculation error:', error);
        return 0;
    }
}
