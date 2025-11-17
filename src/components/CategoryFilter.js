function CategoryFilter({ selectedCategory, onCategoryChange }) {
    try {
        const categories = [
            { id: 'all', name: 'Todos', icon: 'grid-3x3' },
            { id: 'sports', name: 'Esportes', icon: 'trophy' },
            { id: 'news', name: 'Notícias', icon: 'newspaper' },
            { id: 'movies', name: 'Filmes', icon: 'film' },
            { id: 'entertainment', name: 'Entretenimento', icon: 'music' }
        ];

        return (
            <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4">Categorias</h2>
                <div className="flex flex-wrap gap-3">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => onCategoryChange(category.id)}
                            className={`category-btn px-6 py-3 flex items-center space-x-2 transition-all duration-300 ${
                                selectedCategory === category.id ? 'active' : ''
                            }`}
                        >
                            <div className={`icon-${category.icon} text-lg`}></div>
                            <span className="font-medium">{category.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('CategoryFilter component error:', error);
        return null;
    }
}