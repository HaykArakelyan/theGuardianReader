import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface Props {
    title: string
}

const SubtitleComponent: React.FC<Props> = ({ title }) => {
    return (
        <Text style={styles.title}>
            {title}
        </Text>
    );
};

const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        fontSize: 10,
        fontWeight: "bold",
        paddingBottom: 20,
        color: "black",
        fontStyle: "italic",
    }
});

export default SubtitleComponent;