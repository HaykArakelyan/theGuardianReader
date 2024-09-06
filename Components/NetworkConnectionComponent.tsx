import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNetworkConnection } from '../hooks/useNetworkConnection';

interface Props { }

const NetworkConnectionComponent: React.FC<Props> = () => {
    const [message, setMessage] = useState<string>("");
    const { isConnected } = useNetworkConnection();

    useEffect(() => {
        setMessage(isConnected ? "" : "No internet connection");
    }, [isConnected]);

    return (
        !isConnected ? (
            <View style={[styles.container, styles.notConnected]}>
                <Text style={styles.header}>
                    {message}
                </Text>
            </View>
        ) : null
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 2,
        borderRadius: 5,
    },
    header: {
        textAlign: "center",
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
    },
    notConnected: {
        backgroundColor: "red",
    }
});

export default NetworkConnectionComponent;
