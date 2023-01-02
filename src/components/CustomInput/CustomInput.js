import React from 'react'
import {View, Text ,TextInput ,StyleSheet} from 'react-native';

function CustomInput({value , setValue, placeholder,secureTextEntry }) {
  return (
    <View>
        <TextInput 
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            style={styles.container}
            secureTextEntry={secureTextEntry}
        />
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fffff4',
        width: '100%',

        borderColor: '#eaeaea',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 20,
        marginVertical:10,
    },
    input: {},
});
export default CustomInput