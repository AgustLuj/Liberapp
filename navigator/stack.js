import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Screen
import Routes from './stackRoutes';

const Stack = createStackNavigator();
function AppStack() {
	// 6685A4
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Login"
					component={Routes.Login}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="UserViews"
					component={Routes.UserView}
					options={{
                        headerShown: false,
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default AppStack;