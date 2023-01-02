import React, {useState } from 'react'
import {View , Text, Image , StyleSheet , ScrollView , Alert} from 'react-native';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import Logo from '../../../assets/images/safedrive.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {Auth} from 'aws-amplify';

function SignInScreen() { 
    const {height} = useWindowDimensions();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSignInPressed = async data => {
        if(loading) {
            return;
        }
        
        setLoading(true);
        try {
            const response = await Auth.signIn(data.username, data.password);
            console.log(response);
        } catch (e) {
            Alert.alert('Oops', e.message);
        }
        setLoading(false);
        
    };

    const onForgotPasswordPressed= () => {
        console.warn('Forgot password');

        navigation.navigate('ForgotPasswordScreen');
    };

    const onSignUpPressed = () => {
        console.warn('SignUp')

        navigation.navigate('SignUpScreen');
    };

  return (
    <ScrollView showVerticalScrollIndicator={false}>
    <View>
        <Image
         source={Logo}
         style={[styles.logo, {height: height * 0.3}]} 
         resizeMode = "contain"/>
        <CustomInput 
        name="username"
        placeholder="Username"
        control={control}
        rules={{required: 'Username is required'}} 
        />
        <CustomInput 
        name="password"
        placeholder="Password"
        secureTextEntry
        control={control}
        rules={{
            required: 'Password is required',
            minLength: {
                value: 3,
                message: 'Please enter at least 3 characters'
            },
        }}
        />

        <CustomButton 
        text={loading ? 'Loading...' : "Sign In"} 
        onPress={handleSubmit(onSignInPressed)}
        />

        <CustomButton text="Forgot Password?" onPress={onForgotPasswordPressed} type="TERTIARY"/>
    
        <SocialSignInButtons />

        <CustomButton text="Don't have an account? Create one" 
            onPress={onSignUpPressed}
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
    logo: {
        marginVertical: 30,
        width:'100%',
        maxWidth: 500,
        maxHeight: 500,
        height: 100,
    }
})
export default SignInScreen