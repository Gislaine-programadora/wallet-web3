function Header() {
    try {
        const [searchQuery, setSearchQuery] = React.useState('');
        const [showSearch, setShowSearch] = React.useState(false);

        return (
            <header className="fixed top-0 w-full bg-black bg-opacity-90 backdrop-blur-md z-50">
                <div className="flex items-center justify-between px-4 lg:px-8 py-4">
                    <div className="flex items-center space-x-8">
                        <h1 className="text-2xl font-bold text-[var(--primary-color)]">
                            StreamFlix
                        </h1>
                        
                        <nav className="hidden md:flex space-x-6">
                            <a href="#" className="text-white hover:text-gray-300 transition-colors">
                                Início
                            </a>
                            <a href="#" className="text-white hover:text-gray-300 transition-colors">
                                Séries
                            </a>
                            <a href="#" className="text-white hover:text-gray-300 transition-colors">
                                Filmes
                            </a>
                            <a href="#" className="text-white hover:text-gray-300 transition-colors">
                                Minha Lista
                            </a>
                        </nav>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            {showSearch ? (
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Buscar séries, filmes..."
                                        className="bg-black border border-gray-600 rounded px-3 py-2 text-white w-64"
                                        autoFocus
                                        onBlur={() => !searchQuery && setShowSearch(false)}
                                    />
                                </div>
                            ) : (
                                <button
                                    onClick={() => setShowSearch(true)}
                                    className="text-white hover:text-gray-300 transition-colors"
                                >
                                    <div className="icon-search text-xl"></div>
                                </button>
                            )}
                        </div>

                        <button className="text-white hover:text-gray-300 transition-colors">
                            <div className="icon-bell text-xl"></div>
                        </button>

                        <div className="w-8 h-8 bg-[var(--primary-color)] rounded flex items-center justify-center">
                            <div className="icon-user text-white"></div>
                        </div>
                    </div>
                </div>
            </header>
        );
    } catch (error) {
        console.error('Header component error:', error);
        return null;
    }
}