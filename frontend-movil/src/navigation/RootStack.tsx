import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NavTab from './NavTab';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Search from '../screens/Search';

const RootStack = createStackNavigator();

export default function RootNavigator() {
    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen
                name="Splash"
                component={Splash} />
            <RootStack.Screen
                name="Login"
                component={Login} />
            <RootStack.Screen
                name="MainTabs"
                options={{headerShown: false}}
                component={NavTab} />
            <RootStack.Screen
                name='Search'
                component={Search}
                options={{ headerBackButtonDisplayMode: "default"}}/>
        </RootStack.Navigator>
    );
}