import React, {useState} from 'react'
import {View , Text, Image , StyleSheet , ScrollView } from 'react-native';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import Logo from '../../../assets/images/safedrive-text.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native'; 
import { Auth } from 'aws-amplify';
import { Alert } from 'react-native-web';
import {useForm} from 'react-hook-form';

function SignUpScreen() {
    const {control, handleSubmit, watch} = useForm();
    const pwd = watch ('password');
    const [username, setUsername] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [passwordrepeat, setPasswordrepeat] = useState('');
    const [cnic, setCnic] = useState('');

 
    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onSignInPressed = () => {
        navigation.navigate('SignInScreen');
    };
    const onRegisterPressed = async data => {
        const {username, password, email , name , cnic} = data;
        try {
            const response = await Auth.signUp({
            username,
            password,
            attributes:{email, name, cnic , preferred_username: username},
            });
            navigation.navigate('ConfirmEmailScreen',{username});

        } catch(e) {
            Alert.alert('Oops', e.message);
        }
    };

    const onTermsofUsePressed = () => {console.warn('onTermsofUsePressed');};
    const onPrivacyPressed = () => { console.warn('onPrivacyPressed');};
    const onSignUpPressed = () => {console.warn('SignUp')};

  return (
    <ScrollView showVerticalScrollIndicator={false}>
    <View>
         <Text style={styles.title}>Create an Account</Text>
         <CustomInput 
        name="username"
        placeholder="Username"
        control={control} 
        />
    
        <CustomInput 
        placeholder="Email" 
        value={email} 
        setValue={setEmail}  
        />
        <CustomInput 
        placeholder="CNIC" 
        name="cnic" 
        setValue={setCnic}  
        rules={{
            required: 'CNIC is required',
            minLength: {
                value: 13,
                message: 'CNIC should at least be 13 characters long',
            },
            maxLength: {
                value   : 15,
                message: 'CNIC should be at max 15 characters long',
            },
        }}
        />
        <CustomInput 
        placeholder="Password" 
        value={password} 
        setValue={setPassword} 
        secureTextEntry = {true}
        />
        <CustomInput 
        placeholder="Repeat Password"  
        value={passwordrepeat}  
        setValue={setPasswordrepeat} 
        secureTextEntry = {true}
        />
        <CustomButton text="Register" onPress={onRegisterPressed}/>

        <Text style={styles.text}> 
            By registering, you confirm that you accept our {' '}
            <Text style={styles.link} onPress={onTermsofUsePressed}>Terms of Use </Text>and {' '}
            <Text style={styles.link} onPress={onPrivacyPressed}>Privacy Policy </Text> 
        </Text>

        <SocialSignInButtons />
    
        

        <CustomButton text="Have an Account? Sign In" 
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
export default SignUpScreen