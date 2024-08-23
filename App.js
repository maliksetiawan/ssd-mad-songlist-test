import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProjectScreen from './src/screens/ProjectScreen';
import TaskScreen from './src/screens/TaskScreen';
import EditProjectScreen from './src/screens/EditProjectScreen'; 


const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Projects">
                <Stack.Screen name="Projects" component={ProjectScreen} />
                <Stack.Screen name="ProjectDetail" component={TaskScreen} />
                <Stack.Screen name="EditProject" component={EditProjectScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;

