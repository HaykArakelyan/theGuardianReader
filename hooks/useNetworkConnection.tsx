import { useState, useEffect } from 'react';
import NetInfo from "@react-native-community/netinfo";


export const useNetworkConnection = () => {
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected ?? false);
        });

        return () => unsubscribe();
    }, []);

    return { isConnected };
};
