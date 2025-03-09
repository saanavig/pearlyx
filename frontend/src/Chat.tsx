import React, { useEffect, useRef, useState } from 'react';

import { Link } from 'react-router-dom';
import logo from './assets/logo.png';

interface Message {
    text: string;
    isUser: boolean;
    timestamp: Date;
}

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        const userMessage = inputMessage.trim();
        setMessages(prev => [...prev, { text: userMessage, isUser: true, timestamp: new Date() }]);
        setInputMessage('');
        setIsLoading(true);

        try {
        const response = await fetch('http://127.0.0.1:5000/chat', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        if (response.ok) {
            setMessages(prev => [...prev, { text: data.response, isUser: false, timestamp: new Date() }]);
        } else {
            setMessages(prev => [...prev, {
            text: "Sorry, I couldn't process your message. Please try again.",
            isUser: false,
            timestamp: new Date()
            }]);
        }
        } catch (error) {
        console.error('Chat error:', error);
        setMessages(prev => [...prev, {
            text: "Sorry, there was an error. Please try again later.",
            isUser: false,
            timestamp: new Date()
        }]);
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
        <nav className="flex justify-between items-center py-4 px-8 bg-white shadow-md">
            <div className="text-xl font-semibold flex items-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <img src={logo} alt="Pearlyx Logo" className="w-full h-full object-contain" />
            </div>
            <span className="ml-2 text-gray-900">Pearlyx</span>
            </div>
            <div className="space-x-6">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <Link to="/chat" className="text-gray-600 hover:text-gray-900">Chat</Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
            </div>
        </nav>

        <div className="container mx-auto max-w-4xl p-4">
            <div className="bg-white rounded-lg shadow-md h-[600px] flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                <div
                    key={index}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                    <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                        message.isUser
                        ? 'bg-blue-500 text-white' // user message
                        : 'bg-gray-100 text-gray-800' //bot
                    }`}
                    >
                    <p className="whitespace-pre-line">
                        {message.text}
                    </p>
                    <span className="text-xs opacity-75 mt-1 block">
                        {message.timestamp.toLocaleTimeString()}
                    </span>
                    </div>
                </div>
                ))}
                {isLoading && (
                <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 rounded-lg p-3">
                    <p>Typing...</p>
                    </div>
                </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="border-t p-4">
                <div className="flex space-x-4">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about Parkinson's disease..."
                    className="flex-1 border rounded-lg px-4 py-2 text-white bg-gray-800 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
/>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg 
                    hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                    Send
                </button>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
    };

    export default Chat;