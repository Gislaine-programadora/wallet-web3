async function createTournament(name, description, entryFee, prizePool, maxParticipants, startDate, endDate) {
    try {
        const tournamentData = {
            name,
            description,
            entryFee,
            prizePool,
            maxParticipants,
            currentParticipants: 0,
            startDate,
            endDate,
            status: 'upcoming',
            isActive: true
        };
        
        return await trickleCreateObject('tournament', tournamentData);
    } catch (error) {
        console.error('Error creating tournament:', error);
    }
}

async function getTournaments() {
    try {
        const result = await trickleListObjects('tournament', 100, true);
        return result.items;
    } catch (error) {
        console.error('Error getting tournaments:', error);
        return [];
    }
}

async function joinTournament(tournamentId, userId) {
    try {
        const tournament = await trickleGetObject('tournament', tournamentId);
        await trickleUpdateObject('tournament', tournamentId, {
            ...tournament.objectData,
            currentParticipants: tournament.objectData.currentParticipants + 1
        });
        
        // Record participation
        const participationData = {
            tournamentId,
            userId,
            joinedAt: new Date().toISOString(),
            score: 0
        };
        
        return await trickleCreateObject('tournament_participation', participationData);
    } catch (error) {
        console.error('Error joining tournament:', error);
    }
}

async function updateTournamentScore(participationId, score) {
    try {
        const participation = await trickleGetObject('tournament_participation', participationId);
        await trickleUpdateObject('tournament_participation', participationId, {
            ...participation.objectData,
            score
        });
    } catch (error) {
        console.error('Error updating tournament score:', error);
    }
}