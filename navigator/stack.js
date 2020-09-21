import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image,Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, CommonActions ,StackActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Header } from 'react-native-elements';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
  } from '@react-navigation/drawer';
import AsyncStorage  from '@react-native-community/async-storage' 
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
  
function Notifications({ navigation },{par}) {
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
		  <Text>{(params.type == 1)?'hola':'Prueba'}</Text>
		</View>
	  );
  }
  
function CustomDrawerContent(props) {
	return (
	  <DrawerContentScrollView {...props}>
		<DrawerItemList {...props} />
		<DrawerItem
		  label="Noticias"
		  onPress={() => props.navigation.navigate('Tabs', {
			screen: 'Dni',
			params: { type: 1 },
		  })}
		/>
		<DrawerItem
		  label="Cerrar sesion"
		  onPress={async () =>{
			
			await AsyncStorage.removeItem('@UserData');
			props.navigation.replace('LoginFinish')
			/*props.navigation.reset({
				index: 0
			})*/
			/*const resetAction = props.navigation.reset({
				index: 0,
				actions: [props.navigation.navigate({ routeName: 'Login' })],
			  });
		  
			this.props.navigation.dispatch(resetAction);*/
			
		  }}
		/>
		
	  </DrawerContentScrollView>
	);
  }
function drawerScreen({navigation},route){
	//console.log(route.params)
	return (
		<Drawer.Navigator drawerPosition="right" drawerContentOptions={{
			//activeBackgroundColor:'#f6b93b',
			activeTintColor:'#e58e26'
		}} drawerContent={props => <CustomDrawerContent {...props} />}>
		  <Drawer.Screen name="Home" component={Routes.UserView} creenProps={navigation.route}/>
		  <Drawer.Screen name="Carnet" component={Routes.Dni} creenProps={navigation.route}/>
		  <Drawer.Screen name="Configuracion" component={Routes.Config} creenProps={navigation.route}/>
		  <Drawer.Screen name="Votaciones" component={Feed} creenProps={navigation.route}/>
		  <Drawer.Screen name="Verificaciones" component={Feed} creenProps={navigation.route}/>
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

			<Tab.Screen name="Home" component={Routes.UserView}  />
			<Tab.Screen name="Dni" component={Routes.Dni}/>
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
class AppStack extends Component{
    constructor(props){
		super(props);
		this.state={
			
		}
		this.opt1={
			headerStyle: {
			  backgroundColor: '#f4511e',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
			  fontWeight: 'bold',
			  textAlign:"center"
			},
		}
		this.opt2={
			headerShown: false,
		}
    }
    async componentDidMount(){
		let value = await AsyncStorage.getItem('@UserData');
		if(null !== value){
			this.setState({'d':true})
		}else{
			this.setState({'d':false})
		}     
	}
	
	//component={(!d)? Routes.Login:drawerScreen}
    render(){
		const {d}= this.state;
        return (
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name="Login"
						component={(!d)? Routes.Login:drawerScreen}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="Tabs"
						component={drawerScreen}
						options={{
							title: 'LiberApp',
							headerShown: false,
						  }}
					/>
					<Stack.Screen
						name="LoginFinish"
						component={Routes.Login}
						options={{
							headerShown: false,
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}


export default AppStack;