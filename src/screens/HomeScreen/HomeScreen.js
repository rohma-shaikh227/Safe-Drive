import { View, Text } from 'react-native';
import React from 'react';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

const HomeScreen = () => {
  return (
    <View>
      <Text style={{fontSize: 24, alignSelf: 'center'}}>Safe Drive Home Screen</Text>
      <VideoPlayer />
    </View>
  )
}

export default HomeScreen