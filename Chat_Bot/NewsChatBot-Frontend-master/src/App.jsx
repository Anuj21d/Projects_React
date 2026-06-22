import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Send, Trash2, RefreshCcw, Newspaper, User, Bot, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const API_URL = import.meta.env.VITE_API_URL
const WS_URL = import.meta.env.VITE_WS_URL

function App() {
    const [sessionId, setSessionId] = useState('');
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [ws, setWs] = useState(null);
    const scrollRef = useRef(null);

    // Initialize session
    useEffect(() => {
        const savedSession = localStorage.getItem('chatSessionId');
        const newSessionId = savedSession || uuidv4();
        if (!savedSession) {
            localStorage.setItem('chatSessionId', newSessionId);
        }
        setSessionId(newSessionId);
        fetchHistory(newSessionId);
        connectWebSocket();

        return () => {
            if (ws) ws.close();
        };
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    const connectWebSocket = () => {
        const socket = new WebSocket(WS_URL);

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.type === 'token') {
                setMessages(prev => {
                    const lastMsg = prev[prev.length - 1];
                    if (lastMsg && lastMsg.role === 'assistant' && lastMsg.isStreaming) {
                        return [
                            ...prev.slice(0, -1),
                            { ...lastMsg, content: lastMsg.content + data.content }
                        ];
                    }
                    return prev;
                });
            } else if (data.type === 'done') {
                setMessages(prev => {
                    const lastMsg = prev[prev.length - 1];
                    if (lastMsg && lastMsg.role === 'assistant') {
                        return [
                            ...prev.slice(0, -1),
                            { ...lastMsg, isStreaming: false, sources: data.sources }
                        ];
                    }
                    return prev;
                });
                setIsTyping(false);
            }
        };

        setWs(socket);
    };

    const fetchHistory = async (sid) => {
        try {
            const res = await axios.get(`${API_URL}/history/${sid}`);
            if (res.data.messages) {
                setMessages(res.data.messages);
            }
        } catch (err) {
            console.error('Failed to fetch history:', err);
        }
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input;
        setInput('');
        setIsTyping(true);

        // Add user message
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);

        // Add placeholder for bot message
        setMessages(prev => [...prev, { role: 'assistant', content: '', isStreaming: true }]);

        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({
                type: 'message',
                sessionId,
                content: userMsg
            }));
        } else {
            // Fallback to HTTP if WS is down
            try {
                const res = await axios.post(`${API_URL}/message`, {
                    sessionId,
                    message: userMsg
                });

                setMessages(prev => {
                    const newMsgs = [...prev];
                    newMsgs[newMsgs.length - 1] = {
                        role: 'assistant',
                        content: res.data.response,
                        sources: res.data.sources
                    };
                    return newMsgs;
                });
            } catch (err) {
                console.error('Failed to send message:', err);
                setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong.' }]);
            } finally {
                setIsTyping(false);
            }
        }
    };

    const handleNewSession = async () => {
        const newSid = uuidv4();
        localStorage.setItem('chatSessionId', newSid);
        setSessionId(newSid);
        setMessages([]);
    };

    const handleClearSession = async () => {
        try {
            await axios.delete(`${API_URL}/session/${sessionId}`);
            setMessages([]);
        } catch (err) {
            console.error('Failed to clear session:', err);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-background">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 border-b bg-card">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Newspaper className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold">News RAG Chatbot</h1>
                        <p className="text-xs text-muted-foreground">{messages.length} messages • Session: {sessionId.slice(0, 8)}...</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleClearSession}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear
                    </Button>
                    <Button variant="default" size="sm" onClick={handleNewSession}>
                        <RefreshCcw className="w-4 h-4 mr-2" />
                        New Session
                    </Button>
                </div>
            </header>

            {/* Chat Area */}
            <main className="flex-1 overflow-hidden p-4 md:p-6 max-w-5xl mx-auto w-full">
                <ScrollArea className="h-full pr-4">
                    <div className="flex flex-col gap-6 pb-20">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={cn(
                                    "flex gap-4 w-full max-w-4xl",
                                    msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                                )}
                            >
                                {/* Avatar */}
                                <div className={cn(
                                    "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border",
                                    msg.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted"
                                )}>
                                    {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                                </div>

                                {/* Message Bubble */}
                                <div className="flex flex-col gap-2 min-w-0 max-w-[80%]">
                                    <div className={cn(
                                        "p-4 rounded-xl",
                                        msg.role === 'user'
                                            ? "bg-primary text-primary-foreground rounded-tr-none"
                                            : "bg-muted/50 border rounded-tl-none"
                                    )}>
                                        {!msg.content && msg.role === 'assistant' && msg.isStreaming ? (
                                            <div className="flex items-center gap-1 py-1">
                                                <span className="w-2 h-2 bg-foreground/30 rounded-full animate-[bounce_1s_infinite_-0.3s]"></span>
                                                <span className="w-2 h-2 bg-foreground/30 rounded-full animate-[bounce_1s_infinite_-0.15s]"></span>
                                                <span className="w-2 h-2 bg-foreground/30 rounded-full animate-[bounce_1s_infinite]"></span>
                                            </div>
                                        ) : (
                                            <ReactMarkdown className="prose dark:prose-invert prose-sm max-w-none break-words">
                                                {msg.content}
                                            </ReactMarkdown>
                                        )}
                                    </div>

                                    {/* Sources */}
                                    {msg.sources && msg.sources.length > 0 && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                            {msg.sources.map((source, sIdx) => (
                                                <Card key={sIdx} className="bg-card hover:bg-muted/50 transition-colors border-l-4 border-l-primary/50">
                                                    <CardContent className="p-3">
                                                        <a
                                                            href={source.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="group flex flex-col gap-1"
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-xs font-semibold text-primary truncate max-w-[85%]">
                                                                    {source.title}
                                                                </span>
                                                                <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary" />
                                                            </div>
                                                            <p className="text-[10px] text-muted-foreground line-clamp-2">
                                                                {source.snippet}
                                                            </p>
                                                        </a>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div ref={scrollRef} />
                    </div>
                </ScrollArea>
            </main>

            {/* Input Area */}
            <footer className="p-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="max-w-4xl mx-auto flex gap-3">
                    <Input
                        placeholder="Ask about the latest news..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        disabled={isTyping}
                        className="flex-1 shadow-sm"
                    />
                    <Button onClick={handleSend} disabled={isTyping || !input.trim()}>
                        <Send className="w-4 h-4 mr-2" />
                        Send
                    </Button>
                </div>
            </footer>
        </div>
    );
}

export default App;
