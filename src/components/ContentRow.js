function ContentRow({ title, type, onContentSelect }) {
    try {
        const content = getContentByType(type);
        const scrollRef = React.useRef(null);

        const scroll = (direction) => {
            const scrollAmount = 300;
            if (scrollRef.current) {
                scrollRef.current.scrollBy({
                    left: direction === 'left' ? -scrollAmount : scrollAmount,
                    behavior: 'smooth'
                });
            }
        };

        return (
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl lg:text-2xl font-semibold text-white">
                        {title}
                    </h2>
                    
                    <div className="flex space-x-2">
                        <button 
                            onClick={() => scroll('left')}
                            className="p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors"
                        >
                            <div className="icon-chevron-left text-white"></div>
                        </button>
                        <button 
                            onClick={() => scroll('right')}
                            className="p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors"
                        >
                            <div className="icon-chevron-right text-white"></div>
                        </button>
                    </div>
                </div>

                <div 
                    ref={scrollRef}
                    className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {content.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => onContentSelect(item)}
                            className="flex-shrink-0 w-48 cursor-pointer"
                        >
                            <div className="card-hover rounded-lg overflow-hidden bg-[var(--card-bg)]">
                                <img
                                    src={item.poster}
                                    alt={item.title}
                                    className="w-full h-72 object-cover"
                                    onError={(e) => {
                                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyIiBoZWlnaHQ9IjI4OCIgdmlld0JveD0iMCAwIDE5MiAyODgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxOTIiIGhlaWdodD0iMjg4IiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9Ijk2IiB5PSIxNDQiIGZpbGw9IiM5Q0E0QUYiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+8J+OrTwvdGV4dD4KPC9zdmc+';
                                    }}
                                />
                                
                                <div className="p-3">
                                    <h3 className="font-semibold text-white text-sm mb-1 line-clamp-1">
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center justify-between text-xs text-gray-400">
                                        <span>{item.year}</span>
                                        <span className="bg-[var(--primary-color)] text-white px-1 rounded">
                                            {item.rating}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('ContentRow component error:', error);
        return null;
    }
}