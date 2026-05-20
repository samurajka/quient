import React, {useState, useCallback, useRef, useEffect} from 'react';
import {useAuth} from '../context/AuthContext'
import { useChat } from '../context/ChatContext';
import type { ChatMessage } from '../types';

export const useWebSocket = () => {
    const WEBSOCKET_URL = "wss://srv.quary.cz/socket";
    const socketRef = useRef<WebSocket | null>(null)
    
    const [connectionStatus, setConnectionStatus] = useState<string>();

    const {user, token} = useAuth();
    const {addMessage} = useChat();

    const connect = useCallback(
    ()=>{
        if(socketRef.current){return;}

        socketRef.current = new WebSocket(WEBSOCKET_URL);

        socketRef.current.onopen = () => {
            setConnectionStatus("connected");
        }

        const handleMessage = (data: any) => {
            const {type, ...payload } = data

            const handlers: Record<string, (payload: any) => void> = {
                'system.init': (p) => {
                    console.log('Client ID:', p.clientId);
                    const json = {type: 'auth.login', token: token};
                    socketRef.current?.send(JSON.stringify(json))
                },
                'auth.loggedin': (p) => {
                    console.log('Logged in, expires at:', p.expiresAt)
                },
                'chat.message.single': (p) => {
                    if(!p.message){return};
                    const message: ChatMessage = {
                        sender: p.message.nickname || p.message.login || "server",
                        content: p.message.message,
                        timestamp: p.message.timestamp,
                        color: p.color || "#9F0090"
                    }
                    addMessage(message);
                },
                'chat.message.history': (p) =>{
                    if(!p.messages){return;};
                    console.log(p);
                    for(let index = 0; index < p.messages.length; index++){
                        let item = p.messages[index];
                        let message: ChatMessage = {
                            sender: item.nickname || item.login || "server",
                            content: item.message,
                            timestamp: item.timestamp,
                            color: item.color || "#9F0090"
                        }
                        addMessage(message);
                    }
                }
            };

            const handler = handlers[type];
            if(handler){
                handler(payload)
            }else{
                console.warn('Unknown message type', type);
            }
        }

        socketRef.current.onmessage = (event) => {
            
            try{
                const data = JSON.parse(event.data);
                handleMessage(data);
            } catch(err){
                console.error("Failed to parse message:", err);
            }
            

        }

        socketRef.current.onerror = () => {
            setConnectionStatus("disconnected");
        }
    }
    ,
    [token]
    );

    const sendHandlers = {
        'chat.message.send': (payload: {message: string}) => {
            return {type: 'chat.message.send', ...payload};
        },
    }

    const sendMessage = useCallback((type:string, payload:any) => {
        console.log(socketRef.current)
        if(!socketRef.current){return;}

        console.log('debug1')

        const handler = sendHandlers[type as keyof typeof sendHandlers];
        if(handler){
            const message = handler(payload);
            socketRef.current.send(JSON.stringify(message));
            console.log(message);
        } else{
            console.warn('unknown send handler', type);
        }
    },[]) 

    const disconnect = useCallback(
    () => {
        if(!socketRef.current){return}

        socketRef.current.close();

        setConnectionStatus("disconnected");
        //
    },
    []
    )

    const reconnect = useCallback(
    () => {
        if(!socketRef.current){return}
        //

    },
    []
    )

    useEffect(
    () =>{
        return () => {
            if(socketRef.current){
                socketRef.current.close();
                socketRef.current = null;
            }
        }
    },
    []
    );

    const sendChatMessage = useCallback((message:string) => {
        sendMessage('chat.message.send', {message})
    },[sendMessage])    

    return {
        connect, disconnect, 
        sendChatMessage
    };
}