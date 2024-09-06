import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {

}

const ButtonComponent: React.FC<Props> = ({ }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                ButtonComponent
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    header: {

    }
});

export default ButtonComponent;