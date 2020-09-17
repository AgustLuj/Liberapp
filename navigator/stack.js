import React from 'react';
import { View, TouchableOpacity, Text, Image,Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
  } from '@react-navigation/drawer';
  
// Screen
import Routes from './stackRoutes';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


  function Feed({ navigation }) {
	return (
	  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
		<Text>Feed Screen</Text>
		<Button title="Open drawer" onPress={() => navigation.openDrawer()} />
		<Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
	  </View>
	);
  }
  
  function Notifications({ navigation }) {
	React.useEffect(() => {
		const unsubscribe = navigation.addListener('tabPress', e => {
		  // Prevent default behavior
		  e.preventDefault();
		  navigation.openDrawer();
		  // Do something manually
		  // ...
		});
	
		return unsubscribe;
	  }, [navigation]);
	  return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
		  <Text>Home!</Text>
		</View>
	  );
  }
  
  function CustomDrawerContent(props) {
	return (
	  <DrawerContentScrollView {...props}>
		<DrawerItemList {...props} />
		<DrawerItem
		  label="Close drawer"
		  onPress={() => props.navigation.closeDrawer()}
		/>
		<DrawerItem
		  label="Toggle drawer"
		  onPress={() => props.navigation.toggleDrawer()}
		/>
	  </DrawerContentScrollView>
	);
  }
function drawerScreen({navigation},route){
	console.log(route.params)
	return (
		<Drawer.Navigator drawerPosition="right" drawerContent={props => <CustomDrawerContent {...props} />}>
		  <Drawer.Screen name="Feed" component={TabScreen} creenProps={navigation.route}/>
		</Drawer.Navigator>
	  );
}

function TabScreen({navigation},route) {
	//console.log(navigation.route)
	
	return (

		<Tab.Navigator
			tabBarOptions={{
				activeTintColor: "#ffff00",
				showIcon: false,
				labelStyle: {
					fontSize: 20
				}, 
				style: {
					backgroundColor:'#3d3d3d',
				}
				//activeTintColor: 'tomato',
				//inactiveTintColor: 'gray',
			  }}
		>

			<Tab.Screen name="Home" component={Routes.UserView} />
			<Tab.Screen name="Dni" component={Routes.Config}/>
			<Tab.Screen name="Settings" component={Routes.Config}/>
			<Tab.Screen name="Opciones" component={Notifications} listeners={({ navigation }) => ({
				tabPress: e => {
					e.preventDefault();
					navigation.openDrawer();
				},
			})}/>
		</Tab.Navigator>
	);
}
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
					name="Tab"
					component={drawerScreen}
					options={{
						headerShown: false,
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default AppStack;