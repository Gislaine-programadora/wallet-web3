function ChannelGrid({ channels, onChannelSelect }) {
    try {
        if (channels.length === 0) {
            return (
                <div className="text-center py-20">
                    <div className="text-4xl mb-4">📺</div>
                    <p className="text-gray-400">Nenhum canal encontrado nesta categoria</p>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {channels.map((channel) => (
                    <div
                        key={channel.id}
                        onClick={() => onChannelSelect(channel)}
                        className="channel-card p-4 cursor-pointer"
                    >
                        <div className="relative">
                            <img
                                src={channel.logo}
                                alt={channel.name}
                                className="w-full h-32 object-contain bg-gray-800 rounded-lg mb-3"
                                onError={(e) => {
                                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDIwMCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTI4IiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iNjQiIGZpbGw9IiM5Q0E0QUYiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+8J+TujwvdGV4dD4KPC9zdmc+';
                                }}
                            />
                            
                            <div className="absolute top-2 right-2">
                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                    AO VIVO
                                </span>
                            </div>
                        </div>
                        
                        <h3 className="font-bold text-white mb-1">{channel.name}</h3>
                        <p className="text-sm text-gray-400 mb-2">{channel.description}</p>
                        
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-blue-400 capitalize">
                                {channel.category}
                            </span>
                            <div className="flex items-center space-x-2">
                                <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">
                                    {channel.quality || 'HD'}
                                </span>
                                <div className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span className="text-xs text-green-400">Online</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    } catch (error) {
        console.error('ChannelGrid component error:', error);
        return null;
    }
}