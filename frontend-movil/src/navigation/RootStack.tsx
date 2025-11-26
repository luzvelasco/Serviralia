import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NavTab from './NavTab';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Search from '../screens/Search';
import WorkerProfile from '../screens/WorkerProfile';

const RootStack = createStackNavigator();

export default function RootNavigator() {
    return (
        <RootStack.Navigator >
            <RootStack.Screen
                name="Splash"
                component={Splash}
                options={{
                    headerShown: false
                }}
            />
            <RootStack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false
                }}
            />
            <RootStack.Screen
                name='Search'
                component={Search}
                options={{ 
                    headerBackButtonDisplayMode: "minimal",
                    headerTintColor: 'white',
                    headerShown: true,
                    headerTransparent: true,
                    title: ''
                }}
            />
            <RootStack.Screen
                name='WorkerProfile'
                component={WorkerProfile}
                options={{
                    headerShown: true,
                    headerBackButtonDisplayMode: "minimal",
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: '#2A5C8C'
                    },
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontSize: 24,
                        fontWeight: '400',
                        fontFamily: 'Inter_400Regular'
                    },
                    title: 'Sobre mí'
                }}
            />
            <RootStack.Screen
                name="MainTabs"
                options={{ headerShown: false }}
                component={NavTab}
            />
        </RootStack.Navigator>
    );
}