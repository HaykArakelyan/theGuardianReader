import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

interface Props {
    onChange: (queryString: string) => void,
    value: string,
}

const InputComponent: React.FC<Props> = ({ onChange, value }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchField}
                onChangeText={onChange}
                value={value}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 2,
        borderRadius: 16,
        shadowColor: 'red',
        elevation: 100,
    },
    searchField: {
        paddingHorizontal: 15,
    }
});

export default InputComponent;