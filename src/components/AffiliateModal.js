function AffiliateModal({ isOpen, onClose, user }) {
    try {
        const [affiliateData, setAffiliateData] = React.useState(null);
        const [referralCode, setReferralCode] = React.useState('');
        const [loading, setLoading] = React.useState(true);

        React.useEffect(() => {
            if (isOpen && user) {
                loadAffiliateData();
                generateReferralCode();
            }
        }, [isOpen, user]);

        const loadAffiliateData = async () => {
            try {
                const affiliates = await trickleListObjects('affiliate', 100, true);
                const userAffiliates = affiliates.items.filter(a => a.objectData.referrerId === user.objectId);
                
                const totalEarnings = userAffiliates.reduce((sum, aff) => sum + (aff.objectData.totalEarnings || 0), 0);
                const totalReferrals = userAffiliates.length;
                
                setAffiliateData({
                    totalEarnings,
                    totalReferrals,
                    commissionRate: 10, // 10%
                    referrals: userAffiliates
                });
            } catch (error) {
                console.error('Error loading affiliate data:', error);
            } finally {
                setLoading(false);
            }
        };

        const generateReferralCode = () => {
            const code = `TIGER${user.objectId.slice(-6).toUpperCase()}`;
            setReferralCode(code);
        };

        const copyReferralCode = () => {
            navigator.clipboard.writeText(referralCode);
            alert('Código copiado!');
        };

        const shareReferral = () => {
            const message = `🐅 Venha jogar Fortune Tiger comigo! Use meu código ${referralCode} e ganhe bônus especial! 💰`;
            
            if (navigator.share) {
                navigator.share({
                    title: 'Fortune Tiger - Convite',
                    text: message,
                    url: window.location.href
                });
            } else {
                navigator.clipboard.writeText(message);
                alert('Mensagem copiada para compartilhar!');
            }
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="game-card p-8 w-full max-w-lg mx-4 h-5/6 overflow-hidden">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-yellow-400">👥 Programa de Afiliados</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white">
                            <div className="icon-x text-xl"></div>
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center py-8">
                            <div className="text-4xl mb-4">⏳</div>
                            <p className="text-gray-400">Carregando dados...</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 rounded-lg">
                                <h3 className="text-white font-bold text-lg mb-2">Seu Código de Indicação</h3>
                                <div className="flex items-center space-x-2">
                                    <div className="bg-black bg-opacity-30 px-4 py-2 rounded font-mono text-yellow-400 text-xl">
                                        {referralCode}
                                    </div>
                                    <button onClick={copyReferralCode} className="btn-primary px-3 py-2">
                                        <div className="icon-copy text-sm"></div>
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-black bg-opacity-30 p-4 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-green-400">
                                        {affiliateData?.totalReferrals || 0}
                                    </div>
                                    <div className="text-sm text-gray-400">Indicações</div>
                                </div>
                                <div className="bg-black bg-opacity-30 p-4 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-yellow-400">
                                        R$ {affiliateData?.totalEarnings?.toFixed(2) || '0.00'}
                                    </div>
                                    <div className="text-sm text-gray-400">Ganhos</div>
                                </div>
                                <div className="bg-black bg-opacity-30 p-4 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-blue-400">
                                        {affiliateData?.commissionRate}%
                                    </div>
                                    <div className="text-sm text-gray-400">Comissão</div>
                                </div>
                            </div>

                            <div className="bg-blue-500 bg-opacity-20 p-4 rounded-lg">
                                <h4 className="text-blue-300 font-bold mb-2">Como Funciona:</h4>
                                <ul className="text-blue-200 text-sm space-y-1">
                                    <li>• Compartilhe seu código com amigos</li>
                                    <li>• Ganhe 10% de comissão sobre depósitos</li>
                                    <li>• Seus amigos ganham R$ 50 de bônus</li>
                                    <li>• Pagamentos semanais automáticos</li>
                                </ul>
                            </div>

                            <button 
                                onClick={shareReferral}
                                className="btn-success w-full py-3 font-bold"
                            >
                                📱 Compartilhar Convite
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('AffiliateModal error:', error);
        return null;
    }
}