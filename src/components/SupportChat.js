function SupportChat({ isOpen, onClose, user }) {
    try {
        const [messages, setMessages] = React.useState([
            {
                id: 1,
                sender: 'ai',
                message: 'Olá! Sou o assistente virtual do Fortune Tiger. Como posso ajudá-lo hoje?',
                timestamp: new Date()
            }
        ]);
        const [inputMessage, setInputMessage] = React.useState('');
        const [isTyping, setIsTyping] = React.useState(false);

        const handleSendMessage = async (e) => {
            e.preventDefault();
            if (!inputMessage.trim()) return;

            const userMessage = {
                id: Date.now(),
                sender: 'user',
                message: inputMessage.trim(),
                timestamp: new Date()
            };

            setMessages(prev => [...prev, userMessage]);
            setInputMessage('');
            setIsTyping(true);

            try {
                const systemPrompt = `Você é um assistente de suporte do Fortune Tiger, um jogo do tigrinho online. 
                Seja útil, amigável e profissional. Ajude com dúvidas sobre:
                - Como jogar
                - Depósitos e saques PIX
                - Códigos promocionais
                - Problemas técnicos
                - Regras do jogo
                
                Histórico do chat: ${JSON.stringify(messages.slice(-5))}`;
                
                const response = await invokeAIAgent(systemPrompt, inputMessage.trim());
                
                const aiMessage = {
                    id: Date.now() + 1,
                    sender: 'ai',
                    message: response,
                    timestamp: new Date()
                };

                setMessages(prev => [...prev, aiMessage]);
            } catch (error) {
                console.error('Error sending message:', error);
                const errorMessage = {
                    id: Date.now() + 1,
                    sender: 'ai',
                    message: 'Desculpe, ocorreu um erro. Tente novamente em alguns instantes.',
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, errorMessage]);
            } finally {
                setIsTyping(false);
            }
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="game-card p-6 w-full max-w-lg mx-4 h-5/6 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-yellow-400">💬 Suporte 24h</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white">
                            <div className="icon-x text-xl"></div>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-xs p-3 rounded-lg ${
                                        msg.sender === 'user'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-700 text-gray-100'
                                    }`}
                                >
                                    <p className="text-sm">{msg.message}</p>
                                    <div className="text-xs opacity-70 mt-1">
                                        {msg.timestamp.toLocaleTimeString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-gray-700 text-gray-100 p-3 rounded-lg">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSendMessage} className="flex space-x-2">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Digite sua mensagem..."
                            className="flex-1 bg-black bg-opacity-50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                            disabled={isTyping}
                        />
                        <button
                            type="submit"
                            disabled={isTyping || !inputMessage.trim()}
                            className="btn-primary px-4 py-2"
                        >
                            <div className="icon-send text-sm"></div>
                        </button>
                    </form>
                </div>
            </div>
        );
    } catch (error) {
        console.error('SupportChat error:', error);
        return null;
    }
}