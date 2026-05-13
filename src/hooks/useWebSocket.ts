import React, {useState, useCallback, useRef, useEffect} from 'react';

export const useWebSocket = () => {
    const WEBSOCKET_URL = "wss://srv.quary.cz/socket";
    const socketRef = useRef<WebSocket | null>(null)
    
    const [connectionStatus, setConnectionStatus] = useState<string>();

    const connect = useCallback(
    ()=>{
        if(socketRef.current){return;}

        socketRef.current = new WebSocket(WEBSOCKET_URL);

        socketRef.current.onopen = () => {
            setConnectionStatus("connected");
        }

        socketRef.current.onmessage = (event) => {
            // handle messages
        }

        socketRef.current.onerror = () => {
            setConnectionStatus("disconnected");
        }
    }
    ,
    []
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