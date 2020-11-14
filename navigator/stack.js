import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image,Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, CommonActions ,StackActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Header,ListItem, Icon } from 'react-native-elements';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
  } from '@react-navigation/drawer';
import AsyncStorage  from '@react-native-community/async-storage';
import Routes from './stackRoutes';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import User from '../components/user';

speed();
var userData;
async function speed (){
    userData = JSON.parse(await AsyncStorage.getItem('@UserData'))
}
// Screen


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Options = createStackNavigator();


function Options_List({ navigation }) {
	return (
		<View style = {{flex:1}}>
			<Options.Navigator>
				<Options.Screen
					name="Home"
					component={Routes.List_Options}
					options={{
						title: 'LiberApp',
						headerShown: false,
					}}
				/>
				<Options.Screen
					name="Search"
					component={Routes.Search}
					options={{
						title: 'LiberApp',
						headerShown: false,
					}}
				/>
				<Options.Screen
					name="Config"
					component={Routes.Config}
					options={{
						title: 'LiberApp',
						headerShown: false,
					}}
				/>
				<Options.Screen
					name="add_user"
					component={Routes.addUser}
					options={{
						title: 'LiberApp',
						headerShown: false,
					}}
				/>
				<Options.Screen
					name="UserInfo"
					component={Routes.infoUser}
					options={{
						title: 'LiberApp',
						headerShown: false,
					}}
				/>
			</Options.Navigator>
	</View>
	);
}
async function deleteSession(fn){
	
	AsyncStorage.removeItem('@UserData',(err,result)=>{
		console.log("bien")
	});
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
		  label="Options"
		  onPress={async () =>{
			props.navigation.closeDrawer(),
			props.navigation.navigate('Options')
		  }}
		/>
		<DrawerItem
		  label="Cerrar sesion"
		  onPress={async () =>{
		
			deleteSession((d)=>{
				if(d){
					props.navigation.replace('LoginFinish')
				}else{
					deleteSession((d)=>{
						if(d){
							props.navigation.replace('LoginFinish')
						}else{
							props.navigation.replace('Tabs')
						}
					});
				}
			})
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
		//<Drawer.Screen name="Opciones" component={Options_List} />
		//{!this.verificado?<Drawer.Screen name="Verificaciones" component={Feed} /> :null}
		//<Drawer.Screen name="Configuracion" component={Routes.Config} />
		return (
			<Drawer.Navigator drawerPosition="right" drawerContentOptions={{
				//activeBackgroundColor:'#f6b93b',
				activeTintColor:'#e58e26'
			}} drawerContent={props => <CustomDrawerContent {...props} />}>
			<Drawer.Screen name="Home" component={Routes.UserView}/>
			<Drawer.Screen name="Carnet" component={Routes.Dni} />
			<Drawer.Screen name="Noticias" component={Routes.News}/>
			<Drawer.Screen name="Votaciones" component={Routes.Votes} />
			</Drawer.Navigator>
		);
	}
}

class AppStack extends Component{
    constructor(props){
		super(props);
		this.data = AsyncStorage.getItem('@UserData');
		this.state={
			f:false,
			Route:(null == userData)?Routes.Login:drawerScreen,
		}
		
		this.a = setInterval(async ()=>{
			//console.log("a")
			if(JSON.parse(this.data._55) == null){
				this.setState({f:true,Route:Routes.Login});
				clearInterval(this.a);
			}
			if(JSON.parse(this.data._55) != null){
				JSON.parse(this.data._55)
				//console.log(this.data._55,'aaaa')
				clearInterval(this.a);
				this.setState({f:true,Route:drawerScreen});
			}
		},1000);
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
			global.value=JSON.parse(value);
			this.setState({'d':true,'ver':value.verificado})
		}else{
			global.value=value;
			this.setState({'d':false})
		}     
	}
	
	//component={(!d)? Routes.Login:drawerScreen}
    render(){
		
		const {Route,ver,f}= this.state;
		if(f){
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
						name="warning"
						component={Routes.Warning}
						options={{
							title: 'LiberApp',
							headerShown: false,
						  }}
					/>
					<Stack.Screen
						name="Options"
						component={Options_List}
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
		}else{
		  return (
			<View style = {{flex:1, backgroundColor:'#f6b93b'}}>
			</View>
		  );
		}
	}
}


export default AppStack;