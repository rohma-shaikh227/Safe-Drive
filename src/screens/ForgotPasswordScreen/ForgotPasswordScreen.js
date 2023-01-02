import React, {useState} from 'react'
import {View , Text, Image , StyleSheet , ScrollView } from 'react-native';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import Logo from '../../../assets/images/safedrive-text.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import { Alert } from 'react-native-web';
import {Auth} from 'aws-amplify';

function ForgotPasswordScreen() {
    const [username, setUsername] = useState('');
    
 
    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onSignInPressed = async data => {
        try{
            await Auth.ForgotPasswordScreen(data.username);
            navigation.navigate('SignInScreen');
        }catch(e){
            Alert.alert('Oops', e.message);
        }     
        //gg
    };
    const onSendPressed = () => {
        navigation.navigate('ResetPasswordScreen');
    };

    
    const onSignUpPressed = () => {console.warn('SignUp')};

  return (
    <ScrollView showVerticalScrollIndicator={false}>
    <View>
         <Text style={styles.title}>Reset your password</Text>
        <CustomInput 
        placeholder="Username" 
        value={username} 
        setValue={setUsername} 
        />
        
        <CustomButton text="Send" onPress={onSendPressed}/>


        <CustomButton 
            text="Back to Sign In" 
            onPress={onSignInPressed}
            type="TERTIARY"
        />
    </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        
    },
   
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color : '#46BC72',
        margin : 10,
        marginVertical: 20,
        padding: 20,
    },
    text: {
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDC100',
        fontWeight: 'bold',
    },
})
export default ForgotPasswordScreen