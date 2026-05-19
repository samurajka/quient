import React, {useState, useCallback, useRef, useEffect} from 'react';
import {useAuth} from '../context/AuthContext'

export const useWebSocket = () => {
    const WEBSOCKET_URL = "wss://srv.quary.cz/socket";
    const socketRef = useRef<WebSocket | null>(null)
    
    const [connectionStatus, setConnectionStatus] = useState<string>();

    const {user, token} = useAuth();

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

    return {
        connect, disconnect
    };
}