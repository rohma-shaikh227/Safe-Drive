import { View, Text , ActivityIndicator} from 'react-native'
import React, {useEffect, useState} from 'react'
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//Screens
//for navigation
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import {Auth , Hub} from 'aws-amplify';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [user, setUser]= useState(undefined);
  
  const checkUser = async () => {
    try{
    const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
    setUser(authUser);
 }  catch (e) {
  setUser(null);
 }
};

  useEffect(() => {
      checkUser();
  }, []);
  useEffect(() => {
    const listener = (data) => {
      console.log(data);
    }
    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []
 );

  
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false }}>
          {user ? (
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
          ): (
            <>
              <Stack.Screen name="SignInScreen" component={SignInScreen} />
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
              <Stack.Screen name="ConfirmEmailScreen" component={ConfirmEmailScreen} />
              <Stack.Screen 
                name="ForgotPasswordScreen" 
                component={ForgotPasswordScreen} 
              />
              <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
            </>
          )}
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation
