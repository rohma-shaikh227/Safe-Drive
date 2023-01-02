import React, {useState, useForm} from 'react'
import {View , Text, Image , StyleSheet , ScrollView } from 'react-native';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import Logo from '../../../assets/images/safedrive-text.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import { Auth } from 'aws-amplify';


function ResetPasswordScreen() {
    const {control, handleSubmit}= useForm();
    
 
    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onSignInPressed = () => {
        navigation.navigate('SignInScreen');
    };
    const onSubmitPressed = async data => {
        try{
            await Auth.forgotPasswordSubmit(data.username, data.code, data.password);
            navigation.navigate('SignInScreen');
        }catch(e){
            alert.alert('Oops',e.message);
        }
    };
    
   

  return (
    <ScrollView showVerticalScrollIndicator={false}>
    <View>
         <Text style={styles.title}>Reset your password</Text>
         <CustomInput 
        placeholder="Username" 
        name="username"
        control={control}
        rules={{
            required: 'Username is required'}}
        />
        <CustomInput 
        placeholder="Code" 
        name="code" 
        setValue={setCode} 
        />
        <CustomInput 
        placeholder="Enter your new password" 
        name="newPassword" 
        setValue={setNewPassword} 
        />
        
        <CustomButton text="Submit" onPress={onSubmitPressed}/>


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
export default ResetPasswordScreen