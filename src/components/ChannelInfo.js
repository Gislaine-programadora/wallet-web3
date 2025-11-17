function ChannelInfo({ channel }) {
    try {
        if (!channel) return null;

        return (
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <div className="flex items-start space-x-4">
                    <img
                        src={channel.logo}
                        alt={channel.name}
                        className="w-20 h-16 object-contain bg-gray-700 rounded-lg"
                    />
                    
                    <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                            <h2 className="text-2xl font-bold text-white">{channel.name}</h2>
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                                AO VIVO
                            </span>
                        </div>
                        
                        <p className="text-gray-300 mb-3">{channel.description}</p>
                        
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <div className="icon-tag text-blue-400"></div>
                                <span className="text-blue-400 capitalize">{channel.category}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <div className="icon-monitor text-green-400"></div>
                                <span className="text-green-400">{channel.quality}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-green-400 text-sm">Online</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ChannelInfo component error:', error);
        return null;
    }
}