import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>HomeScreen {process.env.ENV}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
  },
  header: {
    
  }
});

export default HomeScreen;