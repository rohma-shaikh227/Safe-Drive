import React,{ useState, useEffect} from 'react';
import { StyleSheet, Text , View , Button , Image } from 'react-native-web';
import {Camera} from 'expo-camera';
import { Video } from 'expo-av';

function VideoPlayer() {

    const [hasAudioPerission, setHasAudioPermission] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [record,setRecord]  = useState(null);
    const [type, setType] = useState(Camera.Constants.TYPE.back);
    const video = React.useRef(null);
    const [status, setStatus ] = React.useState({});

    useEffect(() => {
        (async () =>{
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');

            const audioStatus = await Camera.requestMicrophonePermissionsAsync();
            setHasAudioPermission(audioStatus.status === 'granted');

        })();
    },   []);

    const takeVideo = async () => {
        if(camera){
            const data = await camera.recordAsync();
            maxDuration:10
        }
        setRecord(data.uri);
        console.log(data.uri);
    }

const stopVideo = async () => {
    camera.stopRecording();
}

if(hasCameraPermission === null || hasAudioPerission === null ){
    return <View />;
}
if(hasCameraPermission === false || hasAudioPermission === false){
    return <Text>No access to camera</Text>
}

  return (
        <View style={{flex: 1}}>
            <View style={StyleSheet.cameraContainer}>
                <Camera
                ref ={ref => setCamera(ref)}
                style = {style.fixedRatio}
                type = {type}
                ratio = {'4:3'} />

            </View>
            <Video
            ref ={video}
            style= {styles.video}
            source={{
                uri: record,
            }}
            useNativeControls
            resizeMode='contain'
            isLooping
            onPlaybackStatusUpdate={status => setStatus(()=> status)}
            />
            <View style={styles.buttons}>
                <Button 
                title= {status.isPlaying ? 'Pause' : 'Play'}
                onPress={() => 
                status.isPlaying ? video.current.pauseAysnc() : video.current.playAysnc()}
                />
            </View>
            <Button
            title = "Flip Video"
            onPress= {() => {
                setType(
                    type === camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
            }}
            />
            <Button title="Take Video" onPress={()=> takeVideo()}/>
            <Button title="Stop Video" onPress={()=> stopVideo()}/>

        </View>
  );
}
  const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        flexDirection: 'row'
  },
  fixedRatio : {
    flex: 1,
    aspectRatio : 1
  },
  video: {
    alignSelf: 'center',
    width :350,
    height:220
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
}
});

export default VideoPlayer