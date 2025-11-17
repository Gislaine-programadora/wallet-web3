function getChannels() {
    return [
        // Canais Abertos Brasileiros
        {
            id: 1,
            name: "TV Globo",
            description: "Rede Globo - Programação nacional",
            category: "entertainment",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/TV_Globo_logo_2014.png/200px-TV_Globo_logo_2014.png",
            streamUrl: "https://live-cf-vod-ugc-west.twitch.tv/still/30526391_922771903_1400014906/chunked/index-dvr.m3u8",
            quality: "HD"
        },
        {
            id: 2,
            name: "SBT",
            description: "Sistema Brasileiro de Televisão",
            category: "entertainment",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/SBT_logo_2014.svg/200px-SBT_logo_2014.svg.png",
            streamUrl: "https://cdn.jmvstream.com/w/LVW-10801/LVW10801_Xvg4DRoFse/playlist.m3u8",
            quality: "HD"
        },
        {
            id: 3,
            name: "Record TV",
            description: "Rede Record - Entretenimento e jornalismo",
            category: "entertainment",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/RecordTV_logo_2019.svg/200px-RecordTV_logo_2019.svg.png",
            streamUrl: "https://5cf4a2c2512a2.streamlock.net/dgrau/dgrau/playlist.m3u8",
            quality: "HD"
        },
        {
            id: 4,
            name: "Band",
            description: "Rede Bandeirantes - Esportes e entretenimento",
            category: "entertainment",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Band_logo_2010.svg/200px-Band_logo_2010.svg.png",
            streamUrl: "https://5cf4a2c2512a2.streamlock.net/live/smil:band.smil/playlist.m3u8",
            quality: "HD"
        },
        
        // Canais de Notícias
        {
            id: 5,
            name: "GloboNews",
            description: "Canal de notícias 24h da Globo",
            category: "news",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Globo_News_logo_2015.svg/200px-Globo_News_logo_2015.svg.png",
            streamUrl: "https://d1nluzb2fbe8xb.cloudfront.net/hls/0001/globonews.m3u8",
            quality: "HD"
        },
        {
            id: 6,
            name: "CNN Brasil",
            description: "Canal de notícias CNN no Brasil",
            category: "news",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Cnn_logo_red_background.svg/200px-Cnn_logo_red_background.svg.png",
            streamUrl: "https://streaming.cnnbrasil.com.br/cnnbrasil/cnnbrasil/playlist.m3u8",
            quality: "HD"
        },
        {
            id: 7,
            name: "Band News",
            description: "Canal de notícias da Band",
            category: "news",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/BandNews_TV_logo_2010.svg/200px-BandNews_TV_logo_2010.svg.png",
            streamUrl: "https://5cf4a2c2512a2.streamlock.net/bandnews/bandnews/playlist.m3u8",
            quality: "HD"
        },
        
        // Canais Educativos/Culturais
        {
            id: 8,
            name: "TV Brasil",
            description: "Televisão pública brasileira",
            category: "entertainment",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/TV_Brasil_logo.svg/200px-TV_Brasil_logo.svg.png",
            streamUrl: "https://video-auth6.iol.pt/live_tvi/live_tvi/playlist.m3u8",
            quality: "HD"
        },
        {
            id: 9,
            name: "TV Cultura",
            description: "Fundação Padre Anchieta - Cultura e educação",
            category: "entertainment",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/TV_Cultura.svg/200px-TV_Cultura.svg.png",
            streamUrl: "https://player-api.new.livestream.com/accounts/10205943/events/3429501/live.m3u8",
            quality: "HD"
        },
        
        // Canais de Esportes
        {
            id: 10,
            name: "SporTV",
            description: "Canal de esportes da Globo",
            category: "sports",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Sportv_logo.svg/200px-Sportv_logo.svg.png",
            streamUrl: "https://live-cf-vod-ugc-west.twitch.tv/still/30526391_922771903_1400014906/chunked/index-dvr.m3u8",
            quality: "HD"
        },
        
        // Canais Religiosos
        {
            id: 11,
            name: "Rede Vida",
            description: "Televisão católica brasileira",
            category: "entertainment",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Rede_Vida_logo.svg/200px-Rede_Vida_logo.svg.png",
            streamUrl: "https://cvd1.cds.ebtcvd.net/live-redevida/smil:redevida.smil/playlist.m3u8",
            quality: "HD"
        },
        {
            id: 12,
            name: "Canção Nova",
            description: "TV Canção Nova - Programação católica",
            category: "entertainment",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/TV_Can%C3%A7%C3%A3o_Nova_logo.svg/200px-TV_Can%C3%A7%C3%A3o_Nova_logo.svg.png",
            streamUrl: "https://cancaonova.secure.footprint.net/egress/bhandler/cancaonova/cancaonova/playlist.m3u8",
            quality: "HD"
        },
        
        // Canais Regionais
        {
            id: 13,
            name: "TV Gazeta",
            description: "Rede Gazeta - São Paulo",
            category: "entertainment",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/TV_Gazeta_logo_2011.svg/200px-TV_Gazeta_logo_2011.svg.png",
            streamUrl: "https://api.new.livestream.com/accounts/5381476/events/8947634/live.m3u8",
            quality: "HD"
        },
        {
            id: 14,
            name: "RedeTV!",
            description: "Rede de televisão brasileira",
            category: "entertainment",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/RedeTV%21_logo_2019.svg/200px-RedeTV%21_logo_2019.svg.png",
            streamUrl: "https://59f1cbe63db89.streamlock.net:1443/redetv/_definst_/redetv/playlist.m3u8",
            quality: "HD"
        },
        
        // Canais Infantis
        {
            id: 15,
            name: "TV Rá Tim Bum",
            description: "Canal infantil da TV Cultura",
            category: "entertainment",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/TV_R%C3%A1-Tim-Bum_logo.svg/200px-TV_R%C3%A1-Tim-Bum_logo.svg.png",
            streamUrl: "https://streaming.institucional.ws/loadbalancer/services/public/channels/5c801dbae4b087c635379db3/live.m3u8",
            quality: "HD"
        },
        
        // Canais Musicais
        {
            id: 16,
            name: "Music Box Brazil",
            description: "Canal de música brasileira",
            category: "entertainment",
            logo: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=120&fit=crop",
            streamUrl: "https://stmv1.srvif.com/musicbox/musicbox/playlist.m3u8",
            quality: "HD"
        }
    ];
}
