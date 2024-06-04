import { useState, useRef, useEffect } from 'react';
import { Socket, io } from 'socket.io-client';
import { TUser, user } from '../user';
import { TChat } from './chat-model';

export const useChat = ({ users, chat: { messages: initialMessages } }: { chat: TChat; users: TUser[] }) => {
    const [chatId, setChatId] = useState('');
    const [messages, setMessages] = useState(initialMessages ?? []);

    const socketRef = useRef<Socket | null>(null);

    const sendMessage = (message: string) => {
        socketRef.current?.emit('message', { message, chatId, userId: user.id });
    };

    useEffect(() => {
        socketRef.current = io('http://localhost:8000', { transports: ['websocket', 'polling', 'flashsocket'] });
        const socket = socketRef.current;

        socket.connect();

        socket.on('connect', () => {
            socket.emit('join', { users: users.map((user) => user.id), joinedUserId: user.id });
        });

        socket.on('message', (message) => {
            setMessages((prev) => [...prev, message]);
        });

        socket.on('room', setChatId);

        return () => {
            socket.disconnect();
            socket.off('connect');
            socket.off('room');
        };
    }, []);

    return { messages, sendMessage };
};
