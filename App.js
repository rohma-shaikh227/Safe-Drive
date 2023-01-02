import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView , StyleSheet , Text } from 'react-native';
import Navigation from './src/navigation';
//import Amplify, {Auth} from '@aws-amplify/core';
import Amplify from "@aws-amplify/core";
import config from './src/aws-exports';

Amplify.configure(config);

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor : '#fffff1',
  },
  
});

export default App;