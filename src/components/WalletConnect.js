function WalletConnect({ isConnected, account, onConnect }) {
    try {
        const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
        const [copySuccess, setCopySuccess] = React.useState(false);

        const copyToClipboard = async () => {
            try {
                await navigator.clipboard.writeText(account);
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000);
            } catch (error) {
                console.error('Failed to copy address:', error);
            }
        };

        const disconnectWallet = () => {
            if (window.ethereum && window.ethereum.disconnect) {
                window.ethereum.disconnect();
            }
            setIsDropdownOpen(false);
        };

        const viewOnEtherscan = () => {
            if (account) {
                window.open(`https://etherscan.io/address/${account}`, '_blank');
            }
        };

        return (
            <div data-name="wallet-connect" className="relative">
                {isConnected ? (
                    <div data-name="wallet-info">
                        <button
                            data-name="wallet-button"
                            className="button-primary px-6 py-2 rounded-lg flex items-center"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <i className="fas fa-wallet mr-2"></i>
                            <span>{`${account.substring(0, 6)}...${account.substring(38)}`}</span>
                            <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'} ml-2`}></i>
                        </button>

                        {isDropdownOpen && (
                            <div data-name="wallet-dropdown" className="absolute right-0 mt-2 w-64 rounded-lg bg-slate-800 shadow-lg z-10">
                                <div className="p-4">
                                    <div data-name="account-info" className="mb-4">
                                        <p className="text-sm text-gray-400">Connected Account</p>
                                        <p className="font-mono text-sm truncate">{account}</p>
                                    </div>

                                    <div data-name="wallet-actions" className="space-y-2">
                                        <button
                                            data-name="copy-address"
                                            className="w-full text-left px-4 py-2 hover:bg-slate-700 rounded-lg flex items-center"
                                            onClick={copyToClipboard}
                                        >
                                            <i className={`fas fa-${copySuccess ? 'check' : 'copy'} mr-2`}></i>
                                            {copySuccess ? 'Copied!' : 'Copy Address'}
                                        </button>

                                        <button
                                            data-name="view-etherscan"
                                            className="w-full text-left px-4 py-2 hover:bg-slate-700 rounded-lg flex items-center"
                                            onClick={viewOnEtherscan}
                                        >
                                            <i className="fas fa-external-link-alt mr-2"></i>
                                            View on Etherscan
                                        </button>

                                        <button
                                            data-name="disconnect-wallet"
                                            className="w-full text-left px-4 py-2 hover:bg-slate-700 rounded-lg flex items-center text-red-400"
                                            onClick={disconnectWallet}
                                        >
                                            <i className="fas fa-sign-out-alt mr-2"></i>
                                            Disconnect
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        data-name="connect-button"
                        className="button-primary px-6 py-2 rounded-lg flex items-center"
                        onClick={onConnect}
                    >
                        <i className="fas fa-wallet mr-2"></i>
                        Connect Wallet
                    </button>
                )}
            </div>
        );
    } catch (error) {
        console.error('WalletConnect component error:', error);
        reportError(error);
        return null;
    }
}
