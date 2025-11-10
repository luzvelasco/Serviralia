// RootStack.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NavTab from './NavTab';       // Tu Tab Navigator
import Splash from '../screens/Splash';

const RootStack = createStackNavigator();

export default function RootNavigator() {
    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="Splash" component={Splash} />
            {/* ⬅️ Aquí la pantalla "NavTab" es en realidad el Tab Navigator completo */}
            <RootStack.Screen name="MainTabs" component={NavTab} />
            {/* Agregar la pantalla de Login aquí si es que vas de Splash a Login */}
            {/* <RootStack.Screen name="Login" component={LoginScreen} /> */}
        </RootStack.Navigator>
    );
}