import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';

import HomeScreen from './Screens/HomeScreen';
import NetworkConnectionComponent from './Components/NetworkConnectionComponent';


const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NetworkConnectionComponent />
      <HomeScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
