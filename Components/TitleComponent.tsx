import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface Props {
    title: string
}

const TitleComponent: React.FC<Props> = ({ title }) => {
    return (
        <Text style={styles.title}>
            {title}
        </Text>
    );
};

const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        fontSize: 20,
        paddingVertical: 20,
        fontWeight: "bold",
        color: "black",
        fontStyle: "italic",
    }
});

export default TitleComponent;