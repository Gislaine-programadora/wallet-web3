class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Wallet app error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="glass-card p-8 text-center">
                        <h2 className="text-2xl font-bold text-red-400 mb-4">Erro na Carteira</h2>
                        <button 
                            onClick={() => window.location.reload()}
                            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
                        >
                            Recarregar
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

function App() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [wallet, setWallet] = React.useState(null);
    const [currentView, setCurrentView] = React.useState('dashboard');

    React.useEffect(() => {
        const savedWallet = localStorage.getItem('cryptoWallet');
        if (savedWallet) {
            setWallet(JSON.parse(savedWallet));
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = async (password, privateKey = null) => {
        try {
            let walletData;
            if (privateKey) {
                walletData = await importWalletFromPrivateKey(privateKey, password);
            } else {
                walletData = await createWallet(password);
            }
            
            setWallet(walletData);
            setIsLoggedIn(true);
            localStorage.setItem('cryptoWallet', JSON.stringify(walletData));
        } catch (error) {
            alert('Erro ao fazer login: ' + error.message);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setWallet(null);
        localStorage.removeItem('cryptoWallet');
    };

    if (!isLoggedIn) {
        return <LoginPage onLogin={handleLogin} />;
    }

    return (
        <div className="min-h-screen">
            <WalletDashboard 
                wallet={wallet}
                onLogout={handleLogout}
                currentView={currentView}
                setCurrentView={setCurrentView}
            />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
);