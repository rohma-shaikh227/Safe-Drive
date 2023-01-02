import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from '../CustomButton';

const SocialSignInButtons = () => {

    const onSignInGoogle = () => {console.warn('Google');};
    const onSignInApple = () => {console.warn('Apple');};
    const onSignInFacebook = () => {console.warn('Facebook');};
  
    return (
    <>
      <CustomButton 
            text="Sign In with Google" 
            onPress={onSignInGoogle}
            bgColor="#f1e9ea"
            fgColor="#dd4d44"   
        />
        <CustomButton 
            text="Sign In with Apple" 
            onPress={onSignInApple}
            bgColor="#e3e3e3"
            fgColor="#363636"    
        />
        <CustomButton 
            text="Sign In with Facebook" 
            onPress={onSignInFacebook}
            bgColor="#E7EaF4"
            fgColor="#4765a9"
        />
    </>
  )
}

export default SocialSignInButtons