import React, {useState} from 'react'
import {View , Text, Image , StyleSheet , ScrollView } from 'react-native';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import Logo from '../../../assets/images/safedrive-text.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {Auth} from 'aws-amplify';
import { Alert } from 'react-native-web';

function ConfirmEmailScreen() {
    const route = useRoute();
    const {control, handleSubmit, watch} = useForm({defaultValues: {username: route?.params?.username}})
    const [code, setCode] = useState('');
    
 
    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onSignInPressed = () => {
        navigation.navigate('SignInScreen');
    };

    const username = watch('username');
    const onConfirmPressed = async data => {
        try{
            const response = await Auth.confirmSignUp(data.username, data.code);
            console.log(response);
            navigation.navigate('HomeScreen');
        } catch(e){
            alert.alert("Oops", e.message);
        }
        
        
    };
    const onResendPressed = async() => { 
       try{
            await Auth.resendSignUp(username);
            alert.alert("Success!", ' Code was resent to your email');
       }catch(e){
        alert.alert("Oops", e.message);
       }
       
        // console.warn('onResendPressed');
    };

    
    const onSignUpPressed = () => {console.warn('SignUp')};

  return (
    <ScrollView showVerticalScrollIndicator={false}>
    <View>
         <Text style={styles.title}>Confirm your email</Text>
         <CustomInput 
         name="username"
         control
        placeholder="Enter your confirmation code" 
        value={code} 
        setValue={setCode} 
        />
        
        <CustomInput 
        placeholder="Enter your confirmation code" 
        value={code} 
        setValue={setCode} 
        />
        
        <CustomButton text="Confirm" onPress={onConfirmPressed}/>

        <CustomButton 
            text="Resend Code" 
            onPress={onResendPressed}
            type="SECONDARY"
        />

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
export default ConfirmEmailScreen