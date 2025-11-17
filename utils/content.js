function getHeroContent() {
    return [
        {
            id: 'prison-break',
            title: 'Prison Break',
            description: 'Michael Scofield elabora um plano para libertar seu irmão Lincoln Burrows do corredor da morte através de um elaborado plano de fuga da prisão.',
            backdrop: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop',
            poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop',
            year: '2005',
            rating: '9.0',
            genre: 'Drama/Ação',
            seasons: 5,
            type: 'series'
        }
    ];
}

function getContentByType(type) {
    const series = [
        {
            id: 'prison-break',
            title: 'Prison Break',
            poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop',
            backdrop: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop',
            year: '2005',
            rating: '9.0',
            genre: 'Drama',
            seasons: 5,
            description: 'Um engenheiro estrutural se faz prender para ajudar seu irmão a escapar do corredor da morte.'
        },
        {
            id: 'breaking-bad',
            title: 'Breaking Bad',
            poster: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=450&fit=crop',
            year: '2008',
            rating: '9.5',
            genre: 'Drama',
            seasons: 5,
            description: 'Um professor de química se torna fabricante de drogas após descobrir um câncer.'
        },
        {
            id: 'stranger-things',
            title: 'Stranger Things',
            poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop',
            year: '2016',
            rating: '8.7',
            genre: 'Sci-Fi',
            seasons: 4,
            description: 'Crianças enfrentam forças sobrenaturais em uma pequena cidade.'
        },
        {
            id: 'the-boys',
            title: 'The Boys',
            poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=450&fit=crop',
            year: '2019',
            rating: '8.8',
            genre: 'Ação',
            seasons: 3,
            description: 'Um grupo tenta derrubar super-heróis corruptos.'
        }
    ];

    const movies = [
        {
            id: 'avatar',
            title: 'Avatar',
            poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop',
            year: '2009',
            rating: '7.9',
            genre: 'Sci-Fi',
            description: 'Em Pandora, um marine paralítico se junta aos Na\'vi.'
        },
        {
            id: 'inception',
            title: 'A Origem',
            poster: 'https://images.unsplash.com/photo-1489599735734-79b4fc5b9c09?w=300&h=450&fit=crop',
            year: '2010',
            rating: '8.8',
            genre: 'Thriller',
            description: 'Dom Cobb rouba segredos através dos sonhos.'
        }
    ];

    const documentaries = [
        {
            id: 'planet-earth',
            title: 'Planeta Terra',
            poster: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=450&fit=crop',
            year: '2006',
            rating: '9.4',
            genre: 'Documentário',
            description: 'A vida selvagem do planeta em alta definição.'
        }
    ];

    switch (type) {
        case 'series':
            return series;
        case 'movies':
            return movies;
        case 'documentaries':
            return documentaries;
        default:
            return series;
    }
}

function getEpisodes(seriesId, season = 1) {
    const episodes = {
        'prison-break': {
            1: [
                {
                    title: 'Pilot',
                    duration: '45 min',
                    thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=120&fit=crop',
                    description: 'Michael Scofield é preso para ajudar seu irmão Lincoln Burrows a escapar do corredor da morte.'
                },
                {
                    title: 'Allen',
                    duration: '43 min',
                    thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=120&fit=crop',
                    description: 'Michael conhece seus companheiros de cela e começa a executar seu plano.'
                }
            ]
        }
    };

    return episodes[seriesId]?.[season] || [];
}
