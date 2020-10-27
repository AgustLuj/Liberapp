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
import AsyncStorage  from '@react-native-community/async-storage';
import { ListItem, Icon } from 'react-native-elements'
speed();
var userData;
import Routes from './stackRoutes';
async function speed (){
    userData = JSON.parse(await AsyncStorage.getItem('@UserData'))
}
// Screen


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Options = createStackNavigator();


function Feed(route) {
	const list = [
		{
		  title: 'Appointments',
		  icon: 'av-timer'
		},
		{
		  title: 'Trips',
		  icon: 'flight-takeoff'
		},
	  ]
	return (
		<View>
		{
		  list.map((item, i) => (
			<ListItem key={i} bottomDivider>
			  <Icon name={item.icon} />
			  <ListItem.Content>
				<ListItem.Title>{item.title}</ListItem.Title>
			  </ListItem.Content>
			  <ListItem.Chevron />
			</ListItem>
		  ))
		}
	  </View>
	);
}
function Test({ navigation }) {
	return (
		<Options.Navigator>
		<Options.Screen
			name="Home"
			component={Feed}
		/>
		<Options.Screen
			name="Config"
			component={Routes.Config}
			options={{
				title: 'LiberApp',
				headerShown: false,
			  }}
		/>
	</Options.Navigator>
	);
}
async function deleteSession(fn){
	await AsyncStorage.removeItem('@UserData');
	if(null == await AsyncStorage.getItem('@UserData')){
		fn(true)
	}else{
		fn(false)
	}
}
function CustomDrawerContent(props) {
	return (
	  <DrawerContentScrollView {...props}>
		<DrawerItemList {...props} />
		<DrawerItem
		  label="Cerrar sesion"
		  onPress={async () =>{
		
			deleteSession((d)=>{
				if(d){
					props.navigation.replace('LoginFinish')
				}else{
					deleteSession((d)=>{
						if(d()){
							props.navigation.replace('LoginFinish')
						}else{
							props.navigation.replace('Tabs')
						}
					});
				}
			})
		
		
			
			
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
class drawerScreen extends Component{
	constructor(props){
		super(props);
		this.state={
			
		}
		this.verificado=true;
		this.admin=false;
    }
	async componentDidMount(){
		const {verificado,admin} =JSON.parse(await AsyncStorage.getItem('@UserData'));
		this.admin=admin;
		this.verificado=verificado;
	}
    render(){
		return (
			<Drawer.Navigator drawerPosition="right" drawerContentOptions={{
				//activeBackgroundColor:'#f6b93b',
				activeTintColor:'#e58e26'
			}} drawerContent={props => <CustomDrawerContent {...props} />}>
			<Drawer.Screen name="Home" component={Routes.UserView}/>
			<Drawer.Screen name="Carnet" component={Routes.Dni} />
			<Drawer.Screen name="Noticias" component={Routes.News}/>
			<Drawer.Screen name="Votaciones" component={Routes.Votes} />
			<Drawer.Screen name="Opciones" component={Test} />
			<Drawer.Screen name="Configuracion" component={Routes.Config} />
			{!this.verificado?<Drawer.Screen name="Verificaciones" component={Feed} /> :null} 
			</Drawer.Navigator>
		);
	}
}

class AppStack extends Component{
    constructor(props){
		super(props);

		this.state={
			Route:(null == userData)?Routes.Login:drawerScreen,
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
			this.setState({'d':true,'ver':value.verificado})
		}else{
			this.setState({'d':false})
		}     
	}
	
	//component={(!d)? Routes.Login:drawerScreen}
    render(){
		const {Route,ver}= this.state;
        return (
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name="Login"
						component={Route}
						options={{
							headerShown: false,
							params:{ver}
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