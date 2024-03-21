import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/components/LoginScreen/LoginScreen' ;
import HomeScreen from './src/components/HomeScreen/HomeScreen';
import ProfileScreen from './src/components/ProfileScreen/ProfileScreen';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="NutriCount">
            <Stack.Screen name="NutriCount" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
